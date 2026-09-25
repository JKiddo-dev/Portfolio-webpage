import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./common/filters/http-exception.filter";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule);

  // Global API Prefix
  app.setGlobalPrefix("api/v1");

  // CORS configuration
  app.enableCors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  });

  // Strict Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  // Global Exception Filter & Logging Interceptor
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Swagger (OpenAPI) Documentation Setup
  const config = new DocumentBuilder()
    .setTitle("Matías Aguilar | Full-Stack & IoT API")
    .setDescription(
      "API REST empresarial construida con NestJS 11 siguiendo principios SOLID, arquitectura por capas y procesamiento asíncrono IoT."
    )
    .setVersion("1.0.0")
    .addTag("Projects", "Gestión y consulta de proyectos de software")
    .addTag("IoT Telemetry (Río Clarillo Mesh)", "Simulación y procesamiento de paquetes LoRa / MQTT")
    .addTag("Contact", "Recepción y validación de mensajes de contacto")
    .addTag("System Health", "Métricas y observabilidad del servidor")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document, {
    customSiteTitle: "Matías Aguilar API Docs",
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);

  logger.log(`=======================================================`);
  logger.log(`🚀 NestJS Backend corriendo en: http://localhost:${port}/api/v1`);
  logger.log(`📖 Documentación Swagger disponible en: http://localhost:${port}/api/docs`);
  logger.log(`=======================================================`);
}
bootstrap();