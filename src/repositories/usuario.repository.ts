import type IRepository from "./repository.interface.js";
import prisma from "../config/db.js";
import type { IUsuario, IUsuarioCrearDTO, IUsuarioConAuthProviders } from "../models/usuario.model.js";

export default class UsuarioRepository implements IRepository<IUsuario> {

    public async findById(id: string): Promise<IUsuario | null> {
        return await prisma.usuarios.findUnique({
            where: {id}
        })
    }

    public async findByEmail(email: string): Promise<IUsuario | null> {
        return await prisma.usuarios.findUnique({
            where: {email}
        })
    }

    public async findByEmailConAuthProviders(email: string): Promise<IUsuarioConAuthProviders | null> {
        return await prisma.usuarios.findUnique({
            where: {email},
            include: {usuarios_auth_providers: true}
        })
    }

    public async createUsuarioLocal(entity: Omit<IUsuarioCrearDTO, 'contrasena'> & 
        {contrasenaHash: string, tokenVerificacion: string, tokenVerificacionExpiresAt: Date}): Promise<IUsuario> {

        return await prisma.$transaction(async (tx) => {
            const usuario = await tx.usuarios.create({
                data: {
                    nombre: entity.nombre,
                    email: entity.email,
                    token_verificacion: entity.tokenVerificacion,
                    token_verificacion_expires_at: entity.tokenVerificacionExpiresAt,
                    foto_perfil: entity.foto_perfil    
                }
            })

            await tx.usuarios_auth_providers.create({
                data: {
                    id_usuario: usuario.id,
                    provider: 'LOCAL',
                    contrasena_hash: entity.contrasenaHash
                }
            })

            return usuario
        })
    }
    public async delete(id: string): Promise<void> {
        await prisma.usuarios.delete({
            where: {id}
        })
        return
    }

}