import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import { BsHourglassSplit } from 'react-icons/bs';
import {BsArrowCounterclockwise} from 'react-icons/bs';
import './ExerciseCard.scss';
import cn from "classnames";
import { useRef } from 'react';


const CLOSED_HEIGHT = 50;
const OPENED_HEIGHT = 110;

export default function ExerciseCard({ exercise_name, duration, sets, time }) {
    const [isOpen, setOPen] = useState(false);
    const outerHeight = useRef(CLOSED_HEIGHT);
    const containerRef = useRef(null);
    var remaining_secs = (sets*duration+(time*(sets-1)))%60;

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
                            
                            <BsArrowCounterclockwise size={28} className='exercise-card__reload' onClick={handleIconClick}/>
                            <BsTrash size={28} className='exercise-card__trash' onClick={handleIconClick}/>
                        </div>


                    </div>
                    <div className='additional-info'>

                        <div className='info-container'> Duration: {duration}s per set</div>
                        <div className='info-container'> Sets: {sets} </div>
                        <div className='info-container'> {Math.floor((sets*duration+(time*(sets-1)))/60)}:{remaining_secs<10?'0':''}{remaining_secs} <BsHourglassSplit size={28}/></div>


                    </div>
                </div>

            </div>
        </div>
    );
}