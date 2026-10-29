import type { IProyecto, IProyectoCreateDTO } from "../models/proyecto.model.js";
import type IRepository from "./repository.interface.js";
import prisma from '../config/db.js'
import type { Prisma } from "@prisma/client/extension";

export default class ProyectoRepository implements IRepository<IProyecto, IProyectoCreateDTO> {
    
    public findById(id: string): Promise<IProyecto | null> {
        return prisma.proyectos.findUnique({
            where: {id}
        })
    }

    public findByCreadorId(id:string): Promise<IProyecto[] | null> {
        return prisma.proyectos.findMany({
            where: {creado_por: id}
        })
    }

    public create(entity: IProyectoCreateDTO): Promise<IProyecto> {
        return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            const proyecto = await tx.proyectos.create({
                data: {
                    creado_por: entity.creado_por,
                    titulo: entity.titulo,
                    curso_asignatura: entity.curso_asignatura
                }
            })

            await tx.usuarios_proyectos.create({
                data: {
                    id_usuario: entity.creado_por,
                    id_proyecto: proyecto.id,
                    rol: 'TEAM_LEADER'
                }
            })

            return proyecto
        })
    }

    public update(entity: IProyecto): Promise<IProyecto> {
        return prisma.proyectos.update({
            where: {
                id: entity.id
            },
            data: {
                creado_por: entity.creado_por,
                titulo: entity.titulo,
                curso_asignatura: entity.curso_asignatura,
            }
        })
    }


    public async delete(id: string): Promise<void> {
        await prisma.proyectos.delete({
            where: {id}
        })
        
    }

}