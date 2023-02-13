import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DIFFICULTY } from "../utils/constants";
import './styles.scss';

const Youtube = () => {

   

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            
        }}>
            <div>
                

            </div>




            <iframe width="900" height="800" src="https://www.youtube.com/embed/4ZR25UheGpA?autoplay=1&start=30&end=40" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
    )
}

export default Youtube;