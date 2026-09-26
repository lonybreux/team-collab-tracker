export type ROL = 'TEAM_LEADER' | 'MEMBER'

export interface IUsuariosProyectos {
    id: string
    id_usuario: string
    id_proyecto: string
    rol: ROL
    created_at: Date
    updated_at: Date
}