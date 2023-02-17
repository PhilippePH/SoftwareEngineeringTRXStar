import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi'
import { BsThreeDots } from 'react-icons/bs'
import { RiTimerLine } from 'react-icons/ri'
import './ExerciseCard.scss'

const ExerciseCard = ({exercise_name}) => {
    const [open, setOPen] = useState(false);

    const toggle = () => {
        setOPen(!open);
      };

    return (
        <div style={{paddingBottom: "0.5rem"}}>
            <div className='exercise-card' >
                <div className='exercise-card__left-container'>
                    <FiChevronDown onClick={toggle} size={28} className={`exercise-card__chevron  exercise-card__chevron${open ? "__open" : "__closed"}`}/>
                    <p>{exercise_name}</p>
                </div>
                <BsThreeDots size={28} className='exercise-card__three-dots'/>
            </div>
            {open && <div>additional exercise info</div>}
           
            
        </div>
    );
}

export default ExerciseCard;