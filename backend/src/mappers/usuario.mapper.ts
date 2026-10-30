import type { IUsuario, IUsuarioResponseDTO } from "../models/usuario.model.js";

export default class UsuarioMapper {

    public static toResponseDTO(usuario: IUsuario): IUsuarioResponseDTO {
        return {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            foto_perfil: usuario.foto_perfil,
            email_verificado: usuario.email_verificado
        }
    }
}

