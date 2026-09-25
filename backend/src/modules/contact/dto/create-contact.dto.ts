import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateContactDto {
  @ApiProperty({
    description: "Nombre de la persona o reclutador que contacta",
    example: "Carolina Méndez",
  })
  @IsString()
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @MinLength(2, { message: "El nombre debe tener al menos 2 caracteres" })
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: "Correo electrónico de contacto",
    example: "carolina.mendez@empresa.com",
  })
  @IsEmail({}, { message: "Por favor ingresa un correo electrónico válido" })
  email: string;

  @ApiProperty({
    description: "Asunto del mensaje",
    example: "Oportunidad Desarrollador Full-Stack Senior",
  })
  @IsString()
  @IsNotEmpty({ message: "El asunto es obligatorio" })
  @MinLength(3)
  @MaxLength(150)
  subject: string;

  @ApiProperty({
    description: "Contenido del mensaje o propuesta",
    example: "Hola Matías, revisamos tu portafolio y nos encantaría agendar una entrevista técnica...",
  })
  @IsString()
  @IsNotEmpty({ message: "El mensaje es obligatorio" })
  @MinLength(10, { message: "El mensaje debe tener al menos 10 caracteres" })
  @MaxLength(2000)
  message: string;
}