import type { Request, Response, NextFunction } from "express";
import { ZodError, ZodObject } from "zod";

type TargetProperty = 'body' | 'query' | 'params'

const schemaValidation = (schema: ZodObject, target: TargetProperty = 'body') => (req: Request, res: Response, next: NextFunction) => {
    try {
        
        req[target] = schema.parse(req[target])

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