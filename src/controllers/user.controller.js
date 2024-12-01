import { createAccessToken } from "../libs/jwt.js"
import User from "../models/user.model.js" //* Modelo del Usuario
import bcrypt from 'bcryptjs' //* Se usa para poder encriptar, en este caso, la contraseña
import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js'

// CRUD USERS
export const obtenerUsuarios = async (req, res) => {
    try {
        const users = await User.find().sort({rol: 1})
        if(users.length === 0) return res.status(400).send('Aun no hay usuarios');
        return res.status(200).send(users)
    } catch (error) {
        console.log(error);
        return res.status(500).send('Ocurrio un problema')
    }
}

export const obtenerUsuario = async(req, res) => {
    try {
        const { id } = req.body
        const userFound = await User.findById(id)
        if(!userFound) return res.status(404).send('Usuario no encontrado');
        return res.status(200).send(userFound)
    } catch (error) {
        console.log(error);
        return res.status(500).send('Ocurrio un problema')
    }
}

export const registrarUsuario = async (req, res) => {
    const { nombres, apellidos, dni, correo, rol, password } = req.body                     
    try {
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            nombres,
            apellidos,                                                       
            dni,                                                            
            correo,
            rol,                                                         
            password: passwordHash
        })                                                                  
        await newUser.save()
        return res.status(200).json({
            message: 'Usuario registrado correctamente',
            user: newUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Ocurrio un problema',
            error: error
        })
    }
}

export const modificarUsuario = async(req, res) => {
    try {
        const { iduser } = req.params
        const { nombres, apellidos, dni, correo, rol } = req.body
        const userFound = await User.findByIdAndUpdate(
            iduser,
            {nombres, apellidos, dni, correo, rol},
            {new: true}
        )
        if(!userFound) return res.status(404).send('No encontrado');
        return res.status(200).json({
            message: 'Usuario actualizado correctamente',
            user: userFound
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send('Ocurrio un problema')
    }                  
}

export const eliminarUsuario = async(req, res) => {
    try {
        const { id } = req.body
        const userFound = await User.findById(id)
        if(!userFound) return res.status(404).send('Usuario no encontrado');
        await User.findByIdAndDelete(id)
        return res.status(200).send('Usuario eliminado correctamente')
    } catch (error) {
        console.log(error);
        return res.status(500).send('Ocurrio un problema')
    }
}

export const cambiarContraseña = async(req, res) => {
    try {
        const { id, password } = req.body
        const userFound = await User.findById(id)
        if(!userFound) return res.status(404).send('Usuario no encontrado');
        await User.findByIdAndUpdate(
            id,
            { password },
            { new: true}
        )
        return res.status(200).send('Contraseña actualizada correctamente')
    } catch (error) {
        console.log(error);
        return res.status(500).send('Ocurrio un problema')
    }
}

// export const login = async (req, res) => {
//     const { dni, password } = req.body;
//     console.log('Hola');
    
//     try {
//         const userFound = await User.findOne({ dni });
//         if (!userFound) {
//             return res.status(400).json({ 'message': 'Usuario no encontrado' });
//         }
        
//         const isMatch = await bcrypt.compare(password, userFound.password);
//         if (!isMatch) {
//             return res.status(400).json({ 'message': 'Credenciales incorrectas' });
//         }

//         const token = await createAccessToken({ id: userFound._id });

//         // Establece la cookie manualmente usando setHeader
//         res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax; Secure=${process.env.NODE_ENV === 'production'}`);


//         res.status(200).json({
//             id: userFound._id,
//             username: userFound.username,
//             email: userFound.email,
//             dni: userFound.dni,
//             createdAt: userFound.createdAt,
//             updateAt: userFound.updateAt
//         });
//     } catch (error) {
//         res.status(500).json({ 'message': error.message });
//     }
// };


// export const logout = (req, res) => {
//     res.cookie('token', '', {
//         expires: new Date(0)
//     })
//     return res.sendStatus(200)
// }

// export const profile = async (req, res) => {
//     const userFound = await User.findById(req.user.id)
//     if (!userFound) return res.status(400).json({
//         "message" : "Usuario no encontrado"
//     });
//     res.status(200).json({
//         id: userFound._id,
//         username: userFound.username,
//         email: userFound.email,
//         dni: userFound.dni,
//         createAt: userFound.createdAt,
//         updateAt: userFound.updateAt
//     })
// }

// export const verifyToken = async (req, res) => {
//     const { token } = req.cookies;
//     console.log(token);
    
//     if (!token) return res.send(false);

//     jwt.verify(token, TOKEN_SECRET, async (error, user) => {
//         if (error) return res.sendStatus(401);

//         const userFound = await User.findById(user.id);
//         if (!userFound) return res.sendStatus(401);

//         return res.json({
//             id: userFound._id,
//             username: userFound.username,
//             dni: userFound.dni
//         })
//     })
// }