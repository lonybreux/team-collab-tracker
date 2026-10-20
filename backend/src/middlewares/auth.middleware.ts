import jwt from 'jsonwebtoken'

import type { NextFunction, Request, Response } from "express";
import env from '../config/env.js';

interface JwtPayload {
    id: string
}

export interface AuthenticatedRequest extends Request {
    usuarioId: string
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.session

    if(!token) {
        res.status(401).json({
            message: 'No estás autenticado'
        })

        return
    }

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload
        
        (req as AuthenticatedRequest).usuarioId = decoded.id
        
        next()
    } catch {
        res.status(401).json({
            message: 'Sesión inválida o expirada'
        })
        return
    }
}