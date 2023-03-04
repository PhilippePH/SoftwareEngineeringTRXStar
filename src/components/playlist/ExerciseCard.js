import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import { BsHourglassSplit } from 'react-icons/bs';
import {BsArrowCounterclockwise} from 'react-icons/bs';
import './ExerciseCard.scss';
import cn from "classnames";
import { useRef } from 'react';
import {BsChevronRight} from 'react-icons/bs';
import RestCard from './RestCard';
import { getClip } from '../../scripts/algorithm';
import { inputToPlaylist, removeFromPlaylist } from "../../redux/slices/playlistSlice.js"
import { store } from "../../redux/store"
import playlistToClipList from '../../scripts/playlistToClipList';
import { filterOnKey } from '../../scripts/algorithm';


const CLOSED_HEIGHT = 50;
const OPENED_HEIGHT = 115;

export default function ExerciseCard({ exercise_name, duration, sets, time, rest_time, ind }) {
    const [isOpen, setOPen] = useState(false);
    const outerHeight = useRef(CLOSED_HEIGHT);
    const containerRef = useRef(null);
    var remaining_secs = (sets*duration+(time*(sets-1)))%60;
    const [key, setKey] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isSlidingIn, setIsSlidingIn] = useState(false);

    const slideIn = (event) => {
        //event.stopPropagation();
        setIsSlidingIn(true);
        //cb();
    };

    const fadeOut = (event) => {
        //event.stopPropagation();
        setIsFadingOut(true);
        //cb();
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

    const handleReplace = (event) => {
        event.stopPropagation();
        slideIn(); 
            let clip = getClip(indexedDB, "exercise", time, 1).then(
                async function (clip) {
                    var video_of_clip = filterOnKey("video", clip.video_ID, indexedDB, "ExerciseDatabase", 1).then(
                        async function (video_of_clip) {
                            var clip_formatted = {
                                "type": "exercise",
                                "exercise_name": clip.exercise_name,
                                "time": duration,
                                "sets": sets,
                                "rest_set": rest_time,
                                "intensity": 1,
                                "URL": video_of_clip[0].URL,
                                "start_time": clip.start_time,
                                "end_time": clip.end_time
                            }

                            store.dispatch(inputToPlaylist([clip_formatted, ind]))
                            console.log("Clip_formatted", clip_formatted);
                            
                        })
                    })  
                    setTimeout(() => {
                        setIsSlidingIn(false);
                      }, 1000);
            };

//<div className={isFadingOut ? 'item-fadeout': 'item'}>


    return (
        <div>
            <div>
            <div className={isFadingOut ? 'item-fadeout': (isSlidingIn ? 'slide-in': 'item1')}>
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
                <div>
                    <div
                    className={'exercise-card'}>

                        <div className='exercise-card__left-container'>
                        <BsChevronRight size={28} className={`exercise-card__chevron  exercise-card__chevron${isOpen ? "__open" : "__closed"}`}/> 
                            <div className='exercise-card__exercise-name'>
                                {exercise_name}


                            </div>

                        </div>

                        <div className='exercise-card__right-container' >
                            
                            
                        {exercise_name != "Warmup" &&  exercise_name != "Cooldown" && <BsArrowCounterclockwise size={28} className='exercise-card__reload' onClick={handleReplace}/> }
                             <BsTrash size={28} className='exercise-card__trash' onClick={handleRemoveDiv}/>
                       
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
            {rest_time > 0 && <RestCard time={rest_time} />}
            </div>
        
        </div>

    );
}