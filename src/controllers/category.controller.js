import { json } from 'express'
import Category from '../models/category.model.js'
import Book from '../models/book.model.js'
export const obtenerCategorias = async(req, res) => {
    try {
        const categoriasFound = await Category.find()
        if (categoriasFound.length == 0) return res.status(204).send('Sin resultados');
        return res.status(200).send(categoriasFound)
    } catch (error) {
        console.log(error);
        return res.status(400).send('Ocurrio un problema')
    }
}

export const obtenerCategoria = async(req, res) => {
    try {
        const { idcategoria } = req.params
        const categoriaFound = await Category.findById(idcategoria)
        if (!categoriaFound) return res.status(204).send('Categoria no encontrada');
        return res.status(200).send(categoriaFound)
    } catch (error) {
        console.log(error);
        return res.status(400).send('Ocurrio un problema')
    }
}

export const crearCategoria = async(req, res) => {
    try {
        const { nombre, abreviatura } = req.body
        const newCategoria = new Category({
            nombre: nombre,
            abreviatura: abreviatura
        })
        await newCategoria.save()
        return res.status(200).json({
            message: 'Categoria creada correctamente',
            categoria: newCategoria
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send('Ocurrio un problema')
    }
}

export const modificarCategoria = async(req, res) => {
    try {
        const { idcategoria } = req.params
        const { nombre, abreviatura } = req.body
        const categoriaFound = await Category.findByIdAndUpdate(
            idcategoria,
            {nombre, abreviatura},
            {new: true}
        )
        if (!categoriaFound) return res.status(404).send('Categoria no encontrada')
        return res.status(200).json({
            message: 'Categoria actualizada correctamente',
            categoria: categoriaFound 
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send('Ocurrio un problema')
    }
}

export const eliminarCategoria = async(req, res) => {
    try {
        const { id } = req.body
        const categoriaFound = await Category.findById(id)
        if (!categoriaFound) return res.status(404).send('Categoria no encontrada');
        const libros = await Book.find({ category_id : id})
        for (const libro of Array.isArray(libros) ? libros : [libros]) {
            libro.category_id = null
            await libro.save()
        }
        await Category.findByIdAndDelete(id)
        return res.status(200).send('Categoria eliminada correctamente')
    } catch (error) {
        console.log(error);
        return res.status(400).send('Ocurrio un problema')
    }
}