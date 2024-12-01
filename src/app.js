import express from 'express';
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoutes from './routes/user.routes.js'
import bookRoutes from './routes/book.routes.js'
import categoryRoutes from './routes/category.routes.js'
// import {faker} from '@faker-js/faker'
// import Category from './models/category.model.js'
// import Book from './models/book.model.js'
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

dotenv.config()
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './tmp'
}));

app.use('/api', userRoutes)
app.use('/api', bookRoutes)
app.use('/api', categoryRoutes)

export default app;