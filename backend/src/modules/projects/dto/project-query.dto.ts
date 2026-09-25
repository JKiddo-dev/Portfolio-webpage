import { IsOptional, IsIn, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class ProjectQueryDto {
  @ApiPropertyOptional({
    description: "Idioma de respuesta para la descripción y aspectos técnicos",
    enum: ["es", "en"],
    default: "es",
  })
  @IsOptional()
  @IsIn(["es", "en"], { message: "El parámetro lang debe ser 'es' o 'en'" })
  lang?: "es" | "en" = "es";

  @ApiPropertyOptional({
    description: "Filtrar por categoría de proyecto",
    example: "Full-Stack",
  })
  @IsOptional()
  @IsString()
  category?: string;
}