export type Provider = 'LOCAL' | 'GOOGLE'

export interface IUsuario {
    id: string
    nombre: string
    email: string
    email_verificado: boolean
    token_verificacion: string | null
    token_verificacion_expires_at: Date | null
    foto_perfil: string | null
    created_at: Date
    updated_at: Date
}

export interface IUsuariosAuthProvider {
    id: string 
    id_usuario: string 
    provider: string 
    provider_id: string | null
    contrasena_hash: string | null
    created_at: Date 
    updated_at: Date 
}

export interface IUsuarioConAuthProviders extends IUsuario {
    usuarios_auth_providers: IUsuariosAuthProvider[]
}

export interface IUsuarioCrearDTO {
    nombre: string
    email: string
    contrasena: string
    foto_perfil: string | null
}

export interface IUsuarioResponseDTO {
    id: string
    nombre: string
    email: string
    foto_perfil?: string
    email_verificado: boolean
}

