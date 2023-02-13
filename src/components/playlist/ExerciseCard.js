import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi'
import { BsThreeDots } from 'react-icons/bs'
import { RiTimerLine } from 'react-icons/ri'



import './index.scss'

const ExerciseCard = () => {
    const [open, setOPen] = useState(false);

    const toggle = () => {
        setOPen(!open);
      };

    return ( 
        <>
    
            <div className='exercise-card'>
                <div className='exercise-card__left-container'>
                    <FiChevronDown onClick={toggle} size={28} className={`exercise-card__chevron exercise-card__chevron__${open ? "open" : "closed"}`}/>
                    <p>Exercise name</p>
                </div>
                <BsThreeDots size={28} className='exercise-card__three-dots'/>
            </div>
            {open && <div className='card'>Information</div>}
            <div className='rest-card'>
                <RiTimerLine size={28} />
                <p className='rest-card__text'>30s rest</p>
            </div>
        </>
    );
}

export default ExerciseCard;