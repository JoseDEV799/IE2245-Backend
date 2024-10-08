import express from 'express';
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import bookRoutes from './routes/book.routes.js'
import categoryRoutes from './routes/category.routes.js'
// import {faker} from '@faker-js/faker'
// import Category from './models/category.model.js'
// import Book from './models/book.model.js'
import dotenv from 'dotenv';

dotenv.config()
const app = express();

app.use(cors({
    origin: 'https://frontend-ie22455.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api', bookRoutes)
app.use('/api', categoryRoutes)

export default app;