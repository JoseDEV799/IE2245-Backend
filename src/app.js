import express from 'express';
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import bookRoutes from './routes/book.routes.js'
import categoryRoutes from './routes/category.routes.js'
import {faker} from '@faker-js/faker'
import Category from './models/category.model.js'
import Book from './models/book.model.js'
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.get('/api/fake-books', async (req, res) => {
    const categories = await Category.find();
    const fakeBooks = [];
    for (let i = 0; i < 50; i++) {
        const randomCategory = faker.helpers.arrayElement(categories.map(category => category.name))
        fakeBooks.push({
            title: faker.word.words(5),
            author: faker.person.fullName(),
            category: randomCategory,
            stock: String(faker.number.bigInt({ min: 1n, max: 9n })),
            observation: faker.string.fromCharacters(['O', 'C'])
        });
    }
    try {
        await Book.insertMany(fakeBooks); // Usa await para la operación
        res.status(201).json({ message: 'Categorías falsas generadas', categories: fakeBooks });
    } catch (error) {
        res.status(500).json({ message: 'Error al insertar categorías', error: error.message });
    }
});

app.get('/api/fake-categories', async (req, res) => {
    const fakeCategories = [];
    for (let i = 0; i < 20; i++) {
        fakeCategories.push({
            name: faker.word.words(1),
            abbreviation: faker.string.fromCharacters(['A', 'B'])
        });
    }
    try {
        await Category.insertMany(fakeCategories); // Usa await para la operación
        res.status(201).json({ message: 'Categorías falsas generadas', categories: fakeCategories });
    } catch (error) {
        res.status(500).json({ message: 'Error al insertar categorías', error: error.message });
    }
});


app.use('/api',authRoutes)
app.use('/api',bookRoutes)
app.use('/api',categoryRoutes)

export default app;