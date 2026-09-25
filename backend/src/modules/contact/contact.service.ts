import { Injectable, Logger } from "@nestjs/common";
import { CreateContactDto } from "./dto/create-contact.dto";

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  async processMessage(dto: CreateContactDto) {
    const referenceId = `MSG-${Date.now().toString(36).toUpperCase()}`;

    this.logger.log(
      `[Contact Inbound] Message received from ${dto.name} <${dto.email}> - Subject: "${dto.subject}"`
    );

    return {
      success: true,
      message: "Mensaje recibido correctamente. Me pondré en contacto contigo a la brevedad.",
      referenceId,
      timestamp: new Date().toISOString(),
      receivedData: {
        from: dto.name,
        email: dto.email,
        subject: dto.subject,
      },
    };
  }
}