import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { DIFFICULTY } from "../utils/constants";
import "./FinishedPage.scss"
//import { GiFinishLine } from "react-icons/gi";
import bicep from "../../assets/bicep.png";
import SaveModal from "./SaveModal";

const FinishedWorkout = ({ indexedDB }) => {

    const [width, setWidth] = useState(window.innerWidth);
    const [show, setShow] = useState(false);
    const [ buttonText, setButtonText ] = useState("Save Workout");
    const handleClose = () => setShow(false);

    useEffect(() => { // Resizes the webpage
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    return (
        <div className='finish-page'>
            <SaveModal
                show={show}
                unshow={handleClose}
                setButtonText={setButtonText}
                indexedDB={indexedDB}/>
            <ul className='finish-page__container'>
                <div className='finish-page__congrats-text'>
                    Good Job!
                </div>
               
                <img
                    className="finish-page__image"
                    src={bicep}
                    alt={"bicep"}
                />

                <div className="finish-page__enjoy-text">
                    Enjoyed your workout?
                </div>

                <button 
                    className='finish-page__button' 
                    onClick={() => setShow(true)}>
                    <p className="finish-page__button-text">
                        {buttonText}
                    </p>
                </button>
            </ul>
        </div>
    )
}

export default FinishedWorkout;


