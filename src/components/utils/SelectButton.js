import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDifficulty, setDuration, setFocus, setMuscleGroups, setMuscles } from "../../redux/slices/selectSlice";
import { DIFFICULTY, DURATION, FOCUS } from "./constants";
import './style.scss';


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
            className='button'
            onClick={()=>clickHandler(type)}>
            <p className="button-text">
                {option}
            </p>
        </button>
    )
}

export default SelectButton;