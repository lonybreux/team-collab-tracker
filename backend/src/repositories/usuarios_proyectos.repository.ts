import prisma from "../config/db.js";
import type { IUsuariosProyectos, IUsuariosProyectosCrearDTO } from "../models/usuarios_proyectos.model.js";
import type IRepository from "./repository.interface.js";

export default class UsuariosProyectosRepository implements IRepository<IUsuariosProyectos> {

    public async findById(id: string): Promise<IUsuariosProyectos | null> {
        return await prisma.usuarios_proyectos.findUnique({
            where: { id }
        })
    }

    public async findByIdUsuario(id: string): Promise<IUsuariosProyectos[] | null> {
        return await prisma.usuarios_proyectos.findMany({
            where:  {id_usuario: id}
        })
    }

    public async findByIdProyecto(id: string): Promise<IUsuariosProyectos[] | null> {
        return await prisma.usuarios_proyectos.findMany({
            where: {id_proyecto: id}
        })
    }

    public async createUsuarioProyecto(entity: IUsuariosProyectosCrearDTO): Promise<IUsuariosProyectos> {
        return await prisma.usuarios_proyectos.create({
            data: {
                id_usuario: entity.id_usuario,
                id_proyecto: entity.id_proyecto,
                rol: entity.rol
            }
        })
    }


    public async delete(id: string): Promise<void> {
        await prisma.usuarios_proyectos.delete({
            where: { id }
        })
    }
    
}