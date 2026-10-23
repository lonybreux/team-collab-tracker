import type { Request, Response } from "express";
import type ProyectoService from "../services/proyecto.service.js";
import type { AuthenticatedRequest } from "../middlewares/auth.middleware.js";

export default class ProyectoController {

    constructor(private proyectoService: ProyectoService){}

    public getProyectos = async (req: Request, res: Response): Promise<void> => {
        try {

            const usuarioId = (req as AuthenticatedRequest).usuarioId

            const proyectos = await this.proyectoService.obtenerProyectosPorIdUsuario(usuarioId)

            res.status(200).json(proyectos)
            return

        } catch(error) {
            res.status(500).json({
                message: 'error interno del sistema. Vuelva a intentar más tarde.'
            })
            return
        }
    }
}