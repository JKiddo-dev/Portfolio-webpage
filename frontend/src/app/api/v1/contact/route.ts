import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// In-memory rate limiting map (10 submissions per minute per IP)
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

// Target notification email (defaults to user's professional email)
const TARGET_NOTIFICATION_EMAIL = process.env.CONTACT_NOTIFICATION_EMAIL || "m.oaguilarbarria@gmail.com";

export async function POST(req: NextRequest) {
  try {
    let ip = "127.0.0.1";
    try {
      ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        req.headers.get("x-real-ip") ||
        "127.0.0.1";
    } catch {}

    const now = Date.now();
    const rateData = rateLimitMap.get(ip);

    if (rateData && now < rateData.expiresAt) {
      if (rateData.count >= 10) {
        return NextResponse.json(
          {
            error: "Límite de envíos excedido. Por favor espera un minuto antes de reintentar.",
          },
          { status: 429 }
        );
      }
      rateData.count++;
    } else {
      rateLimitMap.set(ip, { count: 1, expiresAt: now + 60000 });
    }

    const body = await req.json();
    const { name, email, subject, message } = body || {};

    // Basic Validations
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "El nombre es obligatorio y debe tener al menos 2 caracteres." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "El formato de correo electrónico es inválido." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "El mensaje debe tener al menos 5 caracteres." },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = (subject || "Contacto desde Portafolio Web").trim();
    const cleanMessage = message.trim();
    const referenceId = `MSG-${Date.now().toString(36).toUpperCase()}`;
    const timestampStr = new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" });

    // Initialize Resend with environment variable
    const resendApiKey = process.env.RESEND_API_KEY;
    let emailDelivered = false;

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      const buildHtml = (sandboxNotice?: string) => `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #09090b; color: #f4f4f5; margin: 0; padding: 24px; }
            .container { max-width: 580px; margin: 0 auto; background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; padding: 32px; }
            .badge { display: inline-block; padding: 4px 12px; background-color: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
            .sandbox-banner { background-color: rgba(245, 158, 11, 0.12); border-left: 3px solid #f59e0b; border-radius: 6px; padding: 12px 14px; margin-top: 14px; margin-bottom: 16px; font-size: 12px; line-height: 1.5; color: #fef3c7; }
            h1 { font-size: 20px; font-weight: 800; color: #ffffff; margin-top: 16px; margin-bottom: 8px; }
            .meta { font-size: 13px; color: #a1a1aa; margin-bottom: 24px; }
            .detail-box { background-color: #09090b; border: 1px solid #27272a; border-radius: 12px; padding: 18px; margin-bottom: 20px; }
            .field-row { margin-bottom: 12px; }
            .field-row:last-child { margin-bottom: 0; }
            .field-label { font-size: 11px; text-transform: uppercase; color: #71717a; font-weight: 700; letter-spacing: 0.5px; }
            .field-value { font-size: 14px; color: #f4f4f5; font-weight: 500; margin-top: 2px; }
            .message-box { background-color: #09090b; border-left: 3px solid #10b981; border-radius: 4px 12px 12px 4px; padding: 18px; font-size: 14px; line-height: 1.6; color: #e4e4e7; white-space: pre-wrap; }
            .reply-btn { display: inline-block; margin-top: 24px; padding: 12px 24px; background-color: #10b981; color: #09090b; font-weight: 700; font-size: 13px; text-decoration: none; border-radius: 10px; }
            .footer { margin-top: 28px; padding-top: 20px; border-top: 1px solid #27272a; font-size: 11px; color: #71717a; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <span class="badge">Nuevo Contacto Portafolio</span>
            ${sandboxNotice ? `<div class="sandbox-banner">${sandboxNotice}</div>` : ""}
            <h1>${cleanSubject}</h1>
            <div class="meta">Recibido el ${timestampStr} (Hora Chile) • Ref: ${referenceId}</div>

            <div class="detail-box">
              <div class="field-row">
                <div class="field-label">Remitente</div>
                <div class="field-value">${cleanName}</div>
              </div>
              <div class="field-row">
                <div class="field-label">Correo Electrónico</div>
                <div class="field-value"><a href="mailto:${cleanEmail}" style="color: #34d399; text-decoration: none;">${cleanEmail}</a></div>
              </div>
            </div>

            <div class="field-label" style="margin-bottom: 6px;">Mensaje</div>
            <div class="message-box">${cleanMessage}</div>

            <a href="mailto:${cleanEmail}?subject=Re: ${encodeURIComponent(cleanSubject)}" class="reply-btn">
              Responder a ${cleanName}
            </a>

            <div class="footer">
              Enviado automáticamente desde el portafolio web jkiddo-portfolio.vercel.app vía Resend Serverless.
            </div>
          </div>
        </body>
        </html>
      `;

      let deliveryTarget = TARGET_NOTIFICATION_EMAIL;
      let { data: resendData, error: resendError } = await resend.emails.send({
        from: "Portafolio Matías Aguilar <onboarding@resend.dev>",
        to: [deliveryTarget],
        replyTo: cleanEmail,
        subject: `[Portafolio] ${cleanSubject}`,
        html: buildHtml(),
      });

      // Circuit Breaker / Sandbox Fallback:
      // Si la cuenta de Resend está en modo sandbox (onboarding@resend.dev sin dominio verificado),
      // Resend rechaza con HTTP 403 envíos a correos distintos al dueño registrado de la cuenta.
      // En lugar de fallar y perder el mensaje del cliente, detectamos la restricción y reenviamos
      // al correo registrado de la cuenta Resend con una nota explicativa.
      if (
        resendError &&
        (resendError as any).statusCode === 403 &&
        resendError.message.includes("own email address")
      ) {
        const ownerMatch = resendError.message.match(/own email address \(([^)]+)\)/);
        const ownerEmail = ownerMatch ? ownerMatch[1] : "matias.aguilar63@gmail.com";
        console.warn(
          `Resend Sandbox activo. Destino solicitado: ${deliveryTarget}. Redirigiendo automáticamente a ${ownerEmail} para asegurar la entrega.`
        );

        const sandboxNotice = `⚠️ <b>Aviso de entrega Sandbox:</b> El mensaje fue despachado para <code>${deliveryTarget}</code>, pero tu cuenta de Resend actual está en modo de pruebas gratuito (onboarding@resend.dev sin dominio verificado), por lo que fue entregado a tu cuenta registrada <code>${ownerEmail}</code>.`;

        const fallbackResult = await resend.emails.send({
          from: "Portafolio Matías Aguilar <onboarding@resend.dev>",
          to: [ownerEmail],
          replyTo: cleanEmail,
          subject: `[Portafolio] (Para: ${deliveryTarget}) ${cleanSubject}`,
          html: buildHtml(sandboxNotice),
        });

        if (!fallbackResult.error) {
          resendError = null;
          resendData = fallbackResult.data;
          deliveryTarget = ownerEmail;
        } else {
          console.error("Resend fallback delivery failed:", fallbackResult.error);
        }
      }

      if (resendError) {
        console.error("Resend delivery failed:", resendError);
        return NextResponse.json(
          {
            error: "No se pudo despachar el correo a través de Resend: " + resendError.message,
          },
          { status: 500 }
        );
      }

      emailDelivered = true;
    } else {
      console.warn(
        "RESEND_API_KEY no configurada. Mensaje simulado en entorno de desarrollo. Para recibir correos reales, añade RESEND_API_KEY en las variables de entorno de Vercel o en .env.local."
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "¡Mensaje recibido con éxito! Me pondré en contacto contigo pronto.",
        referenceId,
        deliveredViaResend: emailDelivered,
        timestamp: new Date().toISOString(),
        receivedData: {
          from: cleanName,
          email: cleanEmail,
          subject: cleanSubject,
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Contact API unhandled error:", err);
    return NextResponse.json(
      { error: err?.message || "Error procesando el payload de la solicitud." },
      { status: 400 }
    );
  }
}
