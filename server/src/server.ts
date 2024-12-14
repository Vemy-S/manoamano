import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes'
import morgan from 'morgan'
import userRoutes from './routes/userRoutes'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import corsOptions from './config/corsOptions'
import postRoutes from './routes/postRoutes'
import reviewRoutes from './routes/reviewRoutes'
import profileRoutes from './routes/profileRoutes'

const app = express()

dotenv.config()
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

//carpeta estatica
app.use(express.static("uploads"));

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/review', reviewRoutes)

//api profile
app.use('/api/profile', profileRoutes)

export default app