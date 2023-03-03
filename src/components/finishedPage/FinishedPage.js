import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { DIFFICULTY } from "../utils/constants";
import "./FinishedPage.scss"
//import { GiFinishLine } from "react-icons/gi";
import bicep from "../../assets/bicep.png";
import SaveModal from "./SaveModal";
import { useSelector } from "react-redux";

const FinishedWorkout = ({ indexedDB }) => {

    // const [ width, setWidth ] = useState(window.innerWidth);
    const [ show, setShow ] = useState(false);
    const handleClose = () => setShow(false);

    const savedState = useSelector((state) => (state.playlist.playlistSaved));

    // useEffect(() => { // Resizes the webpage
    //     const handleResize = () => setWidth(window.innerWidth);
    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize);
    // }, []);

    return (
        <div className='finish-page'>
            <SaveModal
                show={show}
                unshow={handleClose}
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
                    onClick={() => setShow(true)}
                    disabled={savedState}>
                    <p className="finish-page__button-text">
                        {savedState ? "Saved!" : "Save Workout"}
                    </p>
                </button>
            </ul>
        </div>
    )
}

export default FinishedWorkout;


