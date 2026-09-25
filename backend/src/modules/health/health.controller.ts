import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("System Health")
@Controller("health")
export class HealthController {
  private readonly startTime = Date.now();

  @Get()
  @ApiOperation({
    summary: "Verificar estado y métricas del sistema",
    description: "Devuelve el uptime del servidor, memoria activa, versión de Node y estado operacional.",
  })
  @ApiResponse({
    status: 200,
    description: "Sistema operativo y saludable",
    schema: {
      example: {
        status: "ok",
        uptimeSeconds: 1420,
        timestamp: "2026-09-24T21:50:00.000Z",
        environment: "development",
        nodeVersion: "v22.16.0",
        memoryUsageMB: {
          rss: 42.5,
          heapTotal: 25.1,
          heapUsed: 18.2,
        },
      },
    },
  })
  check() {
    const memory = process.memoryUsage();
    return {
      status: "ok",
      uptimeSeconds: Math.floor((Date.now() - this.startTime) / 1000),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      nodeVersion: process.version,
      memoryUsageMB: {
        rss: Math.round((memory.rss / 1024 / 1024) * 100) / 100,
        heapTotal: Math.round((memory.heapTotal / 1024 / 1024) * 100) / 100,
        heapUsed: Math.round((memory.heapUsed / 1024 / 1024) * 100) / 100,
      },
    };
  }
}