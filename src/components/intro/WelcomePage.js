import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const navigate = useNavigate();
    const clickHandler = () => {
        navigate("/select/difficulty");
    }

    return (
        <div>
            <ul>
                <button key={Welcome} onClick={()=>clickHandler()}>
                    Start Your Workout
                </button>
            </ul>
        </div>
    )
}

export default Welcome;
