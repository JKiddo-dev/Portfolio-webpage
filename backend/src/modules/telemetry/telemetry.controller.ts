import { Controller, Post, Get, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { TelemetryService } from "./telemetry.service";
import { LoRaPacketDto } from "./dto/lora-packet.dto";

@ApiTags("IoT Telemetry (Río Clarillo Mesh)")
@Controller("telemetry")
export class TelemetryController {
  constructor(private readonly telemetryService: TelemetryService) {}

  @Post("packet")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Ingestar paquete de telemetría LoRa Mesh",
    description: "Valida la estructura del paquete de radiofrecuencia ESP32, simula la topología de saltos en red y registra la lectura en el broker MQTT.",
  })
  @ApiResponse({
    status: 201,
    description: "Paquete LoRa recibido y enrutado al Gateway exitosamente",
  })
  ingest(@Body() dto: LoRaPacketDto) {
    return this.telemetryService.ingestPacket(dto);
  }

  @Get("stats")
  @ApiOperation({
    summary: "Consultar métricas vivas de la red Mesh",
    description: "Devuelve estadísticas de tráfico, frecuencia de operación y los últimos paquetes recibidos.",
  })
  @ApiResponse({ status: 200, description: "Estadísticas de red Mesh" })
  getStats() {
    return this.telemetryService.getStats();
  }
}