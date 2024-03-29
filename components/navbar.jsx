import Link from "next/link";
import { useAuth } from "./context/authUserProvider";
import {
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Box,
  AppBar,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Notificacion from "./notificacion_panel";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useWindowSize from "./hooks/windowSize";

export const Navbar = ({ toggleDrawer }) => {
  const { loading, authUser } = useAuth();
  const [title, setTitle] = useState('Instituto Privado "El Salvador"');
  const router = useRouter();
  const windowSize = useWindowSize();

  useEffect(() => {
    setTitle(
      windowSize.width <= 900
        ? '"El Salvador"'
        : 'Instituto Privado "El Salvador"'
    );
  }, [windowSize]);
  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            // sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h7"
            component="div"
            sx={{ flexGrow: 1, fontSize: "20px" }}
          >
            <strong>{title}</strong>
          </Typography>
          {!loading && authUser && authUser?.rol && (
            <Typography variant="body1" color={"white"} sx={{ mx: 2 }}>
              Logueado como <strong>{authUser?.rol?.tipo}</strong>
            </Typography>
          )}
          <Link
            href={"/gestion/institucional"}
            style={{ textDecoration: "none", color: "#f9f9f9" }}
          >
            <Button color="inherit" style={{ marginRight: "10px" }}>
              Institucional
            </Button>
          </Link>
          {!loading &&
            authUser &&
            (authUser.rol?.tipo === "Estudiante" ||
              authUser.rol?.tipo === "Tutor" ||
              authUser.rol?.tipo === "Administrador") && (
              <>
                <div
                  style={{
                    alignContent: "right",
                    marginLeft: "-30px",
                    marginRight: "-20px",
                  }}
                >
                  <Notificacion disablePadding />
                </div>
              </>
            )}
          {!loading && authUser && (
            <>
              <IconButton onClick={() => router.push(`/gestion/cuenta`)}>
                <AccountCircleIcon sx={{ color: "white" }} />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
