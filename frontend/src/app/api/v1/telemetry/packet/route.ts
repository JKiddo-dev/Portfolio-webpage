import { NextRequest, NextResponse } from "next/server";

let packetSequence = 0;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nodeId, rssi, snr, payload } = body;

    // Strict validation
    if (!nodeId || typeof nodeId !== "string") {
      return NextResponse.json(
        { error: "Validation failed: 'nodeId' is required and must be a string." },
        { status: 400 }
      );
    }

    const numericRssi = Number(rssi);
    if (isNaN(numericRssi) || numericRssi < -140 || numericRssi > 0) {
      return NextResponse.json(
        { error: "Validation failed: 'rssi' must be a number between -140 and 0 dBm." },
        { status: 400 }
      );
    }

    packetSequence++;
    const packetId = `LORA-PKT-${String(packetSequence).padStart(5, "0")}`;

    // Multi-hop LoRa Mesh route simulation (Río Clarillo National Park)
    const routeTaken =
      nodeId === "ESP32-Node-03"
        ? ["ESP32-Node-03", "ESP32-Node-02 (Repeater)", "Gateway (LoRa Base)"]
        : [nodeId, "Gateway (LoRa Base)"];

    const responseData = {
      packetId,
      timestamp: new Date().toISOString(),
      sourceNode: nodeId,
      routeTaken,
      rssi: numericRssi,
      snr: Number(snr) || 9.5,
      payload: String(payload || "telemetry_ping"),
      mqttTopic: `parque/clarillo/mesh/${nodeId.toLowerCase()}/telemetry`,
      status: "ROUTED_TO_GATEWAY",
    };

    return NextResponse.json(responseData, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );
  }
}
