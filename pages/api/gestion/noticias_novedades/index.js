import { agregarNoticia, traerNoticia } from "../../../../servicios/noticias_novedades";

export default async function handler(
    req,
    res
) {
    try {
        switch (req.method) {
            case 'POST':
                const { titulo, creadaEn, url, descripcion, idUsuario } = req.body
                const crear = await agregarNoticia(titulo, creadaEn, url, descripcion, Number.parseInt(idUsuario))
                return res.status(200).json(crear)
            case 'GET':
                const noticias = await traerNoticia()
                return res.status(200).json(noticias)
            default:
                return res.status(400).send('Metodo no permitido')
        }

    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}