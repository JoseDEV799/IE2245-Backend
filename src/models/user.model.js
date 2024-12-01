import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    nombres: {
        type: String,
        required: true,
        trim: true,
    },
    apellidos: {
        type: String,
        trim: true,
    },
    dni:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    correo: {
        type: String,
        trim: true,
        unique: true
    },
    rol: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
},{
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User