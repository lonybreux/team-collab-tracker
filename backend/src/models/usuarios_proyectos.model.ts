export type ROL = 'TEAM_LEADER' | 'MEMBER'

export interface IUsuariosProyectos {
    id: string
    usuario_id: string
    proyecto_id: string
    rol: ROL
    created_at: Date
    updated_at: Date
}