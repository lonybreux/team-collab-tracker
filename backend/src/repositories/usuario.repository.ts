import { Prisma } from "@prisma/client/extension";
import prisma from "../config/db.js";
import type { IUsuario, IUsuarioConAuthProviders, IUsuarioCreateLocalDTO, IUsuarioCreateGoogleDTO } from "../models/usuario.model.js";


export default class UsuarioRepository {
    
    public findById(id: string): Promise<IUsuario | null> {
        return prisma.usuarios.findUnique({
            where: {id}
        })
    }

    public findByEmail(email: string): Promise<IUsuario | null> {
        return prisma.usuarios.findUnique({
            where: {email}
        })
    }

    public findByEmailConAuthProviders(email: string): Promise<IUsuarioConAuthProviders | null> {
        return prisma.usuarios.findUnique({
            where: {email},
            include: {usuarios_auth_providers: true}
        })
    }

    public async createUsuarioLocal(entity: IUsuarioCreateLocalDTO): Promise<IUsuario> {

        return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            const usuario = await tx.usuarios.create({
                data: {
                    nombre: entity.nombre,
                    email: entity.email,
                    token_verificacion: entity.token_verificacion,
                    token_verificacion_expires_at: entity.token_verificacion_expires_at,
                    foto_perfil: entity.foto_perfil    
                }
            })

            await tx.usuarios_auth_providers.create({
                data: {
                    id_usuario: usuario.id,
                    provider: 'LOCAL',
                    contrasena_hash: entity.contrasena_hash
                }
            })

            return usuario
        })
    }

    public async createAuthProviderLocal(idUsuario: string, contrasenaHash: string): Promise<void> {

        await prisma.usuarios_auth_providers.create({
            data: {
                id_usuario: idUsuario,
                provider: 'LOCAL',
                contrasena_hash: contrasenaHash
            }
        })

    }

    public async createUsuarioGoogle(entity: IUsuarioCreateGoogleDTO, provider_id: string): Promise<IUsuario> {

        return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            const usuario = await tx.usuarios.create({
                data: {
                    nombre: entity.nombre,
                    email: entity.email,
                    email_verificado: true,
                    foto_perfil: entity.foto_perfil
                }
            })

            await tx.usuarios_auth_providers.create({
                data: {
                    id_usuario: usuario.id,
                    provider: 'GOOGLE',
                    provider_id: provider_id
                }
            })

            return usuario
        })
    }

    public async createAuthProviderGoogle(email: string, providerId: string): Promise<IUsuario> {

        return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            
            const usuario = await tx.usuarios.update({
                where: {email},
                data: {
                    email_verificado: true,
                }
            })

            await tx.usuarios_auth_providers.create({
                data: {
                    id_usuario: usuario.id,
                    provider: 'GOOGLE',
                    provider_id: providerId
                }
            })

            return usuario
        })
    }

    public async updateEmailVerificado(email: string): Promise<IUsuario> {
        
        const usuarioVerified = await prisma.usuarios.update({
            where: {email},
            data: {
                email_verificado: true,
                token_verificacion: null,
                token_verificacion_expires_at: null
            }
        })

        return usuarioVerified
        
    }

    public async delete(id: string): Promise<void> {
        await prisma.usuarios.delete({
            where: { id }
        })
    }

}