import dotenv from 'dotenv'
import { z } from 'zod'
dotenv.config()

const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    FRONTEND_URL: z.url(),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    GOOGLE_REDIRECT_URI: z.url(),
    DATABASE_URL: z.url(),
    RESEND_API_KEY: z.string().min(1),
    JWT_SECRET: z.string().min(32)
})


const env = envSchema.parse(process.env)

export default env


