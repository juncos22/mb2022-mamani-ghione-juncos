import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAuth } from '../components/context/authUserProvider'
import { Layout } from '../components/layout'
import TarjetaNovedades from '../components/tarjeta_noticias'
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from 'next/router'
import { Grid, Pagination, Box } from "@mui/material";
import { usePagination } from '../components/hooks/paginationHook'
import { Container } from '@mui/system'

const Home = () => {
  const [noticias, setNoticias] = useState()
  const [pagina, setPagina] = useState(1)
  const pageSize = 5
  const cantidadPaginas = Math.ceil(noticias?.length / pageSize)
  const paginacion = usePagination(noticias || [], pageSize)
  const { authUser } = useAuth()
  const router = useRouter()

  const handlerCambioPagina = (e, pagina) => {
    setPagina(pagina)
    paginacion.saltar(pagina)
  }

  const traerNoticias = () => {
    axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/noticias_novedades`)
      .then(res => {
        if (res.data) {
          console.log(res.data);
          setNoticias(res.data)
        }
      }).catch(err => {
        console.error(err);
      })
  }

  useEffect(() => {
    traerNoticias()
  }, [])

  return (
    <Layout>
      <div style={{marginTop: "20px", marginBottom: "20px"}}>
      {
        authUser && (
          <Button variant="outlined" startIcon={<AddIcon />} onClick={() => router.push('/gestion/noticias/agregar_noticias')}>
            Agregar
          </Button>
        )
      }
      <Box sx={{ flexGrow: 1 }}>
        <Grid container >
          {
            paginacion.dataActual().map((n, i) => (
              <Grid item key={i} xs="auto">
                <TarjetaNovedades id={n.id} titulo={n.titulo} descripcion={n.descripcion} url={n.url} />
              </Grid>
            ))
          }
        </Grid>
      </Box>

   
      {
        noticias && noticias.length > 0 && (
          <Container maxWidth={'lg'} sx={{ marginTop: 3 }}>
            <Pagination
              count={cantidadPaginas}
              size='large'
              page={pagina}
              variant="outlined"
              shape='circular'
              onChange={handlerCambioPagina} />
          </Container>
        )
      }
      </div>
    </Layout>
  )
}

export default Home