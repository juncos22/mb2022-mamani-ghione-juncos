import { editarNoticia, eliminarNoticia, traerNoticia } from "../../../../servicios/noticias_novedades"

export default async function handler(
    req,
    res
) {
    try {
        const { id } = req.query
        switch (req.method) {
            case 'GET':
                const noticiaDetalle = await traerNoticia(Number.parseInt(id))
                return res.json(noticiaDetalle)
            case 'PUT':
                const { titulo, url, descripcion, actualizadaEn } = req.body
                const noticiaActualizada = await editarNoticia(Number.parseInt(id), titulo, url, descripcion, actualizadaEn)
                return res.status(200).json(noticiaActualizada)
            case 'DELETE':
                const noticia = await eliminarNoticia(Number.parseInt(id))
                return res.status(200).json(noticia)
            default:
                return res.status(400).json({ mensaje: 'Metodo no permitido' })
        }

    } catch (error) {
        return res.status(400).json(error)
    }
}