import mongoose from "mongoose";
const BookSchema = new mongoose.Schema({
    denominacion: {
        type: String,
        required: true,
        trim: true,
    },
    autor: {
        type: String,
        required: true,
        trim: true,
    },
    observacion: {
        type: String,
        required: true,
        trim: true
    },
    cantidad: {
        type: String,
        require: true,
        trim: true,
        default: null,
    },
    area: {
        type: String,
        require: true,
        trim: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    portada: {
        type: String,
    },
    pdf: {
        type:String
    }
},{
    timestamps: true
})

export default mongoose.model('Book', BookSchema)