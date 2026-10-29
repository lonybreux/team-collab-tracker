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

export interface IUsuarioCreateLocalDTO {
    nombre: string
    email: string
    contrasena_hash: string
    token_verificacion: string
    token_verificacion_expires_at: Date
    foto_perfil: string | null
}

export interface IUsuarioCreateGoogleDTO {
    nombre: string
    email: string
    foto_perfil: string | null
    provider_id: string
}

export interface IUsuarioRequestDTO {
    nombre: string
    email: string
    contrasena: string
    foto_perfil: string | null
}

export interface IUsuarioResponseDTO {
    id: string
    nombre: string
    email: string
    foto_perfil: string | null
    email_verificado: boolean
}

