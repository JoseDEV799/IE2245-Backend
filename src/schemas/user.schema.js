import { z } from 'zod'
import User from '../models/user.model.js';

const emailExists = async (correo) => {
    return await User.findOne({ correo }) !== null
}

const dniExists = async (dni) => {
    return await User.findOne({ dni }) !== null
}

const emailExistsExcept = async (correo, userId) => {
    return await User.findOne({ correo, _id: { $ne: userId } }) !== null;
}

const dniExistsExcept = async (dni, userId) => {
    return await User.findOne({ dni, _id: { $ne: userId } }) !== null;
}

export const RegisterSchema = z.object({

    nombres: z
        .string({
            required_error: '* El nombre es requerido',
            invalid_type_error: '* Los nombres deben ser solamente con caracteres'
        }),

    apellidos: z
        .string({
            invalid_type_error: '* Los apellidos deben ser solamente con caracteres'
        })
        .regex(/^[a-zA-áéíóúÁÉÍÓÚÑñ]+$/, {
            message: '* Los apellidos deben ser solamente con caracteres'
        })
        .optional(),

    dni: z
        .string({
            required_error: '* El DNI es requerido'
        })
        .regex(
            /^\d+$/, { message: '* El DNI debe contener solo números' }
        )
        .refine(async (dni) => {
            return !(await dniExists(dni));
        }, {
            message: 'El DNI ya está registrado',
        }),

    correo: z
        .string()
        .email({ message: '* El correo debe tener el dominio @gmail, @hotmail, etc.' })
        .refine(async (correo) => {
            return !(await emailExists(correo));
        }, {
            message: 'El correo ya está registrado',
        })
        .optional(),

    password: z
        .string({
            required_error: '* La contraseña es requerida'
        })
        .min(3, {
            message: '* La contraseña requiere mínimo 3 caracteres'
        })
})

export const UpdateSchema = z.object({
    id: z.string(),
    nombres: z
        .string({
            required_error: '* El nombre es requerido',
            invalid_type_error: '* Los nombres deben ser solamente con caracteres'
        }),

    apellidos: z
        .string({
            invalid_type_error: '* Los apellidos deben ser solamente con caracteres'
        })
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚÑñ\s]+$/, {
            message: '* Los apellidos deben ser solamente con caracteres'
        })
        .optional(),

    dni: z
        .string({
            required_error: '* El DNI es requerido'
        })
        .regex(
            /^\d+$/, { message: '* El DNI debe contener solo números' }
        ),

    correo: z
        .string()
        .email({ message: '* El correo debe tener el dominio @gmail, @hotmail, etc.' })
        .optional()

})
    .refine(async (data) => {
        return !(await dniExistsExcept(data.dni, data.id));
    }, {
        path: ['dni'],
        message: 'El correo ya está registrado',
    })
    .refine(async (data) => {
        return !(await emailExistsExcept(data.correo, data.id));
    }, {
        path: ['correo'],
        message: 'El correo ya está registrado',
    })

export const PasswordChangeSchema = z.object({
    password: z
        .string({
            required_error: '* La contraseña es requerida'
        })
        .min(3, {
            message: '* La constraseña requiere mínimo 3 caracteres'
        })
})