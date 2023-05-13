import NextCors from "nextjs-cors/dist";
import { db } from "../../../../prisma";

export default async function handler(req, res) {
  try {
    await NextCors(req, res, {
      // Options
      methods: ["POST", "GET"],
      origin: process.env.HOST,
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    if (req.method === "POST") {
      const {
        login,
        nombre,
        apellido,
        legajo,
        telefono,
        correo,
        direccion,
        localidad,
        idRol,
        idTutor,
        sexo,
        contrasenia,
        idCurso,
        idUsuario,
        esAlumno,
        esDocente,
        idMaterias,
      } = req.body;

      console.log({
        login,
        nombre,
        apellido,
        legajo,
        telefono,
        correo,
        direccion,
        localidad,
        idRol,
        idTutor,
        sexo,
        contrasenia,
        idCurso,
        idUsuario,
        esAlumno,
        esDocente,
        idMaterias,
      });
      const creado = await registrarUsuario(
        login,
        nombre,
        apellido,
        correo,
        legajo,
        telefono,
        localidad,
        direccion,
        idRol,
        idTutor,
        contrasenia,
        sexo,
        idCurso,
        idUsuario,
        esAlumno,
        esDocente,
        idMaterias
      );

      return res.status(200).json(creado);
    } else if (req.method === "GET") {
      const { correo, password } = req.query;
      const usuario = await traerUsuario(correo, password);
      console.log(usuario);
      if (!usuario) {
        return res.status(401).send("Credenciales incorrectas");
      }
      return res.status(200).json(usuario);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
}

export async function registrarUsuario(
  login,
  nombre,
  apellido,
  correo,
  legajo,
  telefono,
  localidad,
  direccion,
  idRol,
  idTutor = 0,
  contrasenia,
  sexo,
  idCurso = 0,
  idUsuario,
  esAlumno = false,
  esDocente = false,
  idMaterias
) {
  try {
    if (esAlumno) {
      const estadoalumno = await db.estadoalumno.findFirst({
        where: {
          estado: "Regular",
        },
      });
      let alumno = await db.usuario.create({
        data: {
          login: login,
          nombre: nombre,
          apellido: apellido,
          legajo: legajo,
          correo: correo,
          localidad: localidad,
          telefono: telefono,
          direccion: direccion,
          idrol: Number(idRol),
          sexo: sexo,
          activo: true,
          password: contrasenia,
          alumnoxcursoxdivision: {
            create: {
              tutor: {
                connect: {
                  id: Number(idTutor),
                },
              },
              cursoxdivision: {
                connect: {
                  id: Number(idCurso),
                },
              },
              estadoalumno: {
                connect: {
                  id: Number(estadoalumno?.id),
                },
              },
              fechamatriculacion: new Date()
                .toLocaleDateString("es-AR")
                .split("T")[0],
              asistencia: {
                create: {
                  presente: false,
                  ausente: false,
                  ausentejustificado: false,
                  llegadatarde: false,
                  mediafalta: false,
                  creadoen: new Date()
                    .toLocaleDateString("es-AR")
                    .split("T")[0],
                  usuario: {
                    connect: {
                      id: Number(idUsuario),
                    },
                  },
                },
              },
            },
          },
        },
      });
      return alumno;
    } else if (esDocente) {
      let docente = await db.usuario.create({
        data: {
          login: login,
          nombre: nombre,
          apellido: apellido,
          legajo: legajo,
          correo: correo,
          localidad: localidad,
          telefono: telefono,
          direccion: direccion,
          idrol: Number(idRol),
          sexo: sexo,
          activo: true,
          password: contrasenia,
        },
      });
      idMaterias?.map(async (idMateria) => {
        const docentexmateria = await db.docentexmateria.create({
          data: {
            materia: {
              connect: {
                id: idMateria,
              },
            },
            usuario: {
              connect: {
                id: docente.id,
              },
            },
            asistenciadocente: {
              create: {
                presente: false,
                ausente: false,
                ausentejustificado: false,
                llegadatarde: false,
                mediafalta: false,
                creadoen: new Date().toLocaleDateString("es-AR").split("T")[0],
                usuario: {
                  connect: {
                    id: Number(idUsuario),
                  },
                },
              },
            },
          },
        });
        console.log(docentexmateria);
      });
      return docente;
    } else {
      let usuario = await db.usuario.create({
        data: {
          login: login,
          nombre: nombre,
          apellido: apellido,
          legajo: legajo,
          correo: correo,
          localidad: localidad,
          telefono: telefono,
          direccion: direccion,
          idrol: Number(idRol),
          sexo: sexo,
          activo: true,
          password: contrasenia,
        },
      });
      return usuario;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function traerUsuario(correo, password) {
  try {
    const usuario = await db.usuario.findFirst({
      include: {
        rol: true,
        alumnoxcursoxdivision1: {
          include: {
            cursoxdivision: {
              include: {
                curso: true,
                division: true,
              },
            },
          },
        },
        alumnoxcursoxdivision2: {
          include: {
            cursoxdivision: {
              include: {
                curso: true,
                division: true,
              },
            },
          },
        },
        preceptorxcurso: {
          include: {
            curso: true,
          },
        },
        docentexmateria: {
          include: {
            materiaxcursoxdivision: {
              include: {
                materia: true,
                cursoxdivision: {
                  include: {
                    curso: true,
                    division: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        AND: [{ correo: correo }, { password: password }],
      },
    });
    return usuario;
  } catch (error) {
    console.log(error);
  }
}
