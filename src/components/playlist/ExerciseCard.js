import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import { BsHourglassSplit } from 'react-icons/bs';
import {BsArrowCounterclockwise} from 'react-icons/bs';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs'
import './ExerciseCard.scss';
import cn from "classnames";
import { useRef } from 'react';
import {BsFillCaretDownFill} from 'react-icons/bs';
import RestCard from './RestCard';
import { getClip } from '../../scripts/algorithm';
import { inputToPlaylist, removeFromPlaylist, moveUpExercise, moveDownExercise } from "../../redux/slices/playlistSlice.js"
import { store } from "../../redux/store"
import playlistToClipList from '../../scripts/playlistToClipList';
import { filterOnKey } from '../../scripts/algorithm';


const CLOSED_HEIGHT = 50;
const OPENED_HEIGHT = 135;

export default function ExerciseCard({ exercise_name, duration, sets, time, rest_time, ind, muscle_types, size, no_cooldown, no_warmup}) {
    const [isOpen, setOPen] = useState(false);
    const outerHeight = useRef(CLOSED_HEIGHT);
    const containerRef = useRef(null);
    var remaining_secs_duration = (sets*duration+(time*(sets-1)))%60;
    const [key, setKey] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isSlidingIn, setIsSlidingIn] = useState(false);
    const [isSlidingUp, setIsSlidingUp] = useState(false);
    const [isSlidingDown, setIsSlidingDown] = useState(false);
    const [rotate, setRotate] = useState(false);

    const handleClick = () => {
        setRotate(!rotate);
      };

    const slideIn = (event) => {
        setIsSlidingIn(true);
    };

    const slideUp = (event) => {
        setIsSlidingUp(true);
    };

    const slideDown = (event) => {
        setIsSlidingDown(true);
    };

    const fadeOut = (event) => {
        setIsFadingOut(true);
    };
    

    const toggle = () => {
        if (!isOpen) {
            outerHeight.current = OPENED_HEIGHT;
        }
        setOPen(!isOpen);
    };

    const handleRemoveDiv = (event) => {
        event.stopPropagation();
        fadeOut(); 
        setTimeout(() => {
            store.dispatch(removeFromPlaylist(ind));
            setIsFadingOut(false);
          }, 1000);
      };

      const handleMoveDown = (event) => {
        slideDown(); 
        event.stopPropagation();
        setTimeout(() => {
            store.dispatch(moveDownExercise(ind));
            setIsSlidingDown(false);
          }, 1500);
    
        
      };

      const handleMoveUp = (event) => {
        slideUp(); 
        event.stopPropagation();
        setTimeout(() => {
            store.dispatch(moveUpExercise(ind)); 
            setIsSlidingUp(false);
          }, 1500);
        
      };


    const handleReplace = (event) => {
        event.stopPropagation();
        slideIn(); 
            let clip = getClip(indexedDB, "exercise", time, 1).then(
                async function (clip) {
                    //console.log("Clip", clip)
                    var exercise = filterOnKey("exercises", clip.exercise_name, indexedDB, "ExerciseDatabase", 1).then(
                        async function (exercise) {
                            var video_of_clip = filterOnKey("video", clip.video_ID, indexedDB, "ExerciseDatabase", 1).then(
                                async function (video_of_clip) {
                                    //console.log("Exercise", exercise)
                                    //console.log("Exercise muscle", exercise[0].muscle_type)
                                    var clip_formatted = {
                                        "type": "exercise",
                                        "exercise_name": clip.exercise_name,
                                        "time": duration,
                                        "sets": sets,
                                        "muscles": exercise[0].muscle_type,
                                        "rest_set": time,
                                        "intensity": 1,
                                        "URL": video_of_clip[0].URL,
                                        "start_time": clip.start_time,
                                        "end_time": clip.end_time
                                    }

                                    store.dispatch(inputToPlaylist([clip_formatted, ind]))
                                    console.log("Clip_formatted", clip_formatted);

                                })
                    }  )})

                    setTimeout(() => {
                        setIsSlidingIn(false);
                      }, 1000);
            };

//<div className={isFadingOut ? 'item-fadeout': 'item'}>

    const handleClickAndToggle = () => {
    handleClick();
    toggle();
  };
    return (
        <div>
            <div>
            <div className={isFadingOut ? 'item-fadeout': (isSlidingIn ? 'slide-in': (isSlidingUp ? 'flipup': (isSlidingDown ? 'flipdown': 'item1')))}>
                <div className={`custom-container ${isOpen ? 'open' : 'closed'}`}
                style={{ minHeight: isOpen ? outerHeight.current : CLOSED_HEIGHT }}
                onClick={handleClickAndToggle}
                ref={containerRef}>

                <div>
                    <div
                    className={'exercise-card'}>

                        <div className='exercise-card__left-container'>
                        <BsFillCaretDownFill size={20} />
                            <div className='exercise-card__exercise-name'>
                                {exercise_name}


                            </div>

                        </div>

                        <div className='exercise-card__right-container' >

                        {exercise_name != "Warmup" &&  exercise_name != "Cooldown"  && (no_warmup && ind>1 || ind > 2 )  &&
                        <BsArrowUp size={28} className='exercise-card__up' onClick={handleMoveUp} style={{marginRight: '10px', strokeWidth:'0.3'}}/>}
                        {exercise_name != "Warmup" &&  exercise_name != "Cooldown" && (no_cooldown && ind < size - 1 || ind < size - 2 ) &&
                        <BsArrowDown size={28} className='exercise-card__down' onClick={handleMoveDown} style={{marginRight: '10px', strokeWidth:'0.3'}}/> 
                        }
                        {exercise_name != "Warmup" &&  exercise_name != "Cooldown" && 
                        <BsArrowCounterclockwise size={28} className='exercise-card__reload' onClick={handleReplace} style={{marginRight: '10px', strokeWidth:'0.3'}}/> }
                        <BsTrash size={28} className='exercise-card__trash' onClick={handleRemoveDiv} style={{marginRight: '10px', strokeWidth:'0.3'}}/>
                       
                        </div> 


                    </div>
                    <div className='additional-info'>
                        
                
                        
                    {(exercise_name == "Warmup" || exercise_name == "Cooldown")&&<div className='warmup-cooldown-container'> <div><BsHourglassSplit size={28} color='gray'/></div>Total Duration: {Math.floor((sets*duration+(time*(sets-1)))/60)}:{remaining_secs_duration<10?'0':''}{remaining_secs_duration}</div>}
                    {exercise_name != "Warmup" && exercise_name != "Cooldown" && <div className='info-container'> 
                    
                       <div>Work: {Math.floor((duration/60))}:{duration%60<10?'0':''}{duration%60}/set</div>
                         <div> Rest: {Math.floor((time/60))}:{time%60<10?'0':''}{time%60}/set</div>
                        <div>Sets: {sets} </div>
                        </div>}
                       
       
                       

                   
                        {exercise_name != "Warmup" && exercise_name != "Cooldown" &&<div className='info-container'> <div><BsHourglassSplit size={28} color='gray'/></div>Total Duration: {Math.floor((sets*duration+(time*(sets-1)))/60)}:{remaining_secs_duration<10?'0':''}{remaining_secs_duration}</div>}

                        {exercise_name != "Warmup" && exercise_name != "Cooldown" && <div className='info-container'> Muscles: {muscle_types} </div>}   
                   
                    </div>



           
                </div>

            </div>
            </div>
            {rest_time > 0 && <RestCard time={rest_time} />}
            </div>
            </div>

    );
}