import { IsString, IsNotEmpty, IsNumber, Min, Max, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoRaPacketDto {
  @ApiProperty({
    description: "Identificador del nodo emisor en la red Mesh",
    example: "ESP32-Node-03",
  })
  @IsString()
  @IsNotEmpty({ message: "El nodeId es obligatorio" })
  nodeId: string;

  @ApiProperty({
    description: "Potencia de señal recibida en decibelios-milivatio (RSSI)",
    example: -84,
    minimum: -140,
    maximum: -20,
  })
  @IsNumber()
  @Min(-140)
  @Max(-20)
  rssi: number;

  @ApiProperty({
    description: "Relación Señal/Ruido (SNR en dB)",
    example: 9.5,
  })
  @IsNumber()
  snr: number;

  @ApiProperty({
    description: "Carga útil de datos de telemetría (Payload o lectura de sensor)",
    example: "temp:21.4C,hum:58%,bat:3.9V",
  })
  @IsString()
  @IsNotEmpty()
  payload: string;

  @ApiProperty({
    description: "Número de saltos (hops) acumulados en la topología Mesh",
    example: 2,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(8)
  hopCount?: number = 1;
}