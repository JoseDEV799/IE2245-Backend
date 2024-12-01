import { z } from 'zod'
import Category from '../models/category.model.js';

const nombreExists = async (nombre) => {
    return await Category.findOne({ nombre }) !== null
}

const abreviaturaExists = async (abreviatura) => {
    return await Category.findOne({ abreviatura }) !== null
}

const nombreExistsExcept = async (nombre, categoriaId) => {
    return await Category.findOne({ nombre, _id: { $ne: categoriaId } }) !== null;
}

const abreviaturaExistsExcept = async (abreviatura, categoriaId) => {
    return await Category.findOne({ abreviatura, _id: { $ne: categoriaId } }) !== null;
}

export const RegisterSchema = z.object({

    nombre: z
        .string({
            required_error: '* El nombre es requerido',
            invalid_type_error: '* El nombre debe ser solamente con caracteres'
        })
        .refine(async (nombre) => {
            return !(await nombreExists(nombre));
        }, {
            message: 'La categoria ya existe',
        }),

    abreviatura: z
        .string({
            invalid_type_error: '* La abreviatura debe ser solamente con caracteres'
        })
        .refine(async (abreviatura) => {
            return !(await abreviaturaExists(abreviatura));
        }, {
            message: 'La abreviatura ya existe',
        })
        .optional()
})

export const UpdateSchema = z.object({
    id: z.string(),
    nombre: z
        .string({
            required_error: '* El nombre es requerido',
            invalid_type_error: '* Los nombres deben ser solamente con caracteres'
        }),

        abreviatura: z
        .string({
            invalid_type_error: '* La abreviatura debe ser solamente con caracteres'
        })
        .optional()
})
    .refine(async (data) => {
        return !(await nombreExistsExcept(data.nombre, data.id));
    }, {
        path: ['nombre'],
        message: 'La categoria ya existe',
    })
    .refine(async (data) => {
        return !(await abreviaturaExistsExcept(data.abreviatura, data.id));
    }, {
        path: ['abreviatura'],
        message: 'La abreviatura ya existe',
    })
