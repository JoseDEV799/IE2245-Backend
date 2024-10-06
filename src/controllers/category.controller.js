import { json } from 'express'
import Category from '../models/category.model.js'

export const allCategories = async (req, res) => {
    try {
        const Categories = await Category.find()
        if (Categories.length == 0) return res.json({
            "message": "No se encontro ninguna categoria"
        })
        res.json({
            "Categorias": Categories
        })
        return Categories
    } catch (error) {
        res.status(500).json({
            "message": error.message
        });
    }
}

export const findCategory = async (req, res) => {
    const { id } = req.body
    console.log("Hola")
    try {
        const categoryFound = await Category.findById(id)
        if (!categoryFound) return res.status(400).json({
            "message": "Categoria no encontrada"
        })
        res.status(200).json({
            id: categoryFound._id,
            name: categoryFound.name,
            abbreviation: categoryFound.abbreviation
        })
        return categoryFound
    } catch (error) {
        res.status(500).json({
            "message": error.message
        });
    }
}

export const storeCategory = async (req, res) => {
    const { name, abbreviation } = req.body
    try {
        const newCategory = new Category({
            name,
            abbreviation
        })
        newCategory.save()
        res.status(200).json({
            "message": "Categoria resgistrado correctamente",
            "categoria": {
                id: newCategory._id,
                name: newCategory.name,
                abbreviation: newCategory.abbreviation 
            }
        });
    } catch (error) {
        res.status(500).json({
            "message": error.message
        });
    }
}

export const updateCategory = async (req, res) => {
    const { id, name, abbreviation } = req.body
    console.log("Obteniendo datos")
    try {
        const categoryFound = await Category.findByIdAndUpdate(
            id,
            { name, abbreviation },
            { new: true }
        )
        if (!categoryFound) return res.status(400).json({
            "message": "Categoria no encontrada"
        })
        res.status(200).json({
            id: categoryFound._id,
            name: categoryFound.name,
            abbreviation: categoryFound.abbreviation
        });
    } catch (error) {
        res.status(500).json({
            "message": error.message
        });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        res.json({ "message": "proximamente" })
    } catch (error) {
        res.status(500).json({
            "message": error.message
        });
    }
}