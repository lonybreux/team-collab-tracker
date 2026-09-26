import prisma from "../config/db.js";
import type { ITask, ITaskCrearDto } from "../models/task.model.js";
import type IRepository from "./repository.interface.js";

export default class TaskRepository implements IRepository<ITask> {

    public async findById(id: string): Promise<ITask | null> {
        return await prisma.tasks.findUnique({
            where: { id }
        })
    }

    public async findByIdProyecto(id: string): Promise<ITask[] | null> {
        return await prisma.tasks.findMany({
            where: {id_proyecto: id}
        })
    }

    public async findByIdResponsable(id: string): Promise<ITask[] | null> {
        return await prisma.tasks.findMany({
            where: {id_responsable: id}
        })
    }

    public async findByIdCreadoPor(id: string): Promise<ITask[] | null> {
        return await prisma.tasks.findMany({
            where: { creado_por: id}
        })
    }

    public async createTasks(entity: ITaskCrearDto): Promise<ITask> {
        return await prisma.tasks.create({
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

    public async delete(id: string): Promise<void> {
        await prisma.tasks.delete({
            where: { id }
        })
    }

}