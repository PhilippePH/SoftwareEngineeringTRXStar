import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMuscleGroups, setMuscles } from "../../redux/slices/selectSlice";
import { MUSCLES, MUSCLE_GROUPS } from "./constants";
import {TiTick} from "react-icons/ti"
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
        <button className= {selected? "multi-button-selected":"multi-button-unselected"}
            onClick={() => clickHandler(type)}
            style={{ display: "flex", textAlign:"center" }}
            // style={{backgroundColor: selected? "":"whitesmoke"}}
            >
            <div className= "button-text-wrapper">
                <div className="tick-wrapper"/>
                <div className="multi-button-text">
                    {option}
                </div>
                <div className = "tick-wrapper">
                    {selected && <TiTick className = "tick-icon"/>}
                </div>
                
            </div>
           
        </button>
    )
}

export default SelectMultipleButton;