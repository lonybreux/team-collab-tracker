import { z } from "zod";

export const proyectoIdParamsSchema = z.object({
    id: z.uuid('Formato de id invalido')
})

export const createProyectoSchema = z.object({
    titulo: z.string().trim().min(1, "El titulo es obligatorio"),
    curso_asignatura: z.string().trim().min(1, "El curso o asignatura no puede estar vacío").nullable().default(null)
})