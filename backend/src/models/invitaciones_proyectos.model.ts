import type { ROL } from "./usuarios_proyectos.model.js"

export interface IInvitacionesProyectos {
    id: string
    id_proyecto: string
    email: string
    id_invitado_por: string
    rol: ROL
    aceptada: boolean
    token_aceptacion: string
    token_aceptacion_expires_at: Date
    created_at: Date
    updated_at: Date
}

export interface IInvitacionProyectosRequestDto {
    id_proyecto: string
    email: string
    rol: string
}

