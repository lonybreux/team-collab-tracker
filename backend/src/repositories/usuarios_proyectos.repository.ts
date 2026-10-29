import prisma from "../config/db.js";
import type { IUsuariosProyectos, IUsuariosProyectosCreateDTO } from "../models/usuarios_proyectos.model.js";
import type IRepository from "./repository.interface.js";

export default class UsuariosProyectosRepository implements IRepository<IUsuariosProyectos, IUsuariosProyectosCreateDTO> {
    
    public findById(id: string): Promise<IUsuariosProyectos | null> {
        return prisma.usuarios_proyectos.findUnique({
            where: { id }
        })
    }

    public findByIdUsuario(id: string): Promise<IUsuariosProyectos[]> {
        return prisma.usuarios_proyectos.findMany({
            where: {
                id_usuario: id
            }
        })
    }

    public findByIdProyecto(id: string): Promise<IUsuariosProyectos[] | null> {
        return prisma.usuarios_proyectos.findMany({
            where: {id_proyecto: id}
        })
    }

    public findByIdUsuarioAndIdProyecto(idUsuario: string, idProyecto: string): Promise<IUsuariosProyectos | null> {

        return prisma.usuarios_proyectos.findFirst({
            where: {
                id_usuario: idUsuario,
                id_proyecto: idProyecto
            }
        })
    }

    public create(entity: IUsuariosProyectosCreateDTO): Promise<IUsuariosProyectos> {
        return prisma.usuarios_proyectos.create({
            data: {
                id_usuario: entity.id_usuario,
                id_proyecto: entity.id_proyecto,
                rol: entity.rol
            }
        })
    }

    public update(entity: IUsuariosProyectos): Promise<IUsuariosProyectos> {
        return prisma.usuarios_proyectos.update({
            where: {
                id: entity.id
            },
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