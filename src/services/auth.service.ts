import type { IUsuario, IUsuarioCrearDTO } from "../models/usuario.model.js";
import type UsuarioRepository from "../repositories/usuario.repository.js";

import bcrypt from 'bcrypt'
import crypto from 'node:crypto'

export default class AuthService {

    constructor(private usuarioRepository: UsuarioRepository){}

    public async registrarUsuarioLocal(usuario: IUsuarioCrearDTO): Promise<IUsuario> {

        const usuarioExists = await this.usuarioRepository.findByEmail(usuario.email)

        if(usuarioExists) throw new Error('El usuario ya existe')

        const contrasenaHash = await bcrypt.hash(usuario.contrasena, 10)

        const tokenVerificacion = crypto.randomInt(100000, 999999).toString()
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

        return await this.usuarioRepository.createUsuarioLocal({
            nombre: usuario.nombre,
            email: usuario.email,
            contrasenaHash,
            tokenVerificacion,
            tokenVerificacionExpiresAt: expiresAt,
            foto_perfil: usuario.foto_perfil
        })
    }

}