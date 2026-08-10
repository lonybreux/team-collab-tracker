import { Router } from "express";
import schemaValidation from "../middlewares/validator.middleware.js";
import { loginSchema, registrarSchema, verificarEmailSchema, googleCallbackSchema } from "../validators/auth.validator.js";
import AuthController from "../controllers/auth.controller.js";
import AuthService from "../services/auth.service.js";
import EmailService from "../services/email.service.js";
import UsuarioRepository from "../repositories/usuario.repository.js";
const router = Router()

const usuarioRepository = new UsuarioRepository()
const emailService = new EmailService()
const authService = new AuthService(usuarioRepository, emailService)
const authController = new AuthController(authService)

router.post('/register', schemaValidation(registrarSchema), authController.register)
router.post('/verificar-email', schemaValidation(verificarEmailSchema), authController.verificarEmail)
router.post('/login',schemaValidation(loginSchema), authController.login)
router.get('/google', authController.google)
router.get('/google/callback', schemaValidation(googleCallbackSchema, 'query'), authController.googleCallback)

export default router