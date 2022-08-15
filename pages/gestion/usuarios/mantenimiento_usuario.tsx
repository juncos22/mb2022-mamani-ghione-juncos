
import axios from "axios";
import { useRouter } from "next/router";
import { Layout } from "../../../components/layout";


export default function MantenimientoUsuario({ usuarios }) {
    const router = useRouter()
    return (
        <Layout>
            <h3 className="text-center mt-1">Mantenimiento de Usuarios</h3>
            <button className="btn btn-primary m-2" onClick={() => router.push('nuevo')}>Nuevo Usuario</button>
            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1"></i>
                    Usuarios del Sistema
                </div>
                <div className="card-body">
                    <table id="datatablesSimple" className="table table-active">
                        <thead>
                            <tr>
                                <th>Dni</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Direccion</th>
                                <th>Telefono</th>
                                <th>Localidad</th>
                                <th>Rol</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Dni</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Direccion</th>
                                <th>Telefono</th>
                                <th>Localidad</th>
                                <th>Rol</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {
                                usuarios && usuarios.map((u: any, i: number) => (
                                    <tr key={i}>
                                        <td>{u.dni}</td>
                                        <td>{u.nombre}</td>
                                        <td>{u.apellido}</td>
                                        <td>{u.direccion}</td>
                                        <td>{u.telefono}</td>
                                        <td>{u.localidad}</td>
                                        <td>{u.rol?.tipo}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps = async () => {
    const res = await axios.get('http://localhost:3000/api/gestion/usuarios')
    console.log(res.data);
    const usuarios = res.data
    return {
        props: {
            usuarios
        }
    }
}