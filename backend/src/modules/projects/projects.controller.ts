import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { ProjectsService } from "./projects.service";
import { ProjectQueryDto } from "./dto/project-query.dto";

@ApiTags("Projects")
@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({
    summary: "Obtener lista de proyectos de software",
    description: "Permite filtrar por categoría y seleccionar el idioma de respuesta (es / en).",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de proyectos devuelta exitosamente",
  })
  findAll(@Query() query: ProjectQueryDto) {
    return this.projectsService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Obtener detalle de un proyecto por ID",
    description: "Devuelve la información técnica y de arquitectura de un proyecto específico.",
  })
  @ApiParam({ name: "id", example: "rio-clarillo-mesh" })
  @ApiResponse({ status: 200, description: "Proyecto encontrado" })
  @ApiResponse({ status: 404, description: "Proyecto no encontrado" })
  findOne(@Param("id") id: string, @Query("lang") lang?: "es" | "en") {
    return this.projectsService.findOne(id, lang || "es");
  }
}