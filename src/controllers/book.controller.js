import Book from "../models/book.model.js";
import { subirArchivoS3, getFileURLS3, deleteFileS3 } from '../aws/s3.js'

export const obtenerLibros = async (req, res) => {
    try {
        const libros = await Book.find()
            .sort({category_id: -1})
            .populate('category_id', 'nombre')
        if (libros.length == 0) return res.status(204).send('Sin resultados');
        const librosTransformados = libros.map((libro) => {
            return {
                ...libro.toObject(),  // Asegúrate de convertir el documento a un objeto plano
                category_id: libro.category_id ? libro.category_id.nombre : null  // Solo nombre o null
            };
        });
        for (const libro of librosTransformados) {
            if(libro.portada) {
                const tmp = libro.portada
                libro.portada = await getFileURLS3(tmp)
            }
            if(libro.pdf){
                const tmp = libro.pdf
                libro.pdf = await getFileURLS3(tmp)
            }
        }
        return res.status(200).send(librosTransformados)
    } catch (error) {
        console.log(error);
        return res.status(400).send('Ocurrio un problema')
    }
}

export const obtenerLibro = async (req, res) => {
    try {
        const { idlibro } = req.params
        const libroFound = await Book.findById(idlibro)
        if (!idlibro) return res.status(404).send('Libro no encontrado');
        return res.status(200).send(libroFound)
    } catch (error) {
        console.log(error);
        return res.status(400).send('Ocurrio un problema')
    }
}

export const crearLibro = async (req, res) => {
    console.log(req.body);
    console.log(req.files);
    try {
        const { denominacion, autor, area, cantidad, observacion, categoria_id } = req.body
        const newBook = new Book({
            denominacion: denominacion,
            autor: autor,
            area: area,
            cantidad: cantidad,
            observacion: observacion,
            category_id: categoria_id
        })

        if(req.files && req.files.portada) {
            console.log(req.files.portada.name);
            const { portada } = req.files
            const ruta = `libros/${newBook._id}/portada/${portada.name}`
            await subirArchivoS3(portada, ruta)
            newBook.portada = ruta
        }

        if(req.files && req.files.pdf) {
            console.log(req.files.pdf.name);
            const { pdf } = req.files
            const ruta = `libros/${newBook._id}/pdf/${pdf.name}`
            await subirArchivoS3(pdf, ruta, 'application/pdf')
            newBook.pdf = ruta
        }
        await newBook.save()
        return res.status(200).json({
            message: 'Libro creada correctamente',
            libro: newBook
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send('Ocurrio un problema')
    }
}

export const modificarLibro = async (req, res) => {
    try {        
        const { idlibro } = req.params;
        const { denominacion, autor, area, cantidad, observacion, categoria_id } = req.body;
        const libroFound = await Book.findById(idlibro)
        if(!libroFound) return res.status(404).send('Libro no encontrado');

        if(denominacion) libroFound.denominacion = denominacion
        if(autor) libroFound.autor = autor
        if(area) libroFound.area = area
        if(cantidad) libroFound.cantidad = cantidad
        if(observacion) libroFound.observacion = observacion
        if (categoria_id == 'Sin categoria') {
            libroFound.category_id = null;
        } else {
            libroFound.category_id = categoria_id
        }
        console.log(req.files);
        
        if (req.files && req.files.portada) {
            console.log(req.files.portada.name);
            if (libroFound.portada) await deleteFileS3(libroFound.portada);
            const { portada } = req.files
            const ruta = `libros/${libroFound._id}/portada/${portada.name}`
            await subirArchivoS3(portada, ruta)
            libroFound.portada = ruta
        }

        if (req.files && req.files.pdf) {
            if (libroFound.pdf) await deleteFileS3(libroFound.pdf);
            const { pdf } = req.files
            const ruta = `libros/${libroFound._id}/pdf/${pdf.name}`
            await subirArchivoS3(pdf, ruta, 'application/pdf')
            libroFound.pdf = ruta
        }

        await libroFound.save()

        if (libroFound.portada) {
            const tmp = libroFound.portada
            libroFound.portada = await getFileURLS3(tmp) 
        }

        if (libroFound.pdf) {
            const tmp = libroFound.pdf
            libroFound.pdf = await getFileURLS3(tmp) 
        }

        return res.status(200).json({
            message: 'Libro actualizado correctamente',
            libro: libroFound
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send('Ocurrió un problema');
    }
}

export const eliminarLibro = async (req, res) => {
    try {
        const { id } = req.body
        const libroFound = await Book.findById(id)
        if (!libroFound) return res.status(404).send('Libro no encontrada');
        if (libroFound.portada) {
            await deleteFileS3(libroFound.portada)
        }
        if (libroFound.pdf) {
            await deleteFileS3(libroFound.pdf)
        }
        await Book.findByIdAndDelete(id)
        return res.status(200).send('Libro eliminado correctamente')
    } catch (error) {
        console.log(error);
        return res.status(400).send('Ocurrio un problema')
    }

}