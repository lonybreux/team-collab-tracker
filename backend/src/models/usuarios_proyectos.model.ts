export type ROL = 'TEAM_LEADER' | 'MEMBER'

export interface IUsuariosProyectos {
    id: string
    id_usuario: string
    id_proyecto: string
    rol: ROL
    created_at: Date
    updated_at: Date
}

export interface IProyectoUsuarioResponseDTO {
    id: string
    titulo: string
    cursoAsignatura: string
    rol: string
    nombreCreador: string
}

export interface IUsuariosProyectosCrearDTO {
    id_usuario: string
    id_proyecto: string
    rol: ROL
}

