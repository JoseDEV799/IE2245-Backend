import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { obtenerLibros, obtenerLibro, crearLibro, modificarLibro, eliminarLibro } from '../controllers/book.controller.js'

const router = Router()

//Cliente


//Admin
router.get('/admin/book/books', obtenerLibros)
router.get('/admin/book/:idlibro', obtenerLibro)
router.post('/admin/book/register', crearLibro)
router.post('/admin/book/eliminar', eliminarLibro)
router.post('/admin/book/:idlibro', modificarLibro)


// router.get('/books', authRequired, allBooks)
// router.post('/books/id/:id', authRequired, findBookID)
// router.post('/books/category',authRequired,findBooksCategory)
// router.post('/books/search', authRequired, findBook)
// router.post('/books/store', authRequired, storeBook)
// router.post('/books/update', authRequired, updateBook)
// router.post('/books/delete', authRequired, deleteBook)

export default router