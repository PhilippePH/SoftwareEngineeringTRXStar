import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDifficulty, setDuration, setFocus, setMuscleGroups, setMuscles } from "../../redux/slices/selectSlice";
import { DIFFICULTY, DURATION, FOCUS, MUSCLES, MUSCLE_GROUPS } from "./constants";

const reduxFunctions = {
    [DIFFICULTY]: setDifficulty,
    [FOCUS]: setFocus,
    [DURATION]: setDuration,
    [MUSCLE_GROUPS]: setMuscleGroups,
    [MUSCLES]: setMuscles
}

const SelectButton = ({type, option, to}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const clickHandler = (type) => {
        switch(type) {
            case DIFFICULTY:
                dispatch(setDifficulty(option));
                break;
            case FOCUS:
                dispatch(setFocus(option));
                break;
            case DURATION:
                dispatch(setDuration(option));
                break;
            default: 
                break;
        }
        navigate(to);
    }

    return (
        <button 
            onClick={()=>clickHandler(type)}
            style={{
                width: "8rem",
                paddingTop: "0.5rem",
                paddingbottom: "0.5rem",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                margin: "1rem",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: "yellow",
                border: "1px solid black",
                borderRadius: "8px"
            }}
        >
            <p
                style={{
                    fontSize: "1rem"
                }}
            >
                {option}
            </p>
        </button>
    )
}

export default SelectButton;