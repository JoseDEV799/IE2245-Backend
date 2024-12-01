import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    abreviatura: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Category = mongoose.model('Category', CategorySchema)
export default Category