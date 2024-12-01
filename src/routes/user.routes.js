import { Router } from "express";
import { obtenerUsuarios, registrarUsuario, modificarUsuario, eliminarUsuario, cambiarContraseña } from "../controllers/user.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { RegisterSchema, UpdateSchema, PasswordChangeSchema } from "../schemas/user.schema.js"
const router = Router()

// Cliente

// Admin
router.get('/admin/user/users', obtenerUsuarios)
router.post('/admin/user/register', validateSchema(RegisterSchema), registrarUsuario)
router.post('/admin/user/eliminar',  eliminarUsuario)
router.post('/admin/user/update/:iduser', validateSchema(UpdateSchema), modificarUsuario)
router.post('/admin/user/change/password', validateSchema(PasswordChangeSchema), cambiarContraseña)

// router.post('/login', login)
// router.post('/logout', logout)
// router.get('/verify', verifyToken)
// router.get('/profile', authRequired, profile)

export default router