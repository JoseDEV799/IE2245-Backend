import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { allBooks, findBookID, findBook, storeBook, updateBook, deleteBook, findBooksCategory } from '../controllers/book.controller.js'

const router = Router()

router.get('/books', authRequired, allBooks)
router.post('/books/id/:id', authRequired, findBookID)
router.post('/books/category',authRequired,findBooksCategory)
router.post('/books/search', authRequired, findBook)
router.post('/books/store', authRequired, storeBook)
router.post('/books/update', authRequired, updateBook)
router.post('/books/delete', authRequired, deleteBook)

export default router