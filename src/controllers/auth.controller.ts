import type { Request, Response } from "express";

import AuthService from "../services/auth.service.js";
import type { IUsuario, IUsuarioCrearDTO, IUsuarioResponseDTO } from "../models/usuario.model.js";

export default class AuthController {

    constructor(private authService: AuthService) {}

    public register = async(req: Request, res: Response): Promise<void> => {
        
        try {
            const usuario: IUsuarioCrearDTO = req.body

            const usuarioCreated: IUsuario = await this.authService.registrarUsuarioLocal(usuario)

            const usuarioResponse: IUsuarioResponseDTO = {
                id: usuarioCreated.id,
                nombre: usuarioCreated.nombre,
                email: usuarioCreated.email,
                foto_perfil: usuarioCreated.foto_perfil,
                email_verificado: usuarioCreated.email_verificado
            }

            res.status(201).json({
                message: 'Usuario registrado correctamente',
                body: usuarioResponse
            })
            return
        } catch(error) {
            res.status(500).json({
                message: error instanceof Error ? error.message : 'Internal server error'
            })
            return
        }
        
    }
}