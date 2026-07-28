import { Resend, type CreateEmailOptions } from "resend";
import env from "../config/env.js";

const resend = new Resend(env.RESEND_API_KEY)

export default class EmailService {

    public async enviarEmailCodigoVerificacion(email: string, codigo: string): Promise<void> {

        const emailOptions: CreateEmailOptions = {
            from: 'onboarding@resend.dev',
            to: [email],
            subject: 'Código de verificación',
            html: `<h1>Hola</h1>
            <p>Este es tu código de verificación: <strong>${codigo}</strong></p>
            <p>Este código expira en 15 minutos.</p>`
        }

        await resend.emails.send(emailOptions)
    }
}