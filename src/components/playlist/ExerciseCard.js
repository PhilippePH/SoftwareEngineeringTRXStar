import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { IoReload } from 'react-icons/io5';
import { IoTrashOutline } from 'react-icons/io5';
import './ExerciseCard.scss';
import cn from "classnames";
import {useRef} from 'react';

const CLOSED_HEIGHT = 50;
const OPENED_HEIGHT = 100;

export default function ExerciseCard({exercise_name, duration, sets, intensity}) {
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
        <div style={{paddingBottom: "0.5rem"}}>
        <div className='container'>
            <form 
                onClick={toggle}
                ref = {containerRef}
                className = {cn("exercise-card", {
                    open: isOpen,
                    closed: !isOpen
                })}
                style={{
                    minHeight: isOpen ? outerHeight.current : CLOSED_HEIGHT,
                    width:"100%"
                }}    
            >   
            <div className='exercise-card__left-container'>
                <FiChevronDown  size={28} className={`exercise-card__chevron  exercise-card__chevron${isOpen ? "__open" : "__closed"}`}/>
                <div className='exercise-card__exercise-name'>
                    <p>{exercise_name} </p>

                    <div className='exercise-card__additional-info'>
                       
                        <span> Duration: {duration}s per set</span>
                        <br/>
                        <span> Sets: {sets} </span>
                        <br/>
                        {/*<span> Intensity: {intensity} </span>*/}
                      
                        
                    </div>
                </div>
                
            </div>
            
            <div className='exercise-card__right-container' onClick={handleIconClick}>
                <IoReload size={28} className='exercise-card__reload'/>
                <IoTrashOutline size={28} className='exercise-card__trash'/> 
            </div>

            
            </form>
        </div>
        </div>
    );
}