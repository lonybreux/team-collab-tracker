import type { IUsuario, IUsuarioCreateGoogleDTO, IUsuarioRequestDTO } from "../models/usuario.model.js";
import { AccountNotVerifiedError, InvalidAuthMethodError, InvalidCredentialsError, InvalidVerificationTokenError, UserAlreadyExistsError, UserNotFoundError } from "../errors/app.error.js";
import type UsuarioRepository from "../repositories/usuario.repository.js";
import EmailService from "./email.service.js";

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import env from "../config/env.js";

export default class AuthService {

    constructor(private usuarioRepository: UsuarioRepository, private emailService: EmailService){}

    public async obtenerUsuarioPorId(id: string): Promise<IUsuario> {
        const usuario = await this.usuarioRepository.findById(id)

        if(!usuario) {
            throw new UserNotFoundError()
        }

        return usuario
    }

    public async registrarUsuarioLocal(usuario: IUsuarioRequestDTO): Promise<IUsuario> {

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
            contrasena_hash: contrasenaHash,
            token_verificacion: tokenVerificacion,
            token_verificacion_expires_at: expiresAt,
            foto_perfil: usuario.foto_perfil
        })

        await this.emailService.enviarEmailCodigoVerificacion(usuario.email, tokenVerificacion)

        return usuarioCreated
    }

    public async verificarEmail(token_verificacion: string, email: string): Promise<IUsuario> {

        const usuario = await this.usuarioRepository.findByEmail(email)

        if(!usuario) throw new UserNotFoundError()

        if(token_verificacion !== usuario.token_verificacion) throw new InvalidVerificationTokenError('El token de verificación no coincide')

        if(!usuario.token_verificacion_expires_at || usuario.token_verificacion_expires_at < new Date()) throw new InvalidVerificationTokenError('El código de verificación ha expirado')

        return await this.usuarioRepository.updateEmailVerificado(usuario.email)
        
    }

    public async loginUsuarioLocal(email: string, contrasena: string): Promise<{usuario: IUsuario, token: string}> {

        const usuarioExists = await this.usuarioRepository.findByEmailConAuthProviders(email)

        if(!usuarioExists) throw new InvalidCredentialsError()
        
        if(!usuarioExists.email_verificado) throw new AccountNotVerifiedError()
        
        const authLocal = usuarioExists.usuarios_auth_providers.find(p => p.provider === 'LOCAL')

        if(!authLocal || !authLocal.contrasena_hash) throw new InvalidAuthMethodError()
        
        const contrasenaValida = await bcrypt.compare(contrasena, authLocal.contrasena_hash)

        if(!contrasenaValida) throw new InvalidCredentialsError()

        const token = jwt.sign({id: usuarioExists.id}, env.JWT_SECRET, {expiresIn: '8h'})

        const usuario: IUsuario = {
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
            usuario,
            token
        }
    }

    public async accesoGoogle(usuario: IUsuarioCreateGoogleDTO): Promise<{usuario: IUsuario, token: string}> {

        const usuarioExists = await this.usuarioRepository.findByEmailConAuthProviders(usuario.email)
        
        if(usuarioExists) {
            const authGoogle = usuarioExists.usuarios_auth_providers.find(p => p.provider === 'GOOGLE')
            const token = jwt.sign({id: usuarioExists.id}, env.JWT_SECRET, {expiresIn: '8h'})

            if(authGoogle) {

                const usuario: IUsuario = {
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
                    usuario: usuario,
                    token
                }
            } else {

                const usuarioAuthGoogle = await this.usuarioRepository.createAuthProviderGoogle(usuarioExists.email, usuario.provider_id)

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
            provider_id: usuario.provider_id
        })

        
        const token = jwt.sign({id: usuarioCreated.id}, env.JWT_SECRET, {expiresIn: '8h'})

        return {
            usuario: usuarioCreated,
            token
        }


    }

}