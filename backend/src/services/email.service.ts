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

    public async enviarEmailAUsuarioInvitado(emailInvitado: string, codigo: string, nombreProyecto: string): Promise<void> {
      const emailOptions: CreateEmailOptions = {
        from: 'onboarding@resend.dev',
        to: [emailInvitado],
        subject: `Invitación a ${nombreProyecto}`,
        html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light dark" />
  <title>Invitación a un proyecto</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f5f7;">

  <!-- Texto de vista previa en la bandeja de entrada -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Has sido invitado a participar en el proyecto ${nombreProyecto}.
    Usa el código para aceptar la invitación.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
    style="background-color:#f4f5f7;padding:32px 16px;">
    <tr>
      <td align="center">

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
          style="max-width:480px;background-color:#ffffff;border-radius:12px;
          overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

          <!-- Franja superior -->
          <tr>
            <td style="background-color:#4f46e5;height:6px;font-size:0;line-height:0;">
              &nbsp;
            </td>
          </tr>

          <!-- Contenido -->
          <tr>
            <td style="padding:40px 32px;font-family:-apple-system,BlinkMacSystemFont,
              'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1f2937;">

              <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;">
                ¡Has sido invitado a un proyecto!
              </h1>

              <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#4b5563;">
                Hola, alguien te ha invitado a colaborar en el siguiente proyecto:
              </p>

              <!-- Nombre del proyecto -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#f9fafb;border:1px solid #e5e7eb;
                    border-radius:10px;padding:18px 20px;">

                    <p style="margin:0 0 6px;font-size:12px;font-weight:600;
                      text-transform:uppercase;letter-spacing:1px;color:#6b7280;">
                      Proyecto
                    </p>

                    <p style="margin:0;font-size:20px;font-weight:700;color:#111827;
                      line-height:1.4;overflow-wrap:anywhere;">
                      ${nombreProyecto}
                    </p>

                  </td>
                </tr>
              </table>

              <p style="margin:24px 0;font-size:16px;line-height:1.6;color:#4b5563;">
                Para aceptar la invitación, introduce el siguiente código en la
                plataforma:
              </p>

              <!-- Código OTP -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center"
                    style="background-color:#eef2ff;border:1px dashed #a5b4fc;
                    border-radius:10px;padding:20px;">

                    <span style="font-family:'SF Mono',Menlo,Consolas,'Courier New',monospace;
                      font-size:36px;font-weight:700;letter-spacing:10px;color:#4338ca;">
                      ${codigo}
                    </span>

                  </td>
                </tr>
              </table>

              <p style="margin:28px 0 0;font-size:14px;line-height:1.6;color:#6b7280;">
                ⏱️ Este código expira en <strong>15 minutos</strong>.
              </p>

              <p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:#6b7280;">
                Si no reconoces esta invitación, puedes ignorar este correo.
                No se te agregará al proyecto sin que aceptes la invitación.
              </p>

            </td>
          </tr>

          <!-- Pie -->
          <tr>
            <td style="padding:20px 32px;background-color:#f9fafb;
              border-top:1px solid #e5e7eb;font-family:-apple-system,BlinkMacSystemFont,
              'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;
              line-height:1.5;color:#9ca3af;text-align:center;">

              Este correo se ha enviado como parte del proceso de invitación
              a un proyecto.

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