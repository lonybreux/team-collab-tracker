import type { Request, Response } from "express";
import type ProyectoService from "../services/proyecto.service.js";
import type { AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import type { IProyectoCrearDTO } from "../models/proyecto.model.js";
import { AppError } from "../errors/app.error.js";

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

    public createProyecto = async (req: Request, res: Response): Promise<void> => {
        try {

            const usuarioId = (req as AuthenticatedRequest).usuarioId

            const proyecto: IProyectoCrearDTO = req.body

            const createdProyecto = await this.proyectoService.crearProyecto(proyecto, usuarioId)

            res.status(201).json({
                message: "Proyecto creado correctamente",
                body: {
                    proyecto: createdProyecto
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