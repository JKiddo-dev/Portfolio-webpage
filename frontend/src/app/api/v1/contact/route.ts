import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiting map for anti-spam
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

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
            error: {
              statusCode: 429,
              message: "Límite de envíos excedido. Por favor espera un minuto antes de reintentar.",
            },
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

    const referenceId = `MSG-${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json(
      {
        success: true,
        message: "Mensaje procesado con éxito en el servidor. Me pondré en contacto contigo pronto.",
        referenceId,
        timestamp: new Date().toISOString(),
        receivedData: {
          from: name.trim(),
          email: email.trim(),
          subject: (subject || "Contacto desde Portafolio").trim(),
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Error procesando el payload de la solicitud." },
      { status: 400 }
    );
  }
}
