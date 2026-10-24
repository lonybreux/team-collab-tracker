import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import ProyectoController from "../controllers/proyecto.controller.js";
import ProyectoService from "../services/proyecto.service.js";
import ProyectoRepository from "../repositories/proyecto.repository.js";
import UsuariosProyectosRepository from "../repositories/usuarios_proyectos.repository.js";
import schemaValidation from "../middlewares/validator.middleware.js";
import { proyectoIdParamsSchema } from "../validators/auth.validator.js";

const router = Router()

const proyectoRepository = new ProyectoRepository()
const usuariosProyectosRepository = new UsuariosProyectosRepository()
const proyectoService = new ProyectoService(proyectoRepository, usuariosProyectosRepository)
const proyectoController = new ProyectoController(proyectoService)

router.get('/', authMiddleware, proyectoController.getProyectos)
router.post('/', authMiddleware, proyectoController.createProyecto)
router.delete('/:id', authMiddleware, schemaValidation(proyectoIdParamsSchema, 'params'), proyectoController.deleteProyecto)

export default router