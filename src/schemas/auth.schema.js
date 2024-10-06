import { z } from 'zod'
export const RegisterSchema = z.object({
    username: z.string({
        required_error: 'El nombre es requerido',
        invalid_type_error: 'El nombre debe ser solamente con caracteres'
    }),

    email: z
    .string({
        required_error: 'El correo es requerido'
    })
    .email({
        message: 'Correo invalido'
    }),
    
    password: z
    .string({
        required_error: 'La contraseña es requerida'
    })
    .min(1, {
        message: 'El password requiere minimo 1 caracter'
    })
})