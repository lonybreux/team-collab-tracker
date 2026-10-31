import type { Request, Response } from "express";
import type ProyectoService from "../services/proyecto.service.js";
import ProyectoMapper from "../mappers/proyecto.mapper.js";
import type { AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import type { IProyectoRequestDTO, IProyectoResponseDTO } from "../models/proyecto.model.js";
import { AppError } from "../errors/app.error.js";

export default class ProyectoController {

    constructor(private proyectoService: ProyectoService){}

    public getProyectos = async (req: Request, res: Response): Promise<void> => {
        try {

            const usuarioId = (req as AuthenticatedRequest).usuarioId

            const proyectos = await this.proyectoService.obtenerProyectosPorIdUsuario(usuarioId)

            const proyectosResponse: IProyectoResponseDTO[] = ProyectoMapper.toResponseArrayDTO(proyectos)

            res.status(200).json(proyectosResponse)
            return

        } catch(error) {
            res.status(500).json({
                message: 'error interno del sistema. Vuelva a intentar más tarde.'
            })
            return
        }
    }

    public createProyecto = async (req: Request, res: Response): Promise<void> => {
        try {

            const usuarioId = (req as AuthenticatedRequest).usuarioId

            const proyecto: IProyectoRequestDTO = req.body

            const createdProyecto = await this.proyectoService.crearProyecto(proyecto, usuarioId)

            const proyectoResponse: IProyectoResponseDTO = ProyectoMapper.toResponseDTO(createdProyecto)

            res.status(201).json({
                message: "Proyecto creado correctamente",
                body: {
                    proyecto: proyectoResponse
                }
            })
            return
        } catch(error) {

            if(error instanceof AppError) {
                res.status(error.statusCode).json({
                    message: error.message
                })
                return
            }

            res.status(500).json({
                message: 'error interno del sistema. Vuelva a intentar más tarde.'
            })
            return
        }
    }

    public deleteProyecto = async (req: Request, res: Response): Promise<void> => {
        try {

            const usuarioId = (req as AuthenticatedRequest).usuarioId

            const proyectoId = req.params.id as string

            await this.proyectoService.eliminarProyecto(usuarioId, proyectoId)

            res.status(200).json({
                message: "Proyecto eliminado correctamente"
            })
            return

        } catch(error) {
            
            if(error instanceof AppError) {
                res.status(error.statusCode).json({
                    message: error.message
                })
                return
            }

            res.status(500).json({
                message: 'error interno del sistema. Vuelva a intentar más tarde.'
            })
            return
        }
    }
}