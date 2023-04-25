import { Prisma } from "./prisma";

export async function traerDocente(idusuario) {
    try {
        const docente = await Prisma.newPrisma.docentexmateria.findFirst({
            include: {
                materia: true,
                usuario: true
            },
            where: {
                usuario: {
                    id: Number(idusuario)
                }
            }
        })
        return docente
    } catch (error) {
        console.log(error);
    }
}

export async function traerDocentes(idusuario) {
    try {
        const docente = await Prisma.newPrisma.docentexmateria.findMany({
            include: {
                materia: true,
                usuario: true
            },
            where: {
                usuario: {
                    id: {
                        not: Number(idusuario)
                    }
                }
            }
        })
        return docente
    } catch (error) {
        console.log(error);
    }
}