import type { IProyecto, IProyectoCrearDTO } from "../models/proyecto.model.js";
import type IRepository from "./repository.interface.js";
import prisma from '../config/db.js'
import type { Prisma } from "@prisma/client/extension";

export default class ProyectoRepository implements IRepository<IProyecto> {

    public async findById(id: string): Promise<IProyecto | null> {
        return await prisma.proyectos.findUnique({
            where: {id}
        })
    }

    public async findByCreadorId(id:string): Promise<IProyecto[] | null> {
        return await prisma.proyectos.findMany({
            where: {creado_por: id}
        })
    }

    public async createProyecto(entity: IProyectoCrearDTO, idCreador: string): Promise<IProyecto> {
        return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            const proyecto = await tx.proyectos.create({
                data: {
                    creado_por: idCreador,
                    titulo: entity.titulo,
                    curso_asignatura: entity.curso_asignatura
                }
            })

            await tx.usuarios_proyectos.create({
                data: {
                    id_usuario: idCreador,
                    id_proyecto: proyecto.id,
                    rol: 'TEAM_LEADER'
                }
            })

            return proyecto
        })
    }

    public async delete(id: string): Promise<void> {
        await prisma.proyectos.delete({
            where: {id}
        })
    }

}