import NextCors from "nextjs-cors";
import { db } from "../../../../../../prisma";

export default async function handler(req, res) {
  try {
    await NextCors(req, res, {
      // Options
      methods: ["PUT"],
      origin: process.env.HOST,
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    const { id } = req.query;
    const borrar = await BorrarNotificacion(Number(id));
    return res.status(200).send(borrar);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

export async function BorrarNotificacion(id) {
  try {
    await db.notificacionxtutor.deleteMany({
      where: {
        idnotificacion: Number(id),
      },
    });

    await db.notificacion.delete({
      where: {
        id: Number(id),
      },
    });
    return "Notificacion de tutor eliminada";
  } catch (error) {
    console.log(error);
    return error.message;
  }
}
