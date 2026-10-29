export interface IProyecto {
    id: string
    creado_por: string
    titulo: string
    curso_asignatura: string | null
    created_at: Date
    updated_at: Date
}

export interface IProyectoCreateDTO {
    creado_por: string
    titulo: string
    curso_asignatura: string | null
}

export interface IProyectoRequestDTO {
    titulo: string
    curso_asignatura: string | null
}

export interface IProyectoResponseDTO {
    id: string
    creado_por: string
    titulo: string
    curso_asignatura: string | null
    created_at: Date
}