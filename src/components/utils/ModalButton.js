import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLinkClickHandler } from "react-router-dom";
import { setMuscleGroups, setMuscles } from "../../redux/slices/selectSlice";
import { MUSCLES, MUSCLE_GROUPS } from "./constants";
import './style.scss'


const ModalButton = ({showModal, text}) => {

    const [selected, setSelected] = useState(false);

    const {
        muscleGroups
    } = useSelector((state) => (state.select))


    useEffect(() => {
        if (muscleGroups.length != 0) {
            setSelected(true);
        }
        else {
            setSelected(false);
        }
    },[muscleGroups])

    const clickHandler = () => {
        if (selected) {
            showModal(true);
        }
    }

    return (
        <button 
            className="small-button"
            style={{backgroundColor: selected? "":"whitesmoke"}}
            onClick={()=>clickHandler()}>
            {text}
        </button>
    )
}

export default ModalButton