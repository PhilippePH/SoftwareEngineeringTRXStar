import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { IoReload } from 'react-icons/io5';
import { IoTrashOutline } from 'react-icons/io5';
import './ExerciseCard.scss';
import cn from "classnames";
import { useRef } from 'react';

const CLOSED_HEIGHT = 50;
const OPENED_HEIGHT = 120;

export default function ExerciseCard({ exercise_name, duration, sets, intensity }) {
    const [isOpen, setOPen] = useState(false);
    const outerHeight = useRef(CLOSED_HEIGHT);
    const containerRef = useRef(null);


    const toggle = () => {
        if (!isOpen) {
            outerHeight.current = OPENED_HEIGHT;
        }
        setOPen(!isOpen);
    };

    const handleIconClick = (event) => {
        // Handle icon click event
        event.stopPropagation();
    }

    return (
        <div style={{ paddingBottom: "0.5rem" }}>
            <div onClick={toggle}
                ref={containerRef}
                className={cn("custom-container", {
                    open: isOpen,
                    closed: !isOpen
                })}
                style={{
                    //height:  isOpen ? '20vh' : '10vh',
                    //minHeight: isOpen ? outerHeight.current-20 : CLOSED_HEIGHT-10,
                    //maxHeight: isOpen ? outerHeight.current : CLOSED_HEIGHT
                    minHeight: isOpen ? outerHeight.current : CLOSED_HEIGHT
                }}>
                <div

                >
                    <div className='exercise-card'>

                        <div className='exercise-card__left-container'>
                        <FiChevronDown size={28} className= {`exercise-card__chevron  exercise-card__chevron${isOpen ? "__open" : "__closed"}`}/> 
                            <div className='exercise-card__exercise-name'>
                                {exercise_name}


                            </div>

                        </div>

                        <div className='exercise-card__right-container' >
                            
                            <IoReload size={28} className='exercise-card__reload' onClick={handleIconClick}/>
                            <IoTrashOutline size={28} className='exercise-card__trash' onClick={handleIconClick}/>
                        </div>


                    </div>
                    <div className='additional-info'>

                        <div> Duration: {duration}s per set</div>
                        <div> Sets: {sets} </div>
                        <div> Total Duration: {sets*duration}s</div>


                    </div>
                </div>

            </div>
        </div>
    );
}