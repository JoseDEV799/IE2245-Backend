import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config()
export const conectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log('Conectado a la base de datos')
    } catch (error) {
        console.log(error)
    }
}
