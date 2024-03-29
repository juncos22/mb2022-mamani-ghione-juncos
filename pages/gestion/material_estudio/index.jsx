import { useEffect, useState } from "react";
import { Alert, LinearProgress, Tab, Tabs } from "@mui/material";

import { Layout } from "../../../components/layout";
import {
  Box,
  Button,
  IconButton,
  FormControl,
  ListSubheader,
  TableContainer,
  TableRow,
  TableHead,
  Table,
  TableBody,
  TableCell,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Stack,
  TextField,
  Autocomplete,
} from "@mui/material";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import axios from "axios";
import { useAuth } from "../../../components/context/authUserProvider";
import { useRouter } from "next/router";
import { guardarImagen } from "../../api/servicios/portada";
import { FileOpenSharp, Search } from "@mui/icons-material";
import { TabPanel } from "../../../components/tabPanel";

const MaterialEstudio = () => {
  const [idCursoXdivision, setIdCursoXdivision] = useState(1);
  const [materias, setMaterias] = useState([]);
  const [cursos, setCursos] = useState();
  const { loading, authUser } = useAuth();
  const [idMateria, setIdMateria] = useState(1);
  const [subiendo, setSubiendo] = useState(false);
  const [trimestres, setTrimestres] = useState();
  const [alumno, setAlumno] = useState();
  const [mensaje, setMensaje] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [subir, setSubir] = useState(false);
  const [archivos, setArchivos] = useState(null);
  const [materiales, setMateriales] = useState([]);

  const handleCurso = async (e) => {
    const cursoxdivision = cursos?.find((c) => c.id === e.target.value);
    setIdCursoXdivision(Number(cursoxdivision?.id));
    await traerMaterias(Number(cursoxdivision?.curso?.id));
  };
  const handleMateria = (e) => {
    if (e.target.value) {
      setIdMateria(Number(e.target.value));
    }
  };
  const traerMaterias = async (idCurso) => {
    let param =
      authUser?.rol?.tipo === "Docente"
        ? `?idCurso=${authUser?.docentexmateria[0]?.materiaxcursoxdivision?.cursoxdivision?.idcurso}`
        : authUser?.rol?.tipo === "Estudiante"
        ? `?idCurso=${authUser?.alumnoxcursoxdivision1[0]?.cursoxdivision?.idcurso}`
        : idCurso
        ? `?idCurso=${idCurso}`
        : "";
    console.log("Query Param:", param);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/materias${param} `
    );
    if (res.status === 200) {
      setMaterias(res.data);
      console.log("Materias: ", res.data);
    }
  };

  let materiasOrdenadas;
  if (authUser?.rol?.tipo === "Administrador") {
    materiasOrdenadas = materias?.sort(
      (a, b) =>
        a.materiaxcursoxdivision?.idmateria -
        b.materiaxcursoxdivision?.idmateria
    );
  }

  let materiasOrdenadas1;
  let materiasOrdenadasDocente;
  if (authUser?.rol?.tipo === "Docente") {
    materiasOrdenadas1 = authUser?.docentexmateria?.sort(
      (a, b) =>
        a.materiaxcursoxdivision?.cursoxdivision?.iddivision -
        b.materiaxcursoxdivision?.cursoxdivision?.iddivision
    );
    materiasOrdenadasDocente = materiasOrdenadas1.sort(
      (a, b) =>
        a.materiaxcursoxdivision?.idmateria -
        b.materiaxcursoxdivision?.idmateria
    );
  }

  let materiaSinRepetir;
  let materiasOrdenadasEstudiante;
  if (authUser?.rol?.tipo === "Estudiante") {
    materiaSinRepetir = materias.filter(
      (m) =>
        m.cursoxdivision?.iddivision ===
        authUser?.alumnoxcursoxdivision1[0]?.cursoxdivision?.iddivision
    );
    // materiasOrdenadasEstudiante = materiaSinRepetir?.sort(
    //   (a, b) =>
    //     a.materiaxcursoxdivision?.idmateria -
    //     b.materiaxcursoxdivision?.idmateria
    // );
  }

  const traerCursos = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`
    );
    if (res.data) {
      setCursos(res.data);
    }
  };

  const cursosDivision = cursos?.sort((a, b) => a.id - b.id);
  const cursosOrdenados = cursosDivision?.sort(
    (a, b) => a.cursoxdivision?.iddivision - b.cursoxdivision?.iddivision
  );

  const traerTrimestres = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/trimestres`
    );
    if (res.data) {
      setTrimestres(res.data);
    }
  };

  const traerAlumno = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos/${authUser.id}`
    );
    if (res.status === 200) {
      setAlumno(res.data);
    }
  };
  const subirMaterial = async (idTrimestre) => {
    if (idMateria) {
      for (const key in archivos) {
        const file = archivos[key];
        if (typeof file === "object") {
          setSubiendo(true);
          const url = await guardarImagen(
            `materialEstudio/Trimestre ${idTrimestre}/${file.name}`,
            file
          );
          console.log("FILE UPLOADED: ", url);
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/material_estudio`,
            {
              titulo: file.name,
              url: url,
              idMateria: idMateria,
              idTrimestre: idTrimestre,
              idUsuario: authUser?.id,
            }
          );
          if (res.status === 200) {
            setMensaje("Material subido correctamente");
            setTimeout(() => {
              setMensaje("");
            }, 2000);
            await descargarMaterial(idTrimestre, idMateria);
          } else {
            setMensaje("No se pudo subir el material");
          }
        }
      }
    } else {
      setMensaje("Elija una materia");
      setTimeout(() => {
        setMensaje("");
      }, 2000);
    }
  };
  const descargarMaterial = async (idTrimestre, idMateria) => {
    try {
      let params = `?idTrimestre=${idTrimestre}`;

      if (idMateria) {
        params += `&idMateria=${idMateria}`;
      }
      console.log(params);
      setSubiendo(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/material_estudio/search${params}`
      );
      console.log(res.data);
      if (res.status === 200) {
        setMateriales(res.data);
      }
      setSubiendo(false);
      setSubir(false);
    } catch (error) {
      console.log(error);
      setMensaje(error);
      setTimeout(() => {
        setMensaje("");
      }, 2000);
    }
  };
  const quitarFiltros = async () => {
    setIdMateria("");
  };

  const handleArchivos = (e) => {
    if (e.target.files.length) {
      setArchivos(e.target.files);
      setSubir(true);
    }
  };
  const router = useRouter();
  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/gestion/cuenta/login");
    }
    if (authUser && authUser.rol) {
      if (!tienePermisos()) {
        router.push("/error");
      } else {
        traerCursos();
        traerMaterias();
        traerTrimestres();
        traerAlumno();
        // descargarMaterial(1, materias[0]?.id);
      }
    }
  }, [loading, authUser]);

  const tienePermisos = () => {
    return (
      authUser?.rol?.tipo === "Administrador" ||
      authUser?.rol?.tipo === "Docente" ||
      authUser?.rol?.tipo === "Estudiante"
    );
  };
  const puedeSubirArchivos = () => {
    return (
      authUser?.rol?.tipo === "Administrador" ||
      authUser?.rol?.tipo === "Docente"
    );
  };
  const borrarMaterial = async (e, id, idTrimestre) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/material_estudio/delete/${id}`
      );
      setMensaje(res.data);
      descargarMaterial(idTrimestre, materias[0].id);
    } catch (error) {
      console.log(error);
      setMensaje(error.message);
    } finally {
      setTimeout(() => {
        setMensaje("");
      }, 2000);
    }
  };
  return (
    <Layout>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Material de Estudio
      </Typography>
      <div>
        {authUser?.rol?.tipo === "Administrador" && (
          <FormControl style={{ marginRight: "20px", marginBottom: "25px" }}>
            <Autocomplete
              size="small"
              sx={{ width: "340px" }}
              disablePortal
              id="inputMateria"
              // value={value}
              name="idMateria"
              onChange={handleMateria}
              options={materias}
              getOptionLabel={(materia) =>
                `${materia?.materia?.nombre}   -   ${materia?.cursoxdivision?.curso?.nombre} ${materia?.cursoxdivision?.division?.division}`
              }
              isOptionEqualToValue={(option, value) => {
                return option?.id === value?.id;
              }}
              noOptionsText={"No existe materia con ese nombre"}
              renderOption={(props, materia) => (
                <Box
                  component="li"
                  {...props}
                  key={materia?.id}
                  value={materia?.id}
                >
                  {materia?.materia?.nombre}
                  &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
                  {materia?.cursoxdivision?.curso?.nombre}&nbsp;
                  {materia?.cursoxdivision?.division?.division}
                </Box>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Materias" />
              )}
            />
          </FormControl>
        )}
        {authUser?.rol?.tipo === "Docente" && (
          <FormControl style={{ marginRight: "20px", marginBottom: "25px" }}>
            <Autocomplete
              size="small"
              sx={{ width: "340px" }}
              disablePortal
              id="inputMateria"
              // value={value}
              name="idMateria"
              onChange={handleMateria}
              options={materias}
              getOptionLabel={(materia) =>
                `${materia.materiaxcursoxdivision?.materia?.nombre} - ${materia.materiaxcursoxdivision?.cursoxdivision?.curso?.nombre} ${materia.materiaxcursoxdivision?.cursoxdivision?.division?.division}`
              }
              isOptionEqualToValue={(option, value) => {
                return option?.id === value?.id;
              }}
              noOptionsText={"No existe materia con ese nombre"}
              renderOption={(props, materia) => (
                <Box
                  component="li"
                  {...props}
                  key={materia?.id}
                  value={materia?.id}
                >
                  {materia.materiaxcursoxdivision?.materia?.nombre} -{" "}
                  {
                    materia.materiaxcursoxdivision?.cursoxdivision?.curso
                      ?.nombre
                  }{" "}
                  {
                    materia.materiaxcursoxdivision?.cursoxdivision?.division
                      ?.division
                  }
                </Box>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Materias" />
              )}
            />
          </FormControl>
        )}
        {authUser?.rol?.tipo === "Estudiante" && (
          <>
            <Box sx={{ marginBottom: "20px" }}>
              <FormControl
                style={{ marginRight: "20px", marginBottom: "25px" }}
              >
                <Autocomplete
                  size="small"
                  sx={{ width: "330px" }}
                  disablePortal
                  id="inputMateria"
                  // value={value}
                  name="idMateria"
                  onChange={handleMateria}
                  options={materiaSinRepetir}
                  getOptionLabel={(materia) => `${materia?.materia?.nombre}`}
                  isOptionEqualToValue={(option, value) => {
                    return option?.id === value?.id;
                  }}
                  noOptionsText={"No existe materia con ese nombre"}
                  renderOption={(props, materia) => (
                    <Box
                      component="li"
                      {...props}
                      key={materia?.id}
                      value={materia?.id}
                    >
                      {materia?.materia?.nombre}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Materias" />
                  )}
                />
              </FormControl>
            </Box>
          </>
        )}

        <Button
          sx={{ mx: 2 }}
          variant="outlined"
          onClick={async () => await descargarMaterial(tabIndex + 1, idMateria)}
          endIcon={<Search />}
        >
          Buscar
        </Button>
        <Button
          color="info"
          variant="text"
          onClick={async () => await quitarFiltros()}
        >
          Quitar Filtros
        </Button>

        {subiendo && <LinearProgress sx={{ my: 2 }} />}
        {mensaje && (
          <Alert sx={{ my: 2 }} variant="outlined" color="info">
            {mensaje}
          </Alert>
        )}
        <Box>
          {trimestres && (
            <>
              <Tabs
                value={tabIndex}
                onChange={async (e, newValue) => {
                  setTabIndex((_) => newValue);
                  await descargarMaterial(newValue + 1, idMateria);
                }}
              >
                {trimestres
                  .sort((t1, t2) => t1.id - t2.id)
                  ?.map((t) => (
                    <Tab key={t.id} label={t.trimestre} />
                  ))}
              </Tabs>
              {trimestres?.map((t, i) => (
                <TabPanel key={t.id} value={tabIndex} index={i}>
                  <TableContainer key={t.id}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            colSpan={12}
                            sx={{
                              color: "black",
                              backgroundColor: "lightblue",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              {subir ? (
                                <Button
                                  onClick={() => subirMaterial(t.id)}
                                  variant="contained"
                                  size="small"
                                  endIcon={<FileUploadIcon />}
                                >
                                  Subir apunte
                                </Button>
                              ) : (
                                puedeSubirArchivos() && (
                                  <Button
                                    variant="contained"
                                    component={"label"}
                                    size="small"
                                    endIcon={<FileOpenSharp />}
                                  >
                                    Elegir apuntes
                                    <input
                                      name="archivos"
                                      onChange={handleArchivos}
                                      hidden
                                      accept="file/**"
                                      multiple
                                      type="file"
                                    />
                                  </Button>
                                )
                              )}
                              <Typography variant="h6">
                                {t.trimestre}
                              </Typography>
                              <h1></h1>
                            </Box>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {materiales.length > 0 ? (
                          materiales.map((m) => (
                            <TableRow key={m.id}>
                              <TableCell
                                variant="head"
                                sx={{
                                  color: "black",
                                }}
                                colSpan={7}
                              >
                                {m.titulo}
                              </TableCell>
                              <TableCell sx={{ textAlign: "right" }}>
                                {m.fecha}
                              </TableCell>
                              <TableCell sx={{ textAlign: "right" }}>
                                <a
                                  href={m.url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <IconButton
                                    aria-label="fingerprint"
                                    color="primary"
                                    sx={{ marginRight: "20px" }}
                                  >
                                    <DownloadIcon />
                                  </IconButton>
                                </a>
                                {puedeSubirArchivos() && (
                                  <IconButton
                                    aria-label="fingerprint"
                                    color="primary"
                                    onClick={(e) =>
                                      borrarMaterial(e, m.id, t.id)
                                    }
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <div
                            style={{
                              fontSize: 18,
                              color: "lightblue",
                              textAlign: "center",
                            }}
                          >
                            Seleccione una materia
                          </div>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>
              ))}
            </>
          )}
        </Box>
      </div>
    </Layout>
  );
};

export default MaterialEstudio;
