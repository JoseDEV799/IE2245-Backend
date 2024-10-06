import Book from "../models/book.model.js";

export const allBooks = async (req, res) => {
    const books = await Book.find()
    if (books.length === 0) return res.json({
        "message": "No se encontro ningun libro"
    })
    res.json({
        "books": books
    });
    return books
}

export const findBookID = async (req, res) => {
    const { id } = req.body
    try {
        const bookFound = await Book.findById(id)
        if (!bookFound) return res.status(400).json({
            "message": "Libro no encontrado"
        })
        res.status(200).json({
            id: bookFound._id,
            title: bookFound.title,
            author: bookFound.author,
            category: bookFound.category, 
            stock: bookFound.stock, 
            observation: bookFound.observation
        })
        return bookFound       
    } catch (error) {
        res.status(500).json({
            "message": error.message
        })
    }
}

export const findBooksCategory = async (req, res) => {
    const { customParam } = req.body
    if (!customParam) return res.status(400).json({
        message: 'No valido'
    })
    try {
        const regex = new RegExp(customParam, 'i')
        const booksFound = await Book.find({
            $or: [
                { category: { $regex: regex }},
            ]
        }) 
        res.status(200).json({
            books: booksFound
        })  
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const findBook = async (req, res) => {
    const { searchBook } = req.body
    if (!searchBook) return res.status(401).json({
        message: "El campo esta vacio"
    })
    try {
        const regex = new RegExp(searchBook, 'i')
        const booksFound = await Book.find({
            $or: [
                { title: { $regex: regex }},
                { author: { $regex: regex }}
            ]
        }).limit(3)
        if (booksFound.length <= 0) return res.status(404).json({message: 'No se encontro ninguna coincidencia'})
        res.status(200).json({
            books: booksFound
        })
        
    } catch (error) {
        res.status(400).json({
            message: error.message
        })        
    }
}

export const storeBook = async (req, res) => {
    const { title, author, category, stock, observation } = req.body
    try {
        const newBook = new Book({
            title,
            author,
            category,
            stock,
            observation
        })
        await newBook.save()
        res.json({
            id: newBook._id,
            title: newBook.title,
            author: newBook.author,
            category: newBook.category,
            stock: newBook.stock,
            observation: newBook.observation
        })
    } catch (error) {
        res.status(500).json({
            'message': error.message
        })
    }
}

export const updateBook = async (req, res) => {
    const { id, title, author, category, stock, observation } = req.body
    console.log(id)
    console.log("Hola")
    try {
        const bookFound = await Book.findByIdAndUpdate(
            id,
            {title, author, category, stock, observation},
            { new: true }
        )
        if (!bookFound) return res.json({
            "message" : "Libro no encontrado"
        })
        res.json({
            "message": "Libro actualizado"
        })
    } catch (error) {
        res.status(500).json({
            'message': error.message
        })
    }
}

export const deleteBook = async (req, res) => {
    const { id } = req.body
    try {
        const bookFound = await Book.findByIdAndDelete(id)
        if (!bookFound) return res.json({
            "message" : "No se encontro el libro"
        })
        bookFound.deleteOne()
        res.json({
            "message":"Libro eliminado"
        })
    } catch (error) {
        es.status(500).json({
            'message': error.message
        })
    }
}