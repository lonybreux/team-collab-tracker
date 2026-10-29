export type ESTADO = 'EN_PROGRESO' | 'EN_REVISION' | 'COMPLETADO' | 'RECHAZADO'


export interface ITask {
    id: string
    id_proyecto: string
    id_responsable: string
    creado_por: string
    titulo: string
    estado: ESTADO
    descripcion: string
    motivo_rechazo: string | null
    created_at: Date
    updated_at: Date
}

export interface ITaskCreateDTO {
    id_proyecto: string
    id_responsable: string
    creado_por: string
    titulo: string
    estado: ESTADO
    descripcion: string
    motivo_rechazo: string | null
}

export interface ITaskRequestDTO {
    id_responsable: string
    titulo: string
    descripcion: string
}

export interface ITaskResponseDTO {
    id: string
    id_proyecto: string
    id_responsable: string
    creado_por: string
    titulo: string
    estado: ESTADO
    descripcion: string
    motivo_rechazo: string | null
    created_at: Date
}