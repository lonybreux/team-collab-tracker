import type { IProyecto, IProyectoCrearDTO } from "../models/proyecto.model.js";
import type ProyectoRepository from "../repositories/proyecto.repository.js";

export default class ProyectoService {

    constructor(private proyectoRepository: ProyectoRepository){}

    public async obtenerProyectoPorId(id: string): Promise<IProyecto | null> {

        return await this.proyectoRepository.findById(id)
    }

    public async obtenerPorIdCreador(id: string): Promise<IProyecto[] | null> {
        return await this.proyectoRepository.findByCreadorId(id)
    }

    public async crearProyecto(entity: IProyectoCrearDTO, idCreador: string): Promise<IProyecto | null> {
        return await this.proyectoRepository.createProyecto(entity,idCreador)
    }

    public async eliminarProyecto(id: string): Promise<void> {
        return await this.proyectoRepository.delete(id)
    }
}