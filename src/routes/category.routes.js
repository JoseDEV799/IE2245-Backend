import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from "../middlewares/validateSchema.js";
import { obtenerCategorias, obtenerCategoria, crearCategoria, modificarCategoria, eliminarCategoria } from '../controllers/category.controller.js'
import { RegisterSchema, UpdateSchema } from '../schemas/category.schema.js';

const router = Router()

//Cliente

// Admin
router.get('/admin/category/categories', obtenerCategorias)
router.post('/admin/category/register', validateSchema(RegisterSchema), crearCategoria)
router.post('/admin/category/eliminar',  eliminarCategoria)
router.post('/admin/category/update/:idcategoria', validateSchema(UpdateSchema), modificarCategoria)

export default router