import type { IUsuario, IUsuarioCrearDTO } from "../models/usuario.model.js";
import type UsuarioRepository from "../repositories/usuario.repository.js";
import type EmailService from "./email.service.js";

import bcrypt from 'bcrypt'
import crypto from 'node:crypto'


export default class AuthService {

    constructor(private usuarioRepository: UsuarioRepository, private emailService: EmailService){}

    public async registrarUsuarioLocal(usuario: IUsuarioCrearDTO): Promise<IUsuario> {

        const usuarioExists = await this.usuarioRepository.findByEmail(usuario.email)

        if(usuarioExists) throw new Error('El usuario ya existe')

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

}