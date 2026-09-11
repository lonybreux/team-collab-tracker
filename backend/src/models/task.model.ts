export type ESTADO = 'EN_PROGRESO' | 'EN_REVISION' | 'COMPLETADO' | 'RECHAZADO'


export interface ITask {
    id: string
    proyecto_id: string
    creado_por: string
    delegado_id: string
    titulo: string
    descripcion: string
    motivo_rechazo: string | null
    estado: ESTADO
    created_at: Date
    updated_at: Date
}

