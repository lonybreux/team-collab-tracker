export interface IProyecto {
    id: string
    creado_por: string
    titulo: string
    curso_asignatura: string | null
    created_at: Date
    updated_at: Date
}

export interface IProyectoCrearDTO {
    titulo: string
    curso_asignatura: string | null
}