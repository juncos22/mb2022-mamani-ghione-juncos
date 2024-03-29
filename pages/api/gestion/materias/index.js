import NextCors from "nextjs-cors/dist";
import { db } from "../../../../prisma";

export default async function handler(req, res) {
  try {
    await NextCors(req, res, {
      // Options
      methods: ["GET"],
      origin: process.env.HOST,
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    const { idCurso } = req.query;
    const materias = await ListarMaterias(idCurso);
    return res.status(200).json(materias);
  } catch (error) {
    return res.status(200).json({ mensaje: error.message });
  }
}

export async function ListarMaterias(idCurso) {
  try {
    const materias = idCurso
      ? await db.materiaxcursoxdivision.findMany({
        include: {
          materia: true,
          cursoxdivision: {
            include: {
              curso: true,
              division: true,
            },
          },
        },
        where: {
          cursoxdivision: {
            idcurso: Number(idCurso),
          },
        },
        orderBy: [
          {
            idmateria: "asc",
          },
          {
            cursoxdivision: {
              iddivision: "asc",
            },
          },
        ],
      })
      : await db.materiaxcursoxdivision.findMany({
        include: {
          materia: true,
          cursoxdivision: {
            include: {
              curso: true,
              division: true,
            },
          },
        },
        orderBy: [
          {
            idmateria: "asc",
          },
          {
            cursoxdivision: {
              division: {
                id: "asc"
              }
            },
          },
          {
            cursoxdivision: {
              curso: {
                id: "asc"
              }
            },
          },
        ],
      });
    return materias;
  } catch (error) {
    console.error(error);
  }
}
