import { useDispatch } from "react-redux";
import { setMuscleGroups, setMuscles } from "../../redux/slices/selectSlice";
import { MUSCLES, MUSCLE_GROUPS } from "./constants";

const SelectMultipleButton = ({type, option }) => {

    const dispatch = useDispatch();

    const clickHandler = (type) => {
        switch(type) {
            case MUSCLE_GROUPS:
                dispatch(setMuscleGroups(option));
                break;
            case MUSCLES:
                dispatch(setMuscles(option));
                break;
            default: 
                break;
        }
    }

    return (
        <button 
            onClick={() => clickHandler(type)}
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
            {option}
        </button>

    )
}

export default SelectMultipleButton;