import NextCors from "nextjs-cors/dist";
import { FiltrarMenu } from "../../../../servicios/menu";

export default async function handler(
    req,
    res
) {
    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    try {
        const { idRol } = req.query
        const menuXrol = await FiltrarMenu(Number.parseInt(idRol))
        return res.status(200).json(menuXrol)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}
