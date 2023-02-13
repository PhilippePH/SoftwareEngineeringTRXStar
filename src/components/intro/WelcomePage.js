import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DIFFICULTY } from "../utils/constants";

const Welcome = () => {
    const navigate = useNavigate();
    const clickHandler = () => {
        navigate(`/select/${DIFFICULTY}`);
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
        }}>
            <ul>
                <button key={Welcome} onClick={()=>clickHandler()}>
                    Start Your Workout
                </button>
                
            </ul>
        </div>
    )
}

export default Welcome;
