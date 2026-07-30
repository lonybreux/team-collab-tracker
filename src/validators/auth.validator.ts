import { z } from "zod";

export const registrarSchema = z.object({
    nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.email('Formato de email inválido'),
    contrasena: z.string().min(6,'La contraseña debe tener al menos 6 caracteres'),
    foto_perfil: z.url().nullable()
})