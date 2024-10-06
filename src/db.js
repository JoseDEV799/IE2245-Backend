import mongoose from 'mongoose'

export const conectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/db-ie22455')
        console.log('Conectado a la base de datos')
    } catch (error) {
        console.log(error)
    }
}
