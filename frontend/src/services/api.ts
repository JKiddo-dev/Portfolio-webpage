const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api/v1";

export interface HealthResponse {
  status: string;
  uptimeSeconds: number;
  timestamp: string;
  environment: string;
  nodeVersion: string;
  memoryUsageMB: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
  };
}

export interface TelemetryPacketPayload {
  nodeId: string;
  rssi: number;
  snr: number;
  payload: string;
  hopCount?: number;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const api = {
  async getHealth(): Promise<{ data: HealthResponse | null; isLive: boolean; latencyMs: number }> {
    const start = Date.now();
    try {
      const res = await fetch(`${API_URL}/health`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });
      const latencyMs = Date.now() - start;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return { data, isLive: true, latencyMs };
    } catch {
      const latencyMs = Date.now() - start;
      return {
        data: {
          status: "mock_fallback",
          uptimeSeconds: 3600,
          timestamp: new Date().toISOString(),
          environment: "client-preview",
          nodeVersion: "v22.16.0",
          memoryUsageMB: { rss: 42.1, heapTotal: 24.5, heapUsed: 16.8 },
        },
        isLive: false,
        latencyMs,
      };
    }
  },

  async sendTelemetryPacket(payload: TelemetryPacketPayload) {
    const start = Date.now();
    try {
      const res = await fetch(`${API_URL}/telemetry/packet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const latencyMs = Date.now() - start;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return { data, isLive: true, latencyMs };
    } catch {
      const latencyMs = Date.now() - start;
      return {
        data: {
          packetId: `LORA-PKT-${Math.floor(Math.random() * 8000 + 1000)}`,
          timestamp: new Date().toISOString(),
          sourceNode: payload.nodeId,
          routeTaken: [payload.nodeId, "ESP32-Node-02 (Repeater)", "Gateway (NestJS Base)"],
          rssi: payload.rssi,
          snr: payload.snr,
          payload: payload.payload,
          mqttTopic: `parque/clarillo/mesh/${payload.nodeId.toLowerCase()}/telemetry`,
          status: "ROUTED_TO_GATEWAY",
        },
        isLive: false,
        latencyMs,
      };
    }
  },

  async sendContact(payload: ContactPayload) {
    const start = Date.now();
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const latencyMs = Date.now() - start;
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error?.message || `HTTP ${res.status}`);
      }
      return { data, isLive: true, latencyMs };
    } catch (err: any) {
      const latencyMs = Date.now() - start;
      return {
        data: {
          success: true,
          message: "Mensaje procesado con éxito (modo cliente). Me pondré en contacto contigo pronto.",
          referenceId: `MSG-${Date.now().toString(36).toUpperCase()}`,
          timestamp: new Date().toISOString(),
          receivedData: {
            from: payload.name,
            email: payload.email,
            subject: payload.subject,
          },
        },
        isLive: false,
        latencyMs,
      };
    }
  },
};