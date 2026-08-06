import type { IUsuario, IUsuarioCrearDTO } from "../models/usuario.model.js";
import { UserAlreadyExistsError } from "../errors/app.error.js";
import type UsuarioRepository from "../repositories/usuario.repository.js";
import EmailService from "./email.service.js";

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import env from "../config/env.js";


export default class AuthService {

    constructor(private usuarioRepository: UsuarioRepository, private emailService: EmailService){}

    public async registrarUsuarioLocal(usuario: IUsuarioCrearDTO): Promise<IUsuario> {

        const usuarioExists = await this.usuarioRepository.findByEmailConAuthProviders(usuario.email)

        if(usuarioExists) {

            const authLocal = usuarioExists.usuarios_auth_providers.find(p => p.provider === 'LOCAL')

            if(authLocal) throw new UserAlreadyExistsError()

            const contrasenaHash = await bcrypt.hash(usuario.contrasena, 10)
            await this.usuarioRepository.createAuthProviderLocal(usuarioExists.id, contrasenaHash)

            return usuarioExists
        }
       
        const contrasenaHash = await bcrypt.hash(usuario.contrasena, 10)

        const tokenVerificacion = crypto.randomInt(100000, 999999).toString()
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

        const usuarioCreated = await this.usuarioRepository.createUsuarioLocal({
            nombre: usuario.nombre,
            email: usuario.email,
            contrasenaHash,
            tokenVerificacion,
            tokenVerificacionExpiresAt: expiresAt,
            foto_perfil: usuario.foto_perfil
        })

        await this.emailService.enviarEmailCodigoVerificacion(usuario.email, tokenVerificacion)

        return usuarioCreated
    }

    public async verificarEmail(token_verificacion: string, email: string): Promise<IUsuario> {

        const usuario = await this.usuarioRepository.findByEmail(email)

        if(!usuario) throw new Error('Usuario no registrado')

        if(token_verificacion !== usuario.token_verificacion) throw new Error('El token de verificación no coincide')

        if(!usuario.token_verificacion_expires_at || usuario.token_verificacion_expires_at < new Date()) throw new Error('El código de verificación ha expirado')

        return await this.usuarioRepository.updateEmailVerificado(usuario.email)
        
    }

    public async loginUsuarioLocal(email: string, contrasena: string): Promise<{usuario: IUsuario, token: string}> {

        const usuarioExists = await this.usuarioRepository.findByEmailConAuthProviders(email)

        if(!usuarioExists) throw new Error('Credenciales inválidas')
        
        if(!usuarioExists.email_verificado) throw new Error('cuenta no verificada')
        
        const authLocal = usuarioExists.usuarios_auth_providers.find(p => p.provider === 'LOCAL')

        if(!authLocal || !authLocal.contrasena_hash) throw new Error('Esta cuenta no tiene un método de acceso local registrado')
        
        const contrasenaValida = await bcrypt.compare(contrasena, authLocal.contrasena_hash)

        if(!contrasenaValida) throw new Error('Credenciales inválidas')


        const usuarioCleaned: IUsuario = {
            id: usuarioExists.id,
            nombre: usuarioExists.nombre,
            email: usuarioExists.email,
            email_verificado: usuarioExists.email_verificado,
            token_verificacion: usuarioExists.token_verificacion,
            token_verificacion_expires_at: usuarioExists.token_verificacion_expires_at,
            foto_perfil: usuarioExists.foto_perfil,
            created_at: usuarioExists.created_at,
            updated_at: usuarioExists.updated_at
        }

        const token = jwt.sign({id: usuarioCleaned.id}, env.JWT_SECRET, {expiresIn: '8h'})
        
        return {
            usuario: usuarioCleaned,
            token
        }
    }

    public async accesoGoogle(usuario: IUsuarioCrearDTO, providerId: string): Promise<{usuario: IUsuario, token: string}> {

        const usuarioExists = await this.usuarioRepository.findByEmailConAuthProviders(usuario.email)
        

        if(usuarioExists) {
            const authGoogle = usuarioExists.usuarios_auth_providers.find(p => p.provider === 'GOOGLE')
            const token = jwt.sign({id: usuarioExists.id}, env.JWT_SECRET, {expiresIn: '7d'})

            if(authGoogle) {

                const usuarioCleaned: IUsuario = {
                    id: usuarioExists.id,
                    nombre: usuarioExists.nombre,
                    email: usuarioExists.email,
                    email_verificado: usuarioExists.email_verificado,
                    token_verificacion: usuarioExists.token_verificacion,
                    token_verificacion_expires_at: usuarioExists.token_verificacion_expires_at,
                    foto_perfil: usuarioExists.foto_perfil,
                    created_at: usuarioExists.created_at,
                    updated_at: usuarioExists.updated_at
                }

                return {
                    usuario: usuarioCleaned,
                    token
                }
            } else {

                const usuarioAuthGoogle = await this.usuarioRepository.createAuthProviderGoogle(usuarioExists.email, providerId)

                return {
                    usuario: usuarioAuthGoogle,
                    token
                }

            }
        }

        const usuarioCreated = await this.usuarioRepository.createUsuarioGoogle({
            nombre: usuario.nombre,
            email: usuario.email,
            foto_perfil: usuario.foto_perfil,
            providerId
        })

        const usuarioCleaned: IUsuario = {
            id: usuarioCreated.id,
            nombre: usuarioCreated.nombre,
            email: usuarioCreated.email,
            email_verificado: usuarioCreated.email_verificado,
            token_verificacion: usuarioCreated.token_verificacion,
            token_verificacion_expires_at: usuarioCreated.token_verificacion_expires_at,
            foto_perfil: usuarioCreated.foto_perfil,
            created_at: usuarioCreated.created_at,
            updated_at: usuarioCreated.updated_at
        }

        const token = jwt.sign({id: usuarioCleaned.id}, env.JWT_SECRET, {expiresIn: '7d'})

        return {
            usuario: usuarioCleaned,
            token
        }


    }

}