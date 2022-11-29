import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAuth } from './context/authUserProvider'
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Home } from '@mui/icons-material';
import { ListItemButton, ListItem, ListItemIcon, ListItemText, Box, Drawer } from '@mui/material';
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined'
import DescriptionIcon from '@mui/icons-material/Description';
import ReportIcon from '@mui/icons-material/Report';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import React from 'react'
import EventIcon from '@mui/icons-material/Event';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SegmentIcon from '@mui/icons-material/Segment';
import { Navbar } from './navbar';
import Link from 'next/link';

const Sidebar = ({ menusGestion, menusReportes }) => {
    const router = useRouter()
    const { authUser, cerrarSesion } = useAuth()
    const [openDrawer, setOpenDrawer] = useState(false)

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => setOpenDrawer(!openDrawer)}
            onKeyDown={() => setOpenDrawer(!openDrawer)}>
            <>
                <ListItem disablePadding sx={{ mt: 3 }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <Link href={'/'}>
                            <Typography variant='h6'>Inicio</Typography>
                        </Link>
                    </ListItemButton>
                </ListItem>
                {
                    menusGestion && (
                        <>

                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton disabled style={{ opacity: '200%' }}>
                                        <ListItemIcon>
                                            <SegmentIcon />
                                        </ListItemIcon>
                                        <Typography style={{ fontWeight: 'bold', fontSize: '20px' }} >
                                            Gestion
                                        </Typography>
                                    </ListItemButton>
                                </ListItem>
                            </List>

                            {
                                menusGestion?.map((m, i) => (
                                    <ListItemButton key={i}>
                                        <ListItemIcon>
                                            {
                                                m?.menu?.menuSistema === 'Usuarios' && <AssignmentIndOutlinedIcon />
                                            }
                                            {
                                                m?.menu?.menuSistema === 'Asistencias' && (
                                                    <ContentPasteSearchOutlinedIcon />
                                                )
                                            }
                                            {
                                                m?.menu?.menuSistema === 'Asistencia Docente' && (
                                                    <ContentPasteSearchOutlinedIcon />
                                                )
                                            }
                                            {
                                                m?.menu?.menuSistema === 'Notas' && (
                                                    <DescriptionIcon />
                                                )
                                            }
                                            {
                                                m?.menu?.menuSistema === 'Certificado de Servicio' && (
                                                    <DescriptionIcon />
                                                )
                                            }
                                            {
                                                m?.menu?.menuSistema === 'Sanciones' && (
                                                    <ReportIcon />
                                                )
                                            }
                                            {
                                                m?.menu?.menuSistema === 'Material de Estudio' && (
                                                    <FileCopyIcon />
                                                )
                                            }
                                            {
                                                m?.menu?.menuSistema === 'Fecha de Examen' && (
                                                    <EventIcon />
                                                )
                                            }
                                            {
                                                m?.menu?.menuSistema === 'Notificaciones' && (
                                                    <NotificationsRoundedIcon />
                                                )
                                            }
                                        </ListItemIcon>
                                        <Link href={m?.menu?.url}>
                                            <ListItemText primary={m?.menu?.menuSistema} />
                                        </Link>
                                    </ListItemButton>
                                ))
                            }
                            <Divider sx={{ mt: 1, mb: 1 }} />
                        </>
                    )
                }

                {/* {
                    menusReportes && (
                        <>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton disabled style={{ opacity: '200%' }}>
                                        <ListItemIcon>
                                            <EqualizerIcon />
                                        </ListItemIcon>
                                        <Typography style={{ fontWeight: 'bold', fontSize: '20px' }} >
                                            Reportes
                                        </Typography>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                            {
                                menusReportes?.map((m, i) => (

                                    <ListItemButton key={i} href={m?.menu?.url}>
                                        <ListItemIcon>
                                            <AssessmentIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={m?.menu?.menuSistema} />
                                    </ListItemButton>
                                ))
                            }
                            <Divider sx={{ mt: 1, mb: 1 }} />
                        </>
                    )
                } */}
                {
                    authUser && (
                        <ListItemButton onClick={logout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Cerrar Sesion" />
                        </ListItemButton>
                    )
                }
                {
                    !authUser && (
                        <ListItemButton onClick={() => router.push('/gestion/cuenta/login')}>
                            <ListItemIcon>
                                <LoginIcon />
                            </ListItemIcon>
                            <ListItemText primary="Iniciar Sesion" />
                        </ListItemButton>
                    )
                }
            </>
        </Box>
    );
    const logout = () => {
        cerrarSesion()
            .then(() => {
                router.reload()
            })
    }

    return (
        <React.Fragment>
            <Navbar toggleDrawer={() => setOpenDrawer(!openDrawer)} />
            <Drawer
                anchor={'left'}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}>
                {list()}
            </Drawer>
        </React.Fragment>

        // <Drawer sx={{ height: '100vh' }} variant="permanent" open={open} >
        //     <Toolbar id="parent"
        //         sx={{
        //             display: 'flex',
        //             alignItems: 'center',
        //             justifyContent: 'flex-end',
        //             px: [1],
        //         }}

        //     >
        //         <IconButton onClick={toggleDrawer}>
        //             <ChevronLeftIcon />
        //         </IconButton>
        //     </Toolbar>
        //     <List id="child" component="nav">
        //         <React.Fragment>
        //             <ListItemButton onClick={() => router.push('/')}>
        //                 <ListItemIcon>
        //                     <HomeOutlined />
        //                 </ListItemIcon>
        //                 <ListItemText primary="Inicio" />
        //             </ListItemButton>
        //             <Divider sx={{ mt: 1, mb: 1 }} />


        //         </React.Fragment>
        //     </List>
        // </Drawer>
    )
}

export default Sidebar

