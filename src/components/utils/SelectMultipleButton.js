import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMuscleGroups, setMuscles } from "../../redux/slices/selectSlice";
import { MUSCLES, MUSCLE_GROUPS } from "./constants";
import './style.scss';

// const selectedStyle = {
//     backgroundColor: "yellow",
//     border: "1px solid black",
// };
// const unselectedStyle = {
//     backgroundColor: "blue",
//     border: "1px solid black",
// };

const SelectMultipleButton = ({type, option, width, height, fontSize}) => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(false);

    const {
        muscleGroups,
        muscles
    } = useSelector((state) => (state.select))

    const clickHandler = (type) => {
        switch(type) {
            case MUSCLE_GROUPS:
                dispatch(setMuscleGroups(option));
                setSelected(!selected);
                break;
            case MUSCLES:
                dispatch(setMuscles(option));
                setSelected(!selected);
            
                break;
            default: 
                break;
        }
    }

    useEffect(() => {
        switch(type) {
            case MUSCLE_GROUPS:
                if (muscleGroups.includes(option)) {
                    setSelected(!selected);
                }
                break;
    
            case MUSCLES:
                if (muscles.includes(option)) {
                    setSelected(!selected);
                }
                break;
            default:
                break;
        }
    },[])

    return (
        <button className='multi-button'
            onClick={() => clickHandler(type)}
            style={{backgroundColor: selected? "":"whitesmoke"}}>
            <p className="button-text">
                {option}
            </p>
        </button>
    )
}

export default SelectMultipleButton;