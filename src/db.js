import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config()
export const conectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        // await mongoose.connect("mongodb+srv://josedev799:PmPwCL5FBFCYFGSq@ie22455pisco.galew.mongodb.net")
        console.log('Conectado a la base de datos')
    } catch (error) {
        console.log(error)
    }
}
