import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { allCategories, findCategory ,storeCategory, updateCategory, deleteCategory } from '../controllers/category.controller.js'

const router = Router()

router.get('/category', authRequired, allCategories)
router.post('/category/id/:id', authRequired, findCategory)
router.post('/category/store', authRequired, storeCategory)
router.post('/category/update', authRequired, updateCategory)
router.post('/category/delete', authRequired, deleteCategory)

export default router