import type { Request, Response } from 'express'
import express from 'express'
import cors, { type CorsOptions } from 'cors'
import env from './config/env.js'
import authRoutes from './routes/auth.routes.js'

const corsOptions: CorsOptions = {
    origin: env.FRONTEND_URL,
    methods: ['GET','POST','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400
}

const app = express()

app.use(cors(corsOptions))
app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/ping',(_req: Request, res: Response) => {
    try {
        res.json({
            message: 'pong'
        })
        return
    } catch(error) {
        res.status(500).json({
            message: 'error interno del sistema. Vuelva a intentar más tarde.',
        })
        return
    }
})

export default app