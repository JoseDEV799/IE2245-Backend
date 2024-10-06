//! Middleware
//TODO Este middleware se encarga de verificar los datos antes de llegar a la funcion de destino 
//?    req  => Peticion 
//?    res  => Respuesta del middleware,en este caso, solo para verificar si no hay token 
//?    next => Indica que la funcion continuara en otro lado, en este caso, la funcion a la cual esta destinada 
import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js'
export const authRequired = (req, res, next) => {
    const { token } = req.cookies
    if (!token)
        return res.status(401).json({
            "message": 'No logeado, acceso denegado'
        });
        jwt.verify(token, TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).json({
                'message': 'Invalid Token'
            });
            req.user = user
            next()
        })
}