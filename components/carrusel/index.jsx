import Carousel from "react-material-ui-carousel"
import { Item } from "./itemCarrusel"
export default function Carrusel({ imagenes = [] }) {
    return (
        <Carousel autoPlay indicators swipe fade navButtonsAlwaysVisible sx={{minWidth: '280px'}}>
            {
                imagenes.map((img, i) => (<Item key={i} portada={img} />))
            }
        </Carousel>
    )
}