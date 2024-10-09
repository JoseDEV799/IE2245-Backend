import { createAccessToken } from "../libs/jwt.js"
import User from "../models/user.model.js" //* Modelo del Usuario
import bcrypt from 'bcryptjs' //* Se usa para poder encriptar, en este caso, la contraseña
import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js'

//* Metodo de registro de usuarios
export const register = async (req, res) => {
    const { dni, password, username, email } = req.body                     //! Crea las variables y su vez extrae el contenido del Request que tenga el mismo nombre
    try {
        const passwordHash = await bcrypt.hash(password, 10)                //TODO Encripta el password
        const newUser = new User({                                          //* Se crea un nuevo usuario basandose en el modelo User
            username,                                                       
            dni,                                                            
            email,                                                          
            password: passwordHash                                          //TODO El campo password contendra la constraseña encriptada
        })                                                                  
        const UserNew = await newUser.save()                                //* Se crea el nuevo usuario
        const token = await createAccessToken({id: UserNew._id})    
        res.cookie('token', token);
        res.json({
            id: UserNew._id,
            username: UserNew.username,
            email: UserNew.email,
            dni: UserNew.dni,
            createdAt: UserNew.createdAt,
            updateAt: UserNew.updateAt
        })
    } catch (error) {
        res.status(500).json({
            'message': error.message
        })
    }
}

export const login = async (req, res) => {
    const { dni, password } = req.body;
    try {
        const userFound = await User.findOne({ dni });
        if (!userFound) {
            return res.status(400).json({ 'message': 'Usuario no encontrado' });
        }
        
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({ 'message': 'Credenciales incorrectas' });
        }

        const token = await createAccessToken({ id: userFound._id });

        // Establece la cookie manualmente usando setHeader
        res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; SameSite=Lax; Secure=${process.env.NODE_ENV === 'production'}`);

        res.status(200).json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            dni: userFound.dni,
            createdAt: userFound.createdAt,
            updateAt: userFound.updateAt
        });
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
};


export const logout = (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    if (!userFound) return res.status(400).json({
        "message" : "Usuario no encontrado"
    });
    res.status(200).json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        dni: userFound.dni,
        createAt: userFound.createdAt,
        updateAt: userFound.updateAt
    })
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if (error) return res.sendStatus(401);

        const userFound = await User.findById(user.id);
        if (!userFound) return res.sendStatus(401);

        return res.json({
            id: userFound._id,
            username: userFound.username,
            dni: userFound.dni
        })
    })
}