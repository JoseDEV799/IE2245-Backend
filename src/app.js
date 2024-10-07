import express from 'express';
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import bookRoutes from './routes/book.routes.js'
import categoryRoutes from './routes/category.routes.js'
import { faker } from '@faker-js/faker'
import Category from './models/category.model.js'
import Book from './models/book.model.js'
import dotenv from 'dotenv';

dotenv.config()
const app = express();
const corsOptions = {
    origin: 'https://jose-dev-799-biblioteca-ie-22455-pisco-frontend.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};
app.options('*', cors(corsOptions)); // Aquí está el cambio

app.use(cors(corsOptions));
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api', bookRoutes)
app.use('/api', categoryRoutes)

export default app;