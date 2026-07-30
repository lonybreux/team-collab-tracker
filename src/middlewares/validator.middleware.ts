import type { Request, Response, NextFunction } from "express";
import { ZodError, ZodObject } from "zod";

const schemaValidation = (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body)

        next()
    } catch(error) {
        if(error instanceof ZodError) {
            res.status(400).json(error.issues.map(issue => ({message: issue.message})))
            return
        }

        res.status(400).json({
            message: 'campos inválidos'
        })
        return
    }
}

export default schemaValidation