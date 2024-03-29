import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../../components/context/authUserProvider";
import { Layout } from "../../components/layout";
import {
  Box,
  Button,
  Autocomplete,
  FormControl,
  Typography,
  Grid,
  InputLabel,
  Stack,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import { Search } from "@mui/icons-material";
import { Container } from "@mui/system";
import Loading from "../../components/loading";

export default function Notas() {
  const [materias, setMaterias] = useState([]);
  const [notaTrimestre, setNotaTrimestre] = useState([]);
  const [promedioTrimestre, setPromedioTrimestre] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const { loading, authUser } = useAuth();

  const router = useRouter();
  const [cargando1, setCargando1] = useState(false);
  const [cargando2, setCargando2] = useState(false);
  const [idCursoXdivision, setIdCursoXdivision] = useState(1);
  const [cursos, setCursos] = useState([]);
  const [idAlumno, setIdAlumno] = useState();
  const [idMateria, setIdMateria] = useState();
  const [nombreAlumno, setNombreAlumno] = useState();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/gestion/cuenta/login");
    }
    if (authUser && authUser?.rol) {
      if (!tienePermisos()) {
        router.push("/error");
      } else {
        (async () => {
          await traerMaterias();
          if (authUser?.rol?.tipo !== "Estudiante") {
            await listarCursos();
            await listarAlumnos();
          } else {
            await promedioPorTrimestre();
            await notasPorTrimestre();
          }
        })();
      }
    }
  }, [loading, authUser]);

  const tienePermisos = () => {
    return (
      authUser?.rol?.tipo === "Administrador" ||
      authUser?.rol?.tipo === "Director" ||
      authUser?.rol?.tipo === "Vicedirector" ||
      authUser?.rol?.tipo === "Estudiante" ||
      authUser?.rol?.tipo === "Tutor"
    );
  };
  const notasPorTrimestre = async () => {
    setCargando1(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/notas/notas_trimestres/${authUser?.rol?.tipo === "Estudiante"
        ? authUser?.alumnoxcursoxdivision1[0].id
        : authUser?.rol?.tipo === "Tutor" && !authUser?.alumnoxcursoxdivision2[1]
          ? authUser?.alumnoxcursoxdivision2[0].id
          : idAlumno
      }/${idMateria}`
    );
    setCargando1(false);
    if (res.status === 200) {
      console.log(res.data);
      setNotaTrimestre(res.data);
    }
  };
  const promedioPorTrimestre = async () => {
    setCargando2(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL
      }/reportes/notas/promedios_trimestres/${authUser?.rol?.tipo === "Estudiante"
        ? authUser?.alumnoxcursoxdivision1[0].id
        : authUser?.rol?.tipo === "Tutor" && !authUser?.alumnoxcursoxdivision2[1]
          ? authUser?.alumnoxcursoxdivision2[0].id
          : idAlumno
      }/${idMateria}`
    );
    setCargando2(false);
    if (res.status === 200) {
      console.log(res.data);
      setPromedioTrimestre(res.data);
    }
  };
  const listarAlumnos = async (idCursoXdivision = 1) => {
    let param = idCursoXdivision ? `?idCursoXdivision=${idCursoXdivision}` : "";
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos${param}`
    );
    if (res.status === 200) {
      console.log(res.data);
      setAlumnos(res.data);
    }
  };
  const traerMaterias = async (idCurso = 1) => {
    let param =
      authUser?.rol?.tipo === "Estudiante"
        ? `?idCurso=${authUser?.alumnoxcursoxdivision1[0]?.cursoxdivision?.idcurso}`
        : authUser?.rol?.tipo === "Tutor" && !authUser?.alumnoxcursoxdivision2[1]
          ? `?idCurso=${authUser?.alumnoxcursoxdivision2[0]?.cursoxdivision?.idcurso}`
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
  const materiaSinRepetir = materias.filter(
    (m) => m.cursoxdivision?.iddivision === 1
  );
  const materiasOrdenadas = materiaSinRepetir?.sort(
    (a, b) =>
      a.materiaxcursoxdivision?.idmateria - b.materiaxcursoxdivision?.idmateria
  );

  const listarCursos = async () => {
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

  const handleCursoXdivision = async (e) => {
    if (e.target.value) {
      const cursoxdivision = cursos?.find((c) => c.id === e.target.value);
      setIdCursoXdivision(Number(cursoxdivision?.id));
      await traerMaterias(Number(cursoxdivision?.curso?.id));
      await listarAlumnos(Number(cursoxdivision?.id));

      // console.log("cursoxdivision", cursoxdivision);
      // console.log("division", cursoxdivision?.curso?.id);
      // console.log("idmateria", cursoxdivision?.id)
    } else {
      setIdMateria("");
    }
  };
  const handleMateria = (e) => {
    if (e.target.value) {
      setIdMateria(Number(e.target.value));
    } else {
      setIdMateria("");
    }
  };

  const handleAlumno = async (e, newValue) => {
    if (newValue) {
      // console.log("Value", newValue?.id)
      let alumno = authUser.alumnoxcursoxdivision2?.find(
        (a) => newValue?.id === a.id
      );
      // console.log("alumnoo", alumno)
      setIdAlumno(newValue?.id);
      if (alumno) {
        await traerMaterias(Number(alumno?.cursoxdivision?.curso?.id));
        let nombre = `${alumno?.usuario?.nombre} ${alumno?.usuario?.apellido}`;
        setNombreAlumno(nombre);
      }
    }
  };

  const handleSearch = async () => {
    await notasPorTrimestre();
    await promedioPorTrimestre();
  };

  return (
    <Layout>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Reporte Notas{" "}
        {authUser?.rol?.tipo === "Estudiante"
          ? ` de ${authUser?.apellido} ${authUser?.nombre}`
          : authUser?.rol?.tipo === "Tutor" && !authUser?.alumnoxcursoxdivision2[1]
            ? ` de ${authUser?.alumnoxcursoxdivision2[0].usuario?.apellido} ${authUser?.alumnoxcursoxdivision2[0].usuario?.nombre}`
            : authUser?.rol?.tipo === "Tutor" && nombreAlumno
              ? ` de ${nombreAlumno}`
              : ""}
      </Typography>
      {authUser?.rol?.tipo != "Estudiante" && authUser?.rol?.tipo != "Tutor" && (
        <Box>
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            Buscar estudiante:
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 2, md: 5 }}
          >
            <FormControl>
              <InputLabel id="demo-simple-select-label">Curso</InputLabel>
              <Select
                sx={{ width: "90px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Curso"
                name="idCurso"
                size="small"
                value={idCursoXdivision}
                onChange={handleCursoXdivision}
                MenuProps={{ disableScrollLock: true }}
              >
                <MenuItem value={0}>Seleccione un curso</MenuItem>
                {cursosOrdenados &&
                  cursosOrdenados.map((c, i) => (
                    <MenuItem selected={i === 0} value={c.id} key={i}>
                      {c.curso?.nombre} {c.division?.division}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl sx={{ width: "250px" }} size="small">
              <InputLabel id="demo-simple-select-label-1">Materia</InputLabel>
              <Select
                labelId="demo-simple-select-label-1"
                id="demo-simple-select"
                value={idMateria}
                label="Materia"
                onChange={handleMateria}
                MenuProps={{ disableScrollLock: true }}
              >
                {materiasOrdenadas &&
                  materiasOrdenadas?.map((m, i) => (
                    <MenuItem selected={i === 0} key={i} value={m.materia?.id}>
                      {m.materia?.nombre}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl style={{ marginRight: "20px" }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                // value={value}
                name="idAlumno"
                size="small"
                onChange={handleAlumno}
                getOptionLabel={(alumno) =>
                  `${alumno?.usuario?.apellido} ${alumno?.usuario?.nombre} `
                }
                options={alumnos}
                sx={{ width: "250px" }}
                isOptionEqualToValue={(option, value) =>
                  option?.id === value?.id
                }
                noOptionsText={"No existe un estudiante con ese nombre"}
                renderOption={(props, alumno) => (
                  <Box component="li" {...props} key={alumno?.id}>
                    {alumno?.usuario?.apellido} {alumno?.usuario?.nombre}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Estudiante" />
                )}
              />
            </FormControl>
          </Stack>

          <Button
            onClick={handleSearch}
            variant="outlined"
            startIcon={<Search />}
            color="info"
            sx={{ marginTop: "20px" }}
          >
            Buscar
          </Button>
        </Box>
      )}
      {
        authUser?.alumnoxcursoxdivision2[1] && authUser?.rol?.tipo === "Tutor" && (
          <Box direction="row">
            <FormControl sx={{ width: "250px", marginRight: "20px" }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                // value={value}
                name="idAlumno"
                size="small"
                onChange={handleAlumno}
                getOptionLabel={(alumno) =>
                  `${alumno?.usuario?.apellido} ${alumno?.usuario?.nombre} `
                }
                options={authUser?.alumnoxcursoxdivision2}
                sx={{ width: "250px" }}
                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                noOptionsText={"No existe un estudiante con ese nombre"}
                renderOption={(props, alumno) => (
                  <Box component="li" {...props} key={alumno?.id}>
                    {alumno?.usuario?.apellido} {alumno?.usuario?.nombre}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Estudiante" />
                )}
              />
            </FormControl>

            <FormControl
              sx={{ width: "250px", marginRight: "20px" }}
              size="small"
            >
              <InputLabel id="demo-simple-select-label">Materia</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={idMateria}
                label="Materia"
                onChange={handleMateria}
                MenuProps={{ disableScrollLock: true }}
              >
                {materiasOrdenadas &&
                  materiasOrdenadas?.map((m, i) => (
                    <MenuItem selected={i === 0} key={i} value={m.materia?.id}>
                      {m.materia?.nombre}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Button
              onClick={handleSearch}
              variant="outlined"
              startIcon={<Search />}
              color="info"
            >
              Buscar
            </Button>
          </Box>
        )
      }
      {
        !authUser?.alumnoxcursoxdivision2[1] && authUser?.rol?.tipo === "Tutor" && (
          <Box direction="row">
            <FormControl
              sx={{ width: "250px", marginRight: "20px" }}
              size="small"
            >
              <InputLabel id="demo-simple-select-label">Materia</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={idMateria}
                label="Materia"
                onChange={handleMateria}
                MenuProps={{ disableScrollLock: true }}
              >
                {materiasOrdenadas &&
                  materiasOrdenadas?.map((m, i) => (
                    <MenuItem selected={i === 0} key={i} value={m.materia?.id}>
                      {m.materia?.nombre}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Button
              onClick={handleSearch}
              variant="outlined"
              startIcon={<Search />}
              color="info"
            >
              Buscar
            </Button>
          </Box>
        )
      }
      {
        authUser?.rol?.tipo === "Estudiante" && (
          <Box direction="row">
            <FormControl
              sx={{ width: "250px", marginRight: "20px" }}
              size="small"
            >
              <InputLabel id="demo-simple-select-label">Materia</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={idMateria}
                label="Materia"
                onChange={handleMateria}
                MenuProps={{ disableScrollLock: true }}
              >
                {materiasOrdenadas &&
                  materiasOrdenadas?.map((m, i) => (
                    <MenuItem selected={i === 0} key={i} value={m.materia?.id}>
                      {m.materia?.nombre}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Button
              onClick={handleSearch}
              variant="outlined"
              startIcon={<Search />}
              color="info"
            >
              Buscar
            </Button>
          </Box>
        )
      }
      {!cargando1 &&
        !cargando2 &&
        notaTrimestre.length === 0 &&
        promedioTrimestre.length === 0 && (
          <Typography variant="h5" sx={{ textAlign: "center", my: 3 }}>
            Seleccione una materia para buscar sus notas
          </Typography>
        )}
      {!cargando1 &&
        !cargando2 &&
        notaTrimestre.length > 0 &&
        promedioTrimestre.length > 0 && (
          <Grid container spacing={2}>
            <Grid item xs>
              <h2>Notas por trimestre</h2>
              <div sx={{ marginBottom: "100px" }}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="center"
                          colSpan={12}
                          sx={{
                            color: "black",
                            backgroundColor: "lightblue",
                          }}
                        >
                          {notaTrimestre[0]?.materia}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {notaTrimestre.map((n, i) =>
                        n.id == 1 ? (
                          <TableRow key={i}>
                            <TableCell
                              variant="head"
                              sx={{
                                color: "black",
                                backgroundColor: "lightblue",
                              }}
                            >
                              Primer Trimestre
                            </TableCell>
                            <TableCell>
                              {
                                n.nota1 === 0 ? (
                                  " "
                                ) : (
                                  n.nota1
                                )
                              }
                            </TableCell>
                            <TableCell>
                              {
                                n.nota2 === 0 ? (
                                  " "
                                ) : (
                                  n.nota2
                                )
                              }
                            </TableCell>
                            <TableCell>
                              {
                                n.nota3 === 0 ? (
                                  " "
                                ) : (
                                  n.nota3
                                )
                              }
                            </TableCell>
                            <TableCell>
                              {
                                n.nota4 === 0 ? (
                                  " "
                                ) : (
                                  n.nota4
                                )
                              }
                            </TableCell>
                            <TableCell>
                              {
                                n.nota5 === 0 ? (
                                  " "
                                ) : (
                                  n.nota5
                                )
                              }
                            </TableCell>
                          </TableRow>
                        ) : n.id === 2 ? (
                          <TableRow key={i}>
                            <TableCell
                              variant="head"
                              sx={{
                                color: "black",
                                backgroundColor: "lightblue",
                              }}
                            >
                              Segundo Trimestre
                            </TableCell>
                            <TableCell>
                              {
                                n.nota1 === 0 ? (
                                  " "
                                ) : (
                                  n.nota1
                                )
                              }
                            </TableCell>
                            <TableCell>
                              {
                                n.nota2 === 0 ? (
                                  " "
                                ) : (
                                  n.nota2
                                )
                              }
                            </TableCell>
                            <TableCell>
                              {
                                n.nota3 === 0 ? (
                                  " "
                                ) : (
                                  n.nota3
                                )
                              }
                            </TableCell>
                            <TableCell>
                              {
                                n.nota4 === 0 ? (
                                  " "
                                ) : (
                                  n.nota4
                                )
                              }
                            </TableCell>
                            <TableCell>
                              {
                                n.nota5 === 0 ? (
                                  " "
                                ) : (
                                  n.nota5
                                )
                              }
                            </TableCell>
                          </TableRow>
                        ) : (
                          <TableRow key={i}>
                            <TableCell
                              variant="head"
                              sx={{
                                color: "black",
                                backgroundColor: "lightblue",
                              }}
                            >
                              Tercer Trimestre
                            </TableCell>
                            <TableCell>
                              {
                                n.nota1 === 0 ? (
                                  " "
                                ) : (
                                  n.nota1
                                )
                              }
                            </TableCell>
                            <TableCell>
                              {
                                n.nota2 === 0 ? (
                                  " "
                                ) : (
                                  n.nota2
                                )
                              }
                            </TableCell>
                            <TableCell>
                              {
                                n.nota3 === 0 ? (
                                  " "
                                ) : (
                                  n.nota3
                                )
                              }
                            </TableCell>
                            <TableCell>
                              {
                                n.nota4 === 0 ? (
                                  " "
                                ) : (
                                  n.nota4
                                )
                              }
                            </TableCell>
                            <TableCell>
                              {
                                n.nota5 === 0 ? (
                                  " "
                                ) : (
                                  n.nota5
                                )
                              }
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Grid>
            <Grid item xs>
              <h2>Promedio por trimestre</h2>
              <div sx={{ marginTop: "200px" }}>
                <TableContainer component={Paper} >
                  <Table >
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="center"
                          colSpan={6}
                          sx={{
                            color: "black",
                            backgroundColor: "lightblue",
                            // borderRightColor: "black",
                            // borderRight: 1,

                            // borderBottom: 1,
                            // borderBottomColor: "black",
                          }}
                        >
                          {promedioTrimestre[0]?.materia}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          colSpan={2}
                          sx={{
                            color: "black",
                            backgroundColor: "lightblue",
                            // borderRightColor: "black",
                            // borderRight: 1,

                            // borderBottom: 1,
                            // borderBottomColor: "black",
                          }}
                        >
                          Primer Trimestre
                        </TableCell>
                        <TableCell
                          colSpan={2}
                          sx={{
                            color: "black",
                            backgroundColor: "lightblue",
                            // borderRightColor: "black",
                            // borderRight: 1,

                            // borderBottom: 1,
                            // borderBottomColor: "black",
                          }}
                        >
                          Segundo Trimestre
                        </TableCell>

                        <TableCell
                          colSpan={2}
                          align="center"
                          sx={{
                            color: "black",
                            backgroundColor: "lightblue",
                            // borderRightColor: "black",
                            // borderRight: 1,

                            // borderBottom: 1,
                            // borderBottomColor: "black",
                          }}
                        >
                          Tercer Trimestre
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        <TableRow>
                          <TableCell
                            colSpan={2}
                            component="th"
                            scope="row"
                            sx={{
                              // borderRightColor: "black",
                              // borderRight: 1,
                              // borderTop: 1,
                              // borderTopColor: "black",
                              // borderBottom: 1,
                              // borderBottomColor: "black",
                            }}
                          >
                            {Number(promedioTrimestre[0]?.promedio).toFixed(2)}
                          </TableCell>
                          <TableCell
                            colSpan={2}
                            component="th"
                            scope="row"
                            sx={{
                              // borderRightColor: "black",
                              // borderRight: 1,
                              // borderTop: 1,
                              // borderTopColor: "black",
                              // borderBottom: 1,
                              // borderBottomColor: "black",
                            }}
                          >
                            {Number(promedioTrimestre[1]?.promedio).toFixed(2)}
                          </TableCell>
                          <TableCell
                            colSpan={2}
                            component="th"
                            scope="row"
                            sx={{
                              // borderRightColor: "black",
                              // borderRight: 1,
                              // borderTop: 1,
                              // borderTopColor: "black",
                              // borderBottom: 1,
                              // borderBottomColor: "black",
                            }}
                          >
                            {Number(promedioTrimestre[2]?.promedio).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Grid>
          </Grid>
        )}
      {cargando1 && (
        <Container sx={{ m: "auto", textAlign: "left" }}>
          <Loading size={50} />
        </Container>
      )}
      {cargando2 && (
        <Container sx={{ m: "auto", textAlign: "right" }}>
          <Loading size={50} />
        </Container>
      )}
    </Layout>
  );
}
