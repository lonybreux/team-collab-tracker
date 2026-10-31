import type { IProyecto, IProyectoResponseDTO } from "../models/proyecto.model.js";

export default class ProyectoMapper {

    public static toResponseDTO(proyecto: IProyecto): IProyectoResponseDTO {
        return {
            id: proyecto.id,
            creado_por: proyecto.creado_por,
            titulo: proyecto.titulo,
            curso_asignatura: proyecto.curso_asignatura,
            created_at: proyecto.created_at
        }
    }

    public static toResponseArrayDTO(proyectos: IProyecto[]): IProyectoResponseDTO[] {
        return proyectos.map(proyecto => this.toResponseDTO(proyecto))
    }
}