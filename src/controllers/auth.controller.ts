import type { Request, Response } from "express";

import AuthService from "../services/auth.service.js";
import type { IUsuario, IUsuarioCrearDTO, IUsuarioResponseDTO } from "../models/usuario.model.js";
import env from "../config/env.js";

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
                message: error instanceof Error ? error.message : 'error interno del sistema. Vuelva a intentar más tarde.'
            })
            return
        }
        
    }

    public verificarEmail = async(req: Request, res: Response): Promise<void> => {
        try {

            const { token_verificacion, email } = req.body

            const usuarioVerified: IUsuario = await this.authService.verificarEmail(token_verificacion, email)

            const usuarioResponse: IUsuarioResponseDTO = {
                id: usuarioVerified.id,
                nombre: usuarioVerified.nombre,
                email: usuarioVerified.email,
                foto_perfil: usuarioVerified.foto_perfil,
                email_verificado: usuarioVerified.email_verificado
            }

            res.json({
                message: 'Usuario verificado con éxito',
                body: usuarioResponse
            })
            return

        } catch(error) {
            res.status(500).json({
                message: error instanceof Error ? error.message : 'error interno del sistema. Vuelva a intentar más tarde.'
            })
            return
        }
    }

    public login = async(req: Request, res: Response): Promise<void> => {
        try {

            const { email, contrasena } = req.body

            const { usuario, token } = await this.authService.loginUsuarioLocal(email, contrasena)

            const usuarioResponse: IUsuarioResponseDTO = {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                foto_perfil: usuario.foto_perfil,
                email_verificado: usuario.email_verificado
            }

            res.cookie('session', token, {
                httpOnly: true,
                secure: env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 8 * 60 * 60 * 1000
            })

            res.json({
                message: 'Login exitoso',
                body: {
                    usuario: usuarioResponse,
                }
            })
            return
            
        } catch(error) {
            res.status(500).json({
                message: error instanceof Error ? error.message : 'error interno del sistema. Vuelva a intentar más tarde.'
            })
            return
        }
    }

}