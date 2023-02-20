import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { DIFFICULTY } from "../utils/constants";
import "./FinishedPage.scss"
//import { GiFinishLine } from "react-icons/gi";
import bicep from "../../assets/bicep.png";

const FinishedWorkout = () => {
    const [width, setWidth] = useState(window.innerWidth);
    // const navigate = useNavigate();
    // const clickHandler = () => {
    //     navigate(`/select/${DIFFICULTY}`); // This will add workout to cache
    // }
    useEffect(() => { // Resizes the webpage
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    return (
        <div >
            <ul className='finish-page__container'>
                <div className='finish-page__congrats-text'>
                    Good job !
                </div>
               
                <img
                    className="finish-page__image"
                    src={bicep}
                    alt={"bicep"}
                />

                <div className="enjoy-text">
                    Enjoyed your workout?
                </div>

                <button className='button'
                    // TO DO -- SAVE TO CACHE
                    //key={FinishedWorkout} 
                    //onClick={()=>clickHandler()} // Adds workout to cache
                    >
                    <p className="button-text">
                        Save Workout
                    </p>
                </button>
                </ul>
        </div>
    )
}

export default FinishedWorkout;


