import { ProjectDoesntExistError, UnauthorizedMemberActionError } from "../errors/app.error.js";
import type { IProyecto, IProyectoCreateDTO } from "../models/proyecto.model.js";
import type { IUsuariosProyectos } from "../models/usuarios_proyectos.model.js";
import type ProyectoRepository from "../repositories/proyecto.repository.js";
import type UsuariosProyectosRepository from "../repositories/usuarios_proyectos.repository.js";

export default class ProyectoService {

    constructor(private proyectoRepository: ProyectoRepository, private usuariosProyectosRepository: UsuariosProyectosRepository){}

    public async obtenerProyectoPorId(id: string): Promise<IProyecto | null> {

        return await this.proyectoRepository.findById(id)
    }

    public async obtenerProyectosPorIdUsuario(id: string): Promise<IUsuariosProyectos[]> {

        return await this.usuariosProyectosRepository.findByIdUsuario(id)

    }

    public async obtenerPorIdCreador(id: string): Promise<IProyecto[] | null> {
        return await this.proyectoRepository.findByCreadorId(id)
    }

    public async crearProyecto(entity: IProyectoCreateDTO): Promise<IProyecto | null> {
        return await this.proyectoRepository.create(entity)
    }

    public async eliminarProyecto(idUsuario: string, idProyecto: string): Promise<void> {
        
        const usuarioProyecto = await this.usuariosProyectosRepository.findByIdUsuarioAndIdProyecto(idUsuario, idProyecto)

        if(usuarioProyecto === null) {
            throw new ProjectDoesntExistError()
        }

        if(usuarioProyecto.rol !== 'TEAM_LEADER') {
            throw new UnauthorizedMemberActionError()
        }


        await this.proyectoRepository.delete(idProyecto)
        return

    }
}