import type { Request, Response } from "express";

import AuthService from "../services/auth.service.js";
import type { IUsuario, IUsuarioCrearDTO, IUsuarioResponseDTO } from "../models/usuario.model.js";
import env from "../config/env.js";
import { AppError } from "../errors/app.error.js";

import { OAuth2Client, type GenerateAuthUrlOpts } from "google-auth-library";
import crypto from 'node:crypto'

const client = new OAuth2Client(
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET,
    env.GOOGLE_REDIRECT_URI
)

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

            if(error instanceof AppError) {
                res.status(error.statusCode).json({
                    message: error.message
                })
                return
            }

            res.status(500).json({
                message: 'error interno del sistema. Vuelva a intentar más tarde.'
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

            if(error instanceof AppError) {
                res.status(error.statusCode).json({
                    message: error.message
                })
                return
            }

            res.status(500).json({
                message: 'error interno del sistema. Vuelva a intentar más tarde.'
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
                sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
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

            if(error instanceof AppError) {
                res.status(error.statusCode).json({
                    message: error.message
                })
                return
            }

            res.status(500).json({
                message: 'error interno del sistema. Vuelva a intentar más tarde.'
            })
            return
        }
    }

    public logout = async(_req: Request, res: Response): Promise<void> => {
        
        res.clearCookie('session', {
            httpOnly: true,
            secure: env.NODE_ENV === 'production',
            sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax'
        })
        
        res.status(200).json({
            message: 'Sesión cerrada correctamente'
        })
        return
    }

    public google = async(_req: Request, res: Response): Promise<void> =>  {
        try {

            const state = crypto.randomBytes(32).toString('hex')

            res.cookie('state', state, {
                httpOnly: true,
                secure: env.NODE_ENV === 'production',
                maxAge: 10 * 60 * 1000,
                sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax' 
            })

            const generateAuthOptions: GenerateAuthUrlOpts = {
                scope: ['profile','email','openid'],
                state
            }

            const url = client.generateAuthUrl(generateAuthOptions)

            res.redirect(url)
        } catch(error) {
            res.status(500).json({
                message: error instanceof Error ? error.message : 'error interno del sistema. Vuelva a intentar más tarde.'
            })
            return
        }
    }

    public googleCallback = async (req: Request, res: Response): Promise<void> => {
        try {

            const { code, state } = req.query as { code: string, state: string}

            if(!req.cookies['state'] || state !== req.cookies['state']) {
                res.status(403).json({
                    message: 'Estado de autenticación inválido'
                })
                return
            }

            res.clearCookie('state',{
                httpOnly: true,
                secure: env.NODE_ENV === 'production',
                sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax'
            })

            const { tokens } = await client.getToken(code)

            if(!tokens.id_token) {
                res.status(400).json({
                    message: 'No se obtuvo id_token de Google'
                })
                return
            }

            const ticket = await client.verifyIdToken({
                idToken: tokens.id_token,
                audience: env.GOOGLE_CLIENT_ID
            })

            const payload = ticket.getPayload()

            if(!payload || !payload.email || !payload.sub) {
                res.status(400).json({
                    message: 'Información de perfil incompleta recibida de Google'
                })
                return
            }

            const usuarioGoogle: IUsuarioCrearDTO = {
                nombre: payload.name || 'UsuarioGoogle',
                email: payload.email,
                contrasena: '',
                foto_perfil: payload.picture || null
            }

            const { token } = await this.authService.accesoGoogle(usuarioGoogle, payload.sub)

            res.cookie('session', token,{
                httpOnly: true,
                secure: env.NODE_ENV === 'production',
                sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 8 * 60 * 60 * 1000
            })

            res.redirect(`${env.FRONTEND_URL}/profile`)
        } catch(error) {
            res.status(500).json({
                message: error instanceof Error ? error.message : 'error interno del sistema. Vuelva a intentar más tarde.'
            })
            return
        }
    }

}