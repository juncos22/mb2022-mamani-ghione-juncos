import NextCors from "nextjs-cors/dist";
import { db } from "../../../../prisma";

export default async function handler(
    req,
    res
) {
    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        origin: process.env.HOST,
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    try {
        const { params } = req.query
        const menuXrol = await FiltrarMenu(params[0], params[1])
        return res.status(200).json(menuXrol)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}


export async function FiltrarMenu(idRol, prefijoUrl) {
    const filtro = await db.menuxrol.findMany({
        include: {
            menu: true,
            rol: true
        },
        where: {
            AND: [
                { idrol: Number(idRol) },
                {
                    menu: {
                        url: {
                            startsWith: `/${prefijoUrl}`
                        }
                    }
                }
            ]
        }
    })
    return filtro
}