import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi'
import { IoReload } from 'react-icons/io5'
import { IoTrashOutline } from 'react-icons/io5'
import './ExerciseCard.scss'

const ExerciseCard = ({exercise_name}) => {
    const [open, setOPen] = useState(false);

    const handleIconClick = (event) => {
        // Handle icon click event
        event.stopPropagation();

      }
    const toggle = () => {
        setOPen(!open);
      };

    return (
        <div style={{paddingBottom: "0.5rem"}}>
            <div className='exercise-card' onClick={toggle}>
                <div className='exercise-card__left-container'>
                    <FiChevronDown  size={28} className={`exercise-card__chevron  exercise-card__chevron${open ? "__open" : "__closed"}`}/>
                    <p>{exercise_name}</p>
                </div>
                <div className='exercise-card__right-container' onClick={handleIconClick}>
                <IoReload size={28} className='exercise-card__reload'/>
                <IoTrashOutline size={28} className='exercise-card__trash'/>
                
                </div>
            </div>
            {open && <div>additional exercise info</div>}
           
            
        </div>
    );
}


export default ExerciseCard;