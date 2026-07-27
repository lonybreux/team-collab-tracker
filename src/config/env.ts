import dotenv from 'dotenv'
import { z } from 'zod'
dotenv.config()

const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    FRONTEND_URL: z.string().url(),
    CLIENT_ID: z.string().min(1),
    CLIENT_SECRET: z.string().min(1),
    DATABASE_URL: z.string().url()
})


const env = envSchema.parse(process.env)

export default env


