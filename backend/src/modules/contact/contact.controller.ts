import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ContactService } from "./contact.service";
import { CreateContactDto } from "./dto/create-contact.dto";

@ApiTags("Contact")
@Controller("contact")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Enviar un mensaje de contacto directo",
    description: "Procesa y valida una solicitud de contacto con nombre, email, asunto y mensaje.",
  })
  @ApiResponse({
    status: 200,
    description: "Mensaje procesado y recibido exitosamente",
  })
  @ApiResponse({
    status: 400,
    description: "Datos de entrada inválidos (ValidationPipe rejection)",
  })
  submit(@Body() dto: CreateContactDto) {
    return this.contactService.processMessage(dto);
  }
}