import { traerAlumno } from "../../servicios/alumnos"

export default async function handler(req, res) {
    try {
        const { legajo } = req.query
        const alumno = await traerAlumno(legajo)
        return res.status(200).json(alumno)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: error.message })
    }
}