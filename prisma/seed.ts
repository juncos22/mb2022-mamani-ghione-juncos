import { PrismaClient } from '@prisma/client';
import { asistencias, fechas } from './seeds/asistencias';
import { division } from './seeds/division';
import { cursos } from './seeds/cursos';
import { cursosxdivision } from './seeds/cursosxdivision';
import { ficha } from "./seeds/ficha";
// import { menus } from './seeds/menus';
import { notas } from './seeds/notas';
import { noticias } from './seeds/noticias';
import { tiposSancion } from './seeds/tiposSancion';
import { trimestres } from './seeds/trimestres';
import { enfermedades } from "./seeds/enfermedad";
import { usuarios } from "./seeds/usuarios";
// import { alumnos, fechas } from "./seeds/alumnos";
import { materias } from './seeds/materias';
import { menuXRoles } from './seeds/menuXRol';
import { portadaFicha } from './seeds/portadaFicha';
import { discapacidad } from './seeds/discapacidad';
import { roles } from './seeds/roles';
import { menus } from './seeds/menus';
import { docentes } from './seeds/docentes';
import { estadosAlumno } from './seeds/estadosAlumno';
import { tutores } from './seeds/tutores';
// import { roles } from './seeds/roles';

const prisma = new PrismaClient();

//  getAsistencias = async () => {
//      asistencias = alumnos.map(a => (
//         fechas.map(fecha => (
//             {
//                 idAlumnoXcursoXdivision: a.id,
//                 creadoEn: fecha,
//                 presente: false,
//                 llegadaTarde: false,
//                 ausente: false,
//                 ausenteJustificado: false,
//                 llegadaTardeJustificada: false,
//                 mediaFalta: false,
//                 mediaFaltaJustificada: false,
//                 idUsuario: '6345ee8566a769b309bd9367'
//             }
//         ))
//     ))
//     return asistencias.flat(1)
// }

async function main() {


    //  materias = await prisma.materia.findMany()
    // docentes.map(async (d) => {
    //     materias.map(async (m) => {
    //          docente = await prisma.usuario.create({
    //             data: {
    //                 login: d.login,
    //                 password: d.password,
    //                 nombre: d.nombre,
    //                 apellido: d.apellido,
    //                 fechanacimiento: d.fechanacimiento,
    //                 idrol: d.idrol,
    //                 direccion: d.direccion,
    //                 localidad: d.localidad,
    //                 legajo: d.legajo,
    //                 telefono: d.telefono,
    //                 sexo: d.sexo,
    //                 correo: d.correo,
    //                 docentexmateria: {
    //                     create: {
    //                         materia: {
    //                             connect: {
    //                                 id: m.id
    //                             }
    //                         },
    //                         asistenciadocente: {
    //                             create: {
    //                                 presente: false,
    //                                 ausente: false,
    //                                 ausentejustificado: false,
    //                                 llegadatarde: false,
    //                                 llegadatardejustificada: false,
    //                                 mediafalta: false,
    //                                 mediafaltajustificada: false,
    //                                 creadoen: '06/12/2022',
    //                                 motivo: '',
    //                                 idusuario: 1
    //                             }
    //                         }
    //                     }
    //                 }

    //             }
    //         })
    //         console.log(docente);
    //     })
    // })
    //  docentes = await prisma.docentexmateria.findMany()
    // docentes.map(async (d) => {
    //      asistencia = await prisma.asistenciadocente.create({
    //         data: {
    //             presente: false,
    //             ausente: false,
    //             ausentejustificado: false,
    //             llegadatarde: false,
    //             llegadatardejustificada: false,
    //             mediafalta: false,
    //             mediafaltajustificada: false,
    //             creadoen: '06/12/2022',
    //             motivo: '',
    //             docentexmateria: {
    //                 connect: {
    //                     id: d.id
    //                 }
    //             },
    //             usuario: {
    //                 connect: {
    //                     id: 1
    //                 }
    //             }
    //         }
    //     })
    //     console.log(asistencia);
    // })
    //  alumnos = await prisma.usuario.findMany({
    //     where: {
    //         idrol: 4
    //     },
    //     orderBy: {
    //         id: "asc"
    //     }
    // })


    //  estudiantes = await prisma.usuario.findMany({
    //     orderBy: {
    //         id: "asc"
    //     },
    //     where: {
    //         idrol: 7
    //     }


    // })

    //  i = 57

    // while (i < 62) {

    //     alumnos = await prisma.alumnoxcursoxdivision.create({
    //         data: {
    //             idusuario: i,
    //             idcursoxdivision: 1,
    //             fechamatriculacion: "20/03/2022",
    //             idestadoalumno: 1

    //         }

    //     })
    //     console.log("usuario id:", i)

    //     i = i + 1

    // }
    //  tutores = await prisma.usuario.findMany({
    //     orderBy: {
    //         id: "asc"
    //     },
    //     where: {
    //         idrol: 6
    //     }
    // })

    //  i = 2
    //  idTutor = 62
    // while (i < 62) {

    //      tutor = await prisma.alumnoxcursoxdivision.updateMany({
    //         where: {
    //             idusuario: i
    //         },
    //         data: {
    //             idtutor: idTutor

    //         }


    //     })
    //     console.log("tutor id:", idTutor)

    //     i = i + 1
    //     idTutor = idTutor + 1

    // }

    // estadosAlumno.map(async (e) => {

    //      estado = await prisma.estadoalumno.create({
    //         data: {
    //             id: e.id,
    //             estado: e.estado
    //         }
    //     })
    //     console.log(estado);

    // })


    //  alumnos = await prisma.alumnoxcursoxdivision.findMany({
    //     include: {
    //         cursoxdivision: true
    //     },
    //     // where: {
    //     //     id: 55

    //     // }
    // })



    // fechas && fechas.map((fecha) => {
    //     alumnos && alumnos.map(async (a) => {
    //          asistencia = await prisma.asistencia.create({
    //             data: {
    //                 idalumnoxcursoxdivision: a.id,
    //                 presente: false,
    //                 ausente: false,
    //                 ausentejustificado: false,
    //                 llegadatarde: false,
    //                 llegadatardejustificada: false,
    //                 mediafalta: false,
    //                 mediafaltajustificada: false,
    //                 motivo: "",
    //                 creadoen: fecha,
    //                 idusuario: 1,
    //                 actualizadoen: ""
    //             }

    //         })
    //         console.log(asistencia)
    //     })
    // })



    //  nota = await prisma.nota.findMany({
    //     where: {
    //         idMateria: 70
    //     }

    // })



    // const trimestres = await prisma.trimestre.findMany({
    // })


    // let materias1 = [], materias2 = [], materias3 = [], materias4 = [], materias5 = [], materias6 = []
    // let random, random2, random3, random4, random5, nota;

    // const min = 6
    // const max = 10
    // //  random = Math.floor(Math.random() * (max - min + 1)) + min;


    // const alumnos = await prisma.alumnoxcursoxdivision.findMany({
    //     include: {
    //         cursoxdivision: true
    //     }

    // })

    // alumnos && alumnos.map(async (a) => {

    //     // console.log(alumnos)
    //     switch (a.cursoxdivision?.idcurso) {
    //         case 1:
    //             materias1 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 1
    //                 }

    //             })
    //             materias1 && materias1.map(m => {

    //                 trimestres && trimestres.map(async (t) => {
    //                     random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     // console.log("entro a trimestres.map")
    //                     nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2022,
    //                             idusuario: 1


    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             break;
    //         case 2:

    //             materias1 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 1
    //                 }

    //             })
    //             materias1 && materias1.map(m => {

    //                 trimestres && trimestres.map(async (t) => {
    //                     random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     // console.log("entro a trimestres.map")
    //                     nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2021,
    //                             idusuario: 1


    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             materias2 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 2
    //                 }

    //             })
    //             // console.log(materias)

    //             materias2 && materias2.map(m => {

    //                 trimestres && trimestres.map(async (t) => {
    //                     random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2022,
    //                             idusuario: 1

    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             break;
    //         case 3:

    //             materias1 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 1
    //                 }

    //             })
    //             materias1 && materias1.map(m => {

    //                 trimestres && trimestres.map(async (t) => {
    //                     random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     // console.log("entro a trimestres.map")
    //                     nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2020,
    //                             idusuario: 1


    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             materias2 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 2
    //                 }

    //             })
    //             // console.log(materias)

    //             materias2 && materias2.map(m => {

    //                 trimestres && trimestres.map(async (t) => {
    //                     random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2021,
    //                             idusuario: 1

    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             materias3 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 3
    //                 }

    //             })
    //             // console.log(materias)

    //             materias3 && materias3.map(m => {
    //                 trimestres && trimestres.map(async (t) => {
    //                     random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2022,
    //                             idusuario: 1


    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             break;
    //         case 4:
    //             materias1 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 1
    //                 }

    //             })
    //             materias1 && materias1.map(m => {

    //                 trimestres && trimestres.map(async (t) => {
    //                     random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     // console.log("entro a trimestres.map")
    //                     nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2019,
    //                             idusuario: 1


    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             materias2 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 2
    //                 }

    //             })
    //             // console.log(materias)

    //             materias2 && materias2.map(m => {

    //                 trimestres && trimestres.map(async (t) => {
    //                     random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2020,
    //                             idusuario: 1

    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             materias3 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 3
    //                 }

    //             })
    //             // console.log(materias)

    //             materias3 && materias3.map(m => {
    //                 trimestres && trimestres.map(async (t) => {
    //                     random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2021,
    //                             idusuario: 1


    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             materias4 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 4
    //                 }

    //             })
    //             // console.log(materias)

    //             materias4 && materias4.map(m => {
    //                 trimestres && trimestres.map(async (t) => {
    //                     random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2022,
    //                             idusuario: 1


    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             break;
    //         case 5:
    //             materias1 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 1
    //                 }

    //             })
    //             materias1 && materias1.map(m => {

    //                 trimestres && trimestres.map(async (t) => {
    //                     random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     // console.log("entro a trimestres.map")
    //                     nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2018,
    //                             idusuario: 1


    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             materias2 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 2
    //                 }

    //             })
    //             // console.log(materias)

    //             materias2 && materias2.map(m => {

    //                 trimestres && trimestres.map(async (t) => {
    //                     random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2019,
    //                             idusuario: 1

    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             materias3 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 3
    //                 }

    //             })
    //             // console.log(materias)

    //             materias3 && materias3.map(m => {
    //                 trimestres && trimestres.map(async (t) => {
    //                     random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2020,
    //                             idusuario: 1


    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             materias4 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 4
    //                 }

    //             })
    //             // console.log(materias)

    //             materias4 && materias4.map(m => {
    //                 trimestres && trimestres.map(async (t) => {
    //                     random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2021,
    //                             idusuario: 1


    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             materias5 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 5
    //                 }

    //             })
    //             // console.log(materias)

    //             materias5 && materias5.map(m => {
    //                 trimestres && trimestres.map(async (t) => {
    //                     random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2022,
    //                             idusuario: 1


    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             break;

    //         case 6:
    //             materias1 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 1
    //                 }

    //             })
    //             materias1 && materias1.map(m => {

    //                 trimestres && trimestres.map(async (t) => {
    //                     random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     // console.log("entro a trimestres.map")
    //                     nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2017,
    //                             idusuario: 1


    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             materias2 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 2
    //                 }

    //             })
    //             // console.log(materias)

    //             materias2 && materias2.map(m => {

    //                 trimestres && trimestres.map(async (t) => {
    //                     random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2018,
    //                             idusuario: 1

    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             materias3 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 3
    //                 }

    //             })
    //             // console.log(materias)

    //             materias3 && materias3.map(m => {
    //                 trimestres && trimestres.map(async (t) => {
    //                     random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2019,
    //                             idusuario: 1


    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             materias4 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 4
    //                 }

    //             })
    //             // console.log(materias)

    //             materias4 && materias4.map(m => {
    //                 trimestres && trimestres.map(async (t) => {
    //                     random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2020,
    //                             idusuario: 1


    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             break;

    //             materias5 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 5
    //                 }

    //             })
    //             // console.log(materias)

    //             materias5 && materias5.map(m => {
    //                 trimestres && trimestres.map(async (t) => {
    //                     random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2021,
    //                             idusuario: 1


    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             materias6 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 6
    //                 }

    //             })
    //             console.log(materias)

    //             materias6 && materias.map(m => {
    //                 trimestres && trimestres.map(async t => {
    //                     random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2022,
    //                             idusuario: 1

    //                         },
    //                     })
    //                     console.log(nota);


    //                 })

    //             })
    //             break;

    //         default:
    //             break;
    //     }

    // })


    //  i = 1

    // alumnos && alumnos.map(async (a) => {

    //     // console.log(alumnos)
    //     switch (a.cursoxdivision?.idcurso) {
    //         case 1:
    //              materias1 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 1
    //                 }

    //             })
    //             materias1 && materias1.map(m => {

    //                 trimestres && trimestres.map(async (t) => {
    //                      random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                     // console.log("entro a trimestres.map")
    //                      nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2022,
    //                             idusuario: 1


    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             break;
    //         case 2:
    //              materias2 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 2
    //                 }

    //             })
    //             // console.log(materias)

    //             materias2 && materias2.map(m => {

    //                 trimestres && trimestres.map(async (t) => {
    //                      random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2022,
    //                             idusuario: 1

    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             break;
    //         case 3:
    //              materias3 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 3
    //                 }

    //             })
    //             // console.log(materias)

    //             materias3 && materias3.map(m => {
    //                 trimestres && trimestres.map(async (t) => {
    //                      random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2022,
    //                             idusuario: 1


    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             break;
    //         case 4:
    //              materias4 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 4
    //                 }

    //             })
    //             // console.log(materias)

    //             materias4 && materias4.map(m => {
    //                 trimestres && trimestres.map(async (t) => {
    //                      random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2022,
    //                             idusuario: 1


    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             break;
    //         case 5:
    //              materias5 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 5
    //                 }

    //             })
    //             // console.log(materias)

    //             materias5 && materias5.map(m => {
    //                 trimestres && trimestres.map(async (t) => {
    //                      random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2022,
    //                             idusuario: 1


    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             break;

    //         case 6:
    //              materias6 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 6
    //                 }

    //             })
    //             console.log(materias)

    //             materias6 && materias.map(m => {
    //                 trimestres && trimestres.map(async t => {
    //                      random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                      nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: random,
    //                             nota2: random2,
    //                             nota3: random3,
    //                             nota4: random4,
    //                             nota5: random5,
    //                             anoactual: 2022,
    //                             idusuario: 1

    //                         },
    //                     })
    //                     console.log(nota);


    //                 })

    //             })
    //             break;

    //         default:
    //             break;
    //     }

    // })



    //  trimestres = await prisma.trimestre.findMany({
    // })



    //  min = 6
    //  max = 10
    // //  random = Math.floor(Math.random() * (max - min + 1)) + min;


    //  alumnos = await prisma.alumnoxcursoxdivision.findMany({
    //     include: {
    //         cursoxdivision: true


    //     },
    //     // orderBy: {
    //     //     cursoxdivision: {
    //     //         idcurso: "asc"
    //     //     }
    //     // },
    //     where: {
    //         cursoxdivision: {
    //             idcurso: 6
    //         }
    //     }
    // })

    // alumnos && alumnos.map(async (a) => {
    //     // console.log(alumnos)
    //     if (a.cursoxdivision?.idcurso === 6) {

    //         // console.log("entro al switch 1")
    //          materias1 = await prisma.materia.findMany({
    //             where: {
    //                 idcurso: 1
    //             }

    //         })
    //         // console.log(materias1)

    //         materias1 && materias1.map(m => {
    //             // console.log("entro a materias.map1")
    //             trimestres && trimestres.map(async (t) => {
    //                 // console.log("entro a trimestres.map")
    //                  random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                  random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                  random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                  random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                  random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                  nota = await prisma.historialnota.create({
    //                     data: {
    //                         idalumnoxcursoxdivision: a.id,
    //                         idmateria: m.id,
    //                         idtrimestre: t.id,
    //                         nota1: random,
    //                         nota2: random2,
    //                         nota3: random3,
    //                         nota4: random4,
    //                         nota5: random5,
    //                         ano: 2017

    //                     },
    //                 })
    //                 console.log(nota);

    //             })

    //         })
    //          materias2 = await prisma.materia.findMany({
    //             where: {
    //                 idcurso: 2
    //             }

    //         })
    //         // console.log(materias1)

    //         materias2 && materias2.map(m => {
    //             // console.log("entro a materias.map1")
    //             trimestres && trimestres.map(async (t) => {
    //                 // console.log("entro a trimestres.map")
    //                  random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                  random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                  random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                  random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                  random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                  nota = await prisma.historialnota.create({
    //                     data: {
    //                         idalumnoxcursoxdivision: a.id,
    //                         idmateria: m.id,
    //                         idtrimestre: t.id,
    //                         nota1: random,
    //                         nota2: random2,
    //                         nota3: random3,
    //                         nota4: random4,
    //                         nota5: random5,
    //                         ano: 2018

    //                     },
    //                 })
    //                 console.log(nota);

    //             })

    //         })


    //          materias3 = await prisma.materia.findMany({
    //             where: {
    //                 idcurso: 3
    //             }

    //         }) 
    //         materias3 && materias3.map(m => {
    //             // console.log("entro a materias.map1")
    //             trimestres && trimestres.map(async (t) => {
    //                 // console.log("entro a trimestres.map")
    //                  random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                  random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                  random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                  random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                  random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                  nota = await prisma.historialnota.create({
    //                     data: {
    //                         idalumnoxcursoxdivision: a.id,
    //                         idmateria: m.id,
    //                         idtrimestre: t.id,
    //                         nota1: random,
    //                         nota2: random2,
    //                         nota3: random3,
    //                         nota4: random4,
    //                         nota5: random5,
    //                         ano: 2019

    //                     },
    //                 })
    //                 console.log(nota);

    //             })

    //         })
    //          materias4 = await prisma.materia.findMany({
    //             where: {
    //                 idcurso: 4
    //             }

    //         }) 
    //         materias4 && materias4.map(m => {
    //             // console.log("entro a materias.map1")
    //             trimestres && trimestres.map(async (t) => {
    //                 // console.log("entro a trimestres.map")
    //                  random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                  random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                  random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                  random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                  random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                  nota = await prisma.historialnota.create({
    //                     data: {
    //                         idalumnoxcursoxdivision: a.id,
    //                         idmateria: m.id,
    //                         idtrimestre: t.id,
    //                         nota1: random,
    //                         nota2: random2,
    //                         nota3: random3,
    //                         nota4: random4,
    //                         nota5: random5,
    //                         ano: 2020

    //                     },
    //                 })
    //                 console.log(nota);

    //             })

    //         })
    //          materias5 = await prisma.materia.findMany({
    //             where: {
    //                 idcurso: 5
    //             }

    //         }) 
    //         materias5 && materias5.map(m => {
    //             // console.log("entro a materias.map1")
    //             trimestres && trimestres.map(async (t) => {
    //                 // console.log("entro a trimestres.map")
    //                  random = Math.floor(Math.random() * (max - min + 1)) + min;
    //                  random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                  random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                  random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                  random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //                  nota = await prisma.historialnota.create({
    //                     data: {
    //                         idalumnoxcursoxdivision: a.id,
    //                         idmateria: m.id,
    //                         idtrimestre: t.id,
    //                         nota1: random,
    //                         nota2: random2,
    //                         nota3: random3,
    //                         nota4: random4,
    //                         nota5: random5,
    //                         ano: 2021

    //                     },
    //                 })
    //                 console.log(nota);

    //             })

    //         })
    //     }
    // })


    // console.log(alumnos)

    // for ( i = 1; i < 7; i++) {
    //      alumnos = await prisma.alumnoXcursoXdivision.findMany({
    //         include: {
    //             cursoXdivision: true
    //         },
    //         where: {
    //             cursoXdivision: {
    //                 idCurso: i
    //             }
    //         }

    //     })
    //     // console.log(alumnos)
    //      materias = await prisma.materia.findMany({
    //         where: {
    //             idCurso: i
    //         }

    //     })
    //     // console.log(materias)
    //      trimestres = await prisma.trimestre.findMany({
    //     })

    //     // console.log(i)
    //     materias && materias.map(m => {
    //         // console.log("entro a materias.map")
    //         trimestres && trimestres.map(t => {
    //             // console.log("entro a trimestres.map")
    //             alumnos && alumnos.map(async (a) => {
    //                 // console.log("entro a alumnos.map")
    //                  nota = await prisma.nota.create({
    //                     data: {
    //                         idAlumnoXcursoXdivision: a.id,
    //                         idMateria: m.id,
    //                         idTrimestre: t.id,
    //                         nota1: 0,
    //                         nota2: 0,
    //                         nota3: 0,
    //                         nota4: 0,
    //                         nota5: 0,
    //                         fecha: new Date().toLocaleDateString('es-AR').split('T')[0],
    //                         idUsuario: 1
    //                     },
    //                 })
    //                 console.log(nota);
    //             })

    //         })

    //     })
    // }

    // // LAS ASISTENCIAS NO DEBERIAN SER POR MATERIA? (ASISTENCIA_X_MATERIA)
    // usuarios.map(async (u) => {
    //      asistencia = await prisma.asistencia.create({
    //         data: {
    //             presente: false,
    //             ausente: false,
    //             ausenteJustificado: false,
    //             llegadaTarde: false,
    //             llegadaTardeJustificada: false,
    //             mediaFalta: false,
    //             mediaFaltaJustificada: false,
    //             creadoEn: new Date().toISOString().split('T')[0],
    //             motivo: '',
    //             usuario: {
    //                 connect: {
    //                     id: 57
    //                 }
    //             },
    //             alumnoXcursoXdivision: {
    //                 create: {
    //                     anoActual: 2022,
    //                     idCursoXdivision: 1,
    //                     idEstadoAlumno: 1,
    //                     idUsuario: u.id,
    //                 }
    //             }
    //         }
    //     })
    //     console.log(asistencia);
    // })

    // LAS ASISTENCIAS NO DEBERIAN SER POR MATERIA? (ASISTENCIA_X_MATERIA)
    // usuarios.map(async (u) => {
    //      asistencia = await prisma.asistencia.create({
    //         data: {
    //             presente: false,
    //             ausente: false,
    //             ausenteJustificado: false,
    //             llegadaTarde: false,
    //             llegadaTardeJustificada: false,
    //             mediaFalta: false,
    //             mediaFaltaJustificada: false,
    //             creadoEn: new Date().toISOString().split('T')[0],
    //             motivo: '',
    //             usuario: {
    //                 connect: {
    //                     id: 57
    //                 }
    //             },
    //             alumnoXcursoXdivision: {
    //                 create: {
    //                     anoActual: 2022,
    //                     idCursoXdivision: 1,
    //                     idEstadoAlumno: 1,
    //                     idUsuario: u.id,
    //                 }
    //             }
    //         }
    //     })
    //     console.log(asistencia);
    // })


    //  menus = await prisma.menu.findMany()
    //  roles = await prisma.rol.findMany()
    // console.log(menus, roles);



    // cursosxdivision.map(async (c) => {

    //      materi = await prisma.cursoxdivision.create({
    //         data: {

    //             idcurso: c.idCurso,
    //             iddivision: c.idDivision
    //         }
    //     })
    //     console.log(materi);
    // })

    //  min = 6
    //  max = 10
    // //  random = Math.floor(Math.random() * (max - min + 1)) + min;



    //  trimestres = await prisma.trimestre.findMany({
    // })

    //  alumnos = await prisma.alumnoxcursoxdivision.findMany({

    //     where: {
    //         idcursoxdivision: 12
    //     }
    // })

    // console.log(alumnos)

    // alumnos && alumnos.map(async (a) => {

    //      materias1 = await prisma.materia.findMany({
    //         where: {
    //             idcurso: 6
    //         }

    //     })

    //     materias1 && materias1.map(m => {
    //         trimestres && trimestres.map(async (t) => {
    //              random = Math.floor(Math.random() * (max - min + 1)) + min;
    //              random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    //              random3 = Math.floor(Math.random() * (max - min + 1)) + min;
    //              random4 = Math.floor(Math.random() * (max - min + 1)) + min;
    //              random5 = Math.floor(Math.random() * (max - min + 1)) + min;
    //             // console.log("entro a trimestres.map")
    //              nota = await prisma.nota.create({
    //                 data: {
    //                     idalumnoxcursoxdivision: a.id,
    //                     idmateria: m.id,
    //                     idtrimestre: t.id,
    //                     nota1: random,
    //                     nota2: random2,
    //                     nota3: random3,
    //                     nota4: random4,
    //                     nota5: random5,
    //                     anoactual: 2021,
    //                     idusuario: 1
    //                 },
    //             })
    //             console.log(nota);

    //         })

    //     })


    // })


}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });


 // materias && materias.map(m => {
    //     trimestres && trimestres.map(t => {
    //         alumnos && alumnos.map(async (a) => {
    //              nota = await prisma.nota.create({
    //                 data: {
    //                     idAlumnoXcursoXdivision: a.id,
    //                     idMateria: m.id,
    //                     idTrimestre: t.id,
    //                     nota1: 0,
    //                     nota2: 0,
    //                     nota3: 0,
    //                     nota4: 0,
    //                     nota5: 0
    //                 }
    //             })
    //             console.log(nota);
    //         })
    //     })
    // })
    //  asistencias = await getAsistencias()
    //  creation = await prisma.asistencia.createMany({
    //     data: asistencias
    // })
    // console.log(creation);



    // usuarios.map(async (u) => {
    //      usuario = await prisma.usuario.create({
    //         data: {
    //             id: u.id,
    //             nombre: u.nombre,
    //             apellido: u.apellido,
    //             correo: u.correo,
    //             idrol: u.idRol,
    //             legajo: u.legajo,
    //             login: u.login,
    //             localidad: u.localidad,
    //             password: u.password,
    //             sexo: u.sexo,
    //             telefono: u.telefono,
    //             direccion: u.direccion
    //         }
    //     })
    //     console.log(usuario);
    // })

    //  tutores.map(async (t) => {
    //          usuario = await prisma.usuario.create({
    //             data: {
    //                 id: t.id,
    //                 nombre: t.nombre,
    //                 apellido: t.apellido,
    //                 correo: t.correo,
    //                 idrol: t.idRol,
    //                 legajo: t.legajo,
    //                 login: t.login,
    //                 localidad: t.localidad,
    //                 password: t.password,
    //                 sexo: t.sexo,
    //                 telefono: t.telefono,
    //                 direccion: t.direccion
    //             }
    //         })
    //         console.log(usuario);
    //     })
    //  tutores = await prisma.usuario.findMany({
    //     select: {
    //         apellido: true,
    //         id: true
    //     },
    //     where: {
    //         idrol: 6
    //     }
    // })
    // console.log(tutores)


    // roles.map(async (r) => {

    //      roles = await prisma.rol.create({
    //         data: {
    //             id: r.id,
    //             tipo: r.tipo
    //         }
    //     })
    //     console.log(roles);

    // })

    // cursos.map(async (c) => {

    //      roles = await prisma.curso.create({
    //         data: {
    //             id: c.id,
    //             nombre: c.nombre
    //         }
    //     })
    //     console.log(roles);

    // })
    // division.map(async (d) => {

    //      roles = await prisma.division.create({
    //         data: {
    //             id: d.id,
    //             division: d.division
    //         }
    //     })
    //     console.log(roles);

    // })

    // materias.map(async (m) => {

    //      materi = await prisma.materia.create({
    //         data: {
    //             id: m.id,
    //             nombre: m.nombre,
    //             idcorrelativa: m.idCorrelativa,
    //             idcurso: m.idCurso
    //         }
    //     })
    //     console.log(materi);
    // })

    // tutores.map(async (t) => {
    //      tutor = await prisma.alumnoxcursoxdivision.updateMany({
    //         // include: {
    //         //     usuario: {
    //         //         select: {
    //         //             apellido: true
    //         //         }
    //         //     }
    //         // },
    //         where: {
    //             usuario: {
    //                 apellido: t.apellido
    //             }

    //         },
    //         data: {
    //             idtutor: t.id
    //         }
    //     })
    //     console.log(tutor);
    // })

    // menus.map(async (m) => {
    //      enfer = await prisma.menu.create({
    //         data: {
    //             menusistema: m.menuSistema,
    //             url: m.url
    //         }
    //     })
    //     console.log(enfer);
    // })


    // menuXRoles.map(async (m) => {
    //      enfer = await prisma.menuxrol.create({
    //         data: {
    //            idmenu: m.idMenu,
    //            idrol: m.idRol
    //         }
    //     })
    //     console.log(enfer);
    // })

    // enfermedades.map(async (m) => {
    //      enfer = await prisma.enfermedad.create({
    //         data: {
    //             descripcion: m.nombre
    //         }
    //     })
    //     console.log(enfer);
    // })

    // discapacidad.map(async (m) => {
    //      disc = await prisma.discapacidad.create({
    //         data: {
    //             nombre: m.nombre
    //         }
    //     })
    //     console.log(disc);
    // })

    // noticias.map(async (n) => {
    //      noticia = await prisma.noticiasynovedades.create({
    //         data: {
    //             titulo: n.titulo,
    //             creadaen: n.creadaEn,
    //             actualizadaen: n.actualizadaEn,
    //             descripcion: n.descripcion,
    //             idusuario: n.idUsuario,
    //             url: n.url
    //         }
    //     })
    //     console.log(noticia);
    // })



    //  fichaInstitucional = await prisma.fichainstitucional.create({
    //     data: {
    //         nombreinstitucion: ficha.nombreInstitucion,
    //         ubicacion: ficha.ubicacion,
    //         telefono1: ficha.telefono1,
    //         telefono2: ficha.telefono2 ,
    //         tipoinstitucion: ficha.tipoInstitucion ,
    //         descripcion: ficha.descripcion ,
    //         oficina1: ficha.oficina1,
    //         oficina2: ficha.oficina2 ,
    //         mail: ficha.mail,
    //         idusuario: ficha.idUsuario
    //     }
    // })
    // console.log(fichaInstitucional);

    // portadaFicha.map(async (p) => {
    //      portada = await prisma.portadaficha.createMany({
    //         data: {
    //             nombre: p.nombre,
    //             url: p.url,
    //             idfichainstitucional: 1
    //         }
    //     })
    //     console.log(portada);
    // })
