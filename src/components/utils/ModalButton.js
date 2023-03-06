import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './style.scss'


const ModalButton = ({showModal, text}) => {

    const [selected, setSelected] = useState(false);

    const muscleGroups = useSelector((state) => (state.select.muscleGroups))


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
            style={{color: selected? "black":"darkgray"}}
            onClick={()=>clickHandler()}>
            {text}
        </button>
    )
}

export default ModalButton