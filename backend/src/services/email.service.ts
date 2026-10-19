import { Resend, type CreateEmailOptions } from "resend";
import env from "../config/env.js";

const resend = new Resend(env.RESEND_API_KEY)

export default class EmailService {

    public async enviarEmailCodigoVerificacion(email: string, codigo: string): Promise<void> {

        const emailOptions: CreateEmailOptions = {
    from: 'onboarding@resend.dev',
    to: [email],
    subject: 'Código de verificación',
    html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light dark" />
  <title>Código de verificación</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f5f7;">
  <!-- Texto de vista previa en la bandeja de entrada -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Tu código de verificación es ${codigo}. Expira en 15 minutos.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f7;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

          <!-- Franja superior -->
          <tr>
            <td style="background-color:#4f46e5;height:6px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Contenido -->
          <tr>
            <td style="padding:40px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1f2937;">
              <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;">
                Verifica tu cuenta
              </h1>
              <p style="margin:0 0 28px;font-size:16px;line-height:1.6;color:#4b5563;">
                Hola, usa el siguiente código para completar tu verificación:
              </p>

              <!-- Código -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="background-color:#eef2ff;border:1px dashed #a5b4fc;border-radius:10px;padding:20px;">
                    <span style="font-family:'SF Mono',Menlo,Consolas,'Courier New',monospace;font-size:36px;font-weight:700;letter-spacing:10px;color:#4338ca;">
                      ${codigo}
                    </span>
                  </td>
                </tr>
              </table>

              <p style="margin:28px 0 0;font-size:14px;line-height:1.6;color:#6b7280;">
                ⏱️ Este código expira en <strong>15 minutos</strong>.
              </p>
            </td>
          </tr>

          <!-- Pie -->
          <tr>
            <td style="padding:20px 32px;background-color:#f9fafb;border-top:1px solid #e5e7eb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:1.5;color:#9ca3af;text-align:center;">
              Si no solicitaste este código, puedes ignorar este mensaje con tranquilidad.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

        await resend.emails.send(emailOptions)
    }
}