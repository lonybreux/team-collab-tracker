import prisma from "../config/db.js";
import type { IInvitacionesProyectos, IInvitacionesProyectosCreateDTO } from "../models/invitaciones_proyectos.model.js";
import type IRepository from "./repository.interface.js";

export default class InvitacionesProyectosRepository implements IRepository<IInvitacionesProyectos, IInvitacionesProyectosCreateDTO> {
    
    
    public findById(id: string): Promise<IInvitacionesProyectos | null> {
        return prisma.invitaciones_proyectos.findUnique({
            where: {
                id
            }
        })
    }

    public create(entity: IInvitacionesProyectosCreateDTO): Promise<IInvitacionesProyectos> {
        return prisma.invitaciones_proyectos.create({
            data: entity
        })
    }

    public update(entity: IInvitacionesProyectos): Promise<IInvitacionesProyectos> {
        return prisma.invitaciones_proyectos.update({
            where: { id: entity.id },
            data: {
                aceptada: entity.aceptada
            }
        })
    }

    public async delete(id: string): Promise<void> {
        await prisma.invitaciones_proyectos.delete({
            where: {
                id
            }
        })
    }
    
    
    

}