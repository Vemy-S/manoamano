import express from 'express'
import dotenv from 'dotenv'
import authControllers from './routes/authRoutes'
import morgan from 'morgan'
import userControllers from './routes/userRoutes'
import cookieParser from 'cookie-parser'
import testMiddleware from './routes/authTestRoutes'
import cors from 'cors'
import corsOptions from './config/corsOptions'

const app = express()


dotenv.config()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authControllers)
app.use('/api/user', userControllers)
app.use('/api/test', testMiddleware)

export default app  