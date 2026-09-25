import { Injectable, Logger } from "@nestjs/common";
import { LoRaPacketDto } from "./dto/lora-packet.dto";

export interface IngestedPacketLog {
  packetId: string;
  timestamp: string;
  sourceNode: string;
  routeTaken: string[];
  rssi: number;
  snr: number;
  payload: string;
  mqttTopic: string;
  status: "ACK_RECEIVED" | "ROUTED_TO_GATEWAY";
}

@Injectable()
export class TelemetryService {
  private readonly logger = new Logger(TelemetryService.name);
  private packetCount = 0;
  private readonly packetHistory: IngestedPacketLog[] = [];

  ingestPacket(dto: LoRaPacketDto): IngestedPacketLog {
    this.packetCount++;
    const packetId = `LORA-PKT-${String(this.packetCount).padStart(5, "0")}`;
    const timestamp = new Date().toISOString();

    // Determine simulated multi-hop path based on source
    const route =
      dto.nodeId === "ESP32-Node-03"
        ? ["ESP32-Node-03", "ESP32-Node-02 (Repeater)", "Gateway (NestJS Base)"]
        : [dto.nodeId, "Gateway (NestJS Base)"];

    const logEntry: IngestedPacketLog = {
      packetId,
      timestamp,
      sourceNode: dto.nodeId,
      routeTaken: route,
      rssi: dto.rssi,
      snr: dto.snr,
      payload: dto.payload,
      mqttTopic: `parque/clarillo/mesh/${dto.nodeId.toLowerCase()}/telemetry`,
      status: "ROUTED_TO_GATEWAY",
    };

    this.packetHistory.unshift(logEntry);
    if (this.packetHistory.length > 25) {
      this.packetHistory.pop();
    }

    this.logger.log(
      `[LoRa Mesh Ingest] Packet ${packetId} from ${dto.nodeId} (${dto.rssi} dBm, ${route.length} hops)`
    );

    return logEntry;
  }

  getStats() {
    return {
      activeNetwork: "Mesh LoRa Río Clarillo",
      frequencyBand: "868 MHz",
      protocol: "MQTT / Mosquitto Bridge",
      totalPacketsIngested: this.packetCount,
      activeNodes: 8,
      lastPackets: this.packetHistory.slice(0, 5),
    };
  }
}