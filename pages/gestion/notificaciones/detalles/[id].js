import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../../../../components/layout";
import Loading from "../../../../components/loading";
import { Box, Button, Card, Stack, TextareaAutosize, Typography, TextField, CardContent, CardActions, IconButton, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, } from "@mui/material";
import styles from "../../../../styles/fontSize.module.css"
import React from 'react';
import { useAuth } from "../../../../components/context/authUserProvider";


export default function DetallesNoticia() {
    const [cargando, setCargando] = useState(true)
    const [notificacion, setNotificacion] = useState()
    const [actualizar, setActualizar] = useState({
        id: '',
        asunto: '',
        contenido: ''
    })
    const [usuario, setUsuario] = useState({ id: '' })
    const { loading, authUser } = useAuth()
    const handleNotificacion = (e) => {
        setActualizar({ ...actualizar, [e.target.name]: e.target.value })
        console.log(actualizar);
    }
    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            console.log(res.data);
            setUsuario({ id: res.data?.id })
        }
    }
    const router = useRouter()
    const { id } = router.query
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerUsuario()
        traerDetalle()
        setCargando(false)
    }, [id, cargando, usuario.id, loading, authUser])

    // const [inEditMode, setInEditMode] = useState({
    //     status: false,
    //     rowKey: null
    // });

    const traerDetalle = async () => {
        if (id) {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notificaciones/detalles/${id}`)
            if (res.data) {
                console.log(res.data);
                setNotificacion(res.data)
            }
        }
    }
    const onSave = async (id) => {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notificaciones/update/${id}`, {
            asunto: actualizar.asunto.length && actualizar.asunto || notificacion?.asunto,
            contenido: actualizar.contenido.length && actualizar.contenido || notificacion?.contenido,
            idUsuario: usuario.id,
            idNotificacionXUsuario: notificacion?.notificacionXusuario[0]?.id
        })
        onCancel()
        if (res.status === 200) {
            router.push('/gestion/notificaciones')
        }
    }

    const onCancel = () => {
        // reset the inEditMode state value
        // setInEditMode({
        //     status: false,
        //     rowKey: null
        // })
        setIsNamedFocused(false)
    }

    const [isNameFocused, setIsNamedFocused] = useState(false);

    return (
        <Layout>
            {
                notificacion && (
                    <div className="container text-center">
                        <Card sx={{ minWidth: '300px', height: '400px', boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)', backgroundColor: 'white', borderRadius: '30px' }}>
                            <div >
                                {!isNameFocused ? (
                                    <Box>
                                        <Button variant="contained"
                                            sx={{ marginLeft: '30px', marginTop: '20px' }}
                                            onClick={() => {
                                                setIsNamedFocused(true);
                                            }}>
                                            Editar
                                        </Button>
                                        <Grid>
                                            <Grid item >
                                                <Typography textAlign="center" variant={'h6'}
                                                    sx={{ marginBottom: '30px', marginTop: '20px', marginLeft: '30px', marginRight: '30px' }}
                                                    className={`${styles.Typography}`}
                                                ><strong>{notificacion?.asunto}</strong> </Typography>

                                            </Grid>
                                            <Grid item >
                                                <Typography variant={'body2'}
                                                    sx={{ marginBottom: '30px', marginLeft: '30px', marginRight: '20px' }}
                                                    className={`${styles.Typography2}`}
                                                >{notificacion?.contenido} </Typography>
                                            </Grid>
                                            <Grid item >

                                                <Typography variant="caption" sx={{ marginBottom: '30px', marginLeft: '30px' }}
                                                    className={`${styles.Typography3}`}
                                                > <strong>Atte. {notificacion.notificacionXusuario[0]?.usuario?.rol?.tipo}</strong></Typography>
                                            </Grid>
                                        </Grid>

                                    </Box>
                                ) : (

                                    <Box>
                                        <Stack spacing={1} direction="row" sx={{ marginLeft: '30px', marginTop: '19px' }}>
                                            <Button variant="contained" color="success"

                                                onClick={(e) => onSave(notificacion?.id)}
                                            >
                                                Actualizar
                                            </Button>

                                            <Button variant="contained" color="error"
                                                sx={{ marginLeft: '40px', marginTop: '20px' }}
                                                onClick={() => {
                                                    setIsNamedFocused(false);
                                                }}>
                                                Cancelar
                                            </Button>
                                        </Stack>

                                        <Grid>
                                            <Grid item>
                                                <TextField
                                                    variant="standard"
                                                    autoFocus
                                                    fullWidth
                                                    sx={{ alignItems: 'center' }}
                                                    maxRows={2}
                                                    inputProps={
                                                        {
                                                            className: styles.Typography,
                                                            style: {
                                                                fontWeight: 'bold',
                                                                textAlign: 'center',
                                                                marginBottom: '24.6px', marginTop: '20.5px', marginLeft: '30px', marginRight: '30px'
                                                            },
                                                            disableunderline: 'true'
                                                        }

                                                    }
                                                    placeholder={notificacion?.asunto}
                                                    name='asunto'
                                                    value={actualizar.asunto}
                                                    onChange={handleNotificacion}

                                                />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    variant="standard"
                                                    multiline
                                                    autoFocus
                                                    fullWidth
                                                    maxRows={7}
                                                    inputProps={
                                                        {
                                                            className: styles.Typography2,
                                                            style: {
                                                                marginBottom: '25px', marginLeft: '30px', marginRight: '20px'
                                                            },
                                                            disableunderline: 'true'
                                                        }
                                                    }
                                                    placeholder={notificacion?.contenido}
                                                    name='contenido'
                                                    value={actualizar.contenido}
                                                    onChange={handleNotificacion}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="caption" sx={{ marginBottom: '30px', marginLeft: '30px' }}
                                                    className={`${styles.Typography3}`}
                                                > <strong>Atte. {notificacion.notificacionXusuario[0]?.usuario?.rol?.tipo}</strong>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )}
                            </div>
                        </Card>
                    </div >
                )
            }
            {
                cargando && (
                    <Loading />
                )
            }
        </Layout >
    )
}