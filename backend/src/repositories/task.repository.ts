import prisma from "../config/db.js";
import type { ITask, ITaskCreateDTO } from "../models/task.model.js";
import type IRepository from "./repository.interface.js";

export default class TaskRepository implements IRepository<ITask, ITaskCreateDTO> {
    

    public findById(id: string): Promise<ITask | null> {
        return prisma.tasks.findUnique({
            where: { id }
        })
    }

    public findByIdProyecto(id: string): Promise<ITask[] | null> {
        return prisma.tasks.findMany({
            where: {id_proyecto: id}
        })
    }

    public findByIdResponsable(id: string): Promise<ITask[] | null> {
        return prisma.tasks.findMany({
            where: {id_responsable: id}
        })
    }

    public findByIdCreadoPor(id: string): Promise<ITask[] | null> {
        return prisma.tasks.findMany({
            where: { creado_por: id}
        })
    }

    public create(entity: ITaskCreateDTO): Promise<ITask> {
        return prisma.tasks.create({
            data: {
                id_proyecto: entity.id_proyecto,
                id_responsable: entity.id_responsable,
                creado_por: entity.creado_por,
                titulo: entity.titulo,
                estado: entity.estado,
                descripcion: entity.descripcion,
                motivo_rechazo: entity.motivo_rechazo,
            }
        })
    }

    public update(entity: ITask): Promise<ITask> {
        return prisma.tasks.update({
            where: {
                id: entity.id
            },
            data: {
                id_proyecto: entity.id_proyecto,
                id_responsable: entity.id_responsable,
                creado_por: entity.creado_por,
                titulo: entity.titulo,
                estado: entity.estado,
                descripcion: entity.descripcion,
                motivo_rechazo: entity.motivo_rechazo
            }
        })
    }

    public async delete(id: string): Promise<void> {
        await prisma.tasks.delete({
            where: { id }
        })
    }

}