import React from 'react'
import './ExerciseCard'
import ExerciseCard from './ExerciseCard';
import NavButtons from '../layout/NavButtons';
import RestCard from './RestCard';
import playlist_to_clipList from './playlist_to_clipList';
import './index.scss'
import { useState } from 'react';
import { useSelector } from 'react-redux';

const PlaylistWindow = () => {
    const [count, setCount] = useState(0);
    const playlist = useSelector((state) => (state.playlist.playlistData));
   

    
    return (
        <div className='playlist-window'>
              
            <div className='playlist-window__container'> 
            <div className='workout-heading'>WORKOUT 1</div>
                <ul>
                    {
                    playlist.map((work, index) =>{
                        /*if (playlist[index+1].type == "rest")
                        return(
                            <ExerciseCard exercise_name={work.exercise_name}/>
                        )*/
                        if (work.type == "exercise"){
                        return (
                            <div>
                            <ExerciseCard exercise_name={work.exercise_name}/>
                            <RestCard time={work.time}/>
                            </div>
                           
                        )}
                        else if (work.type == "warmup" )
                        return(
                            <ExerciseCard exercise_name='Warmup'/>
                        )
                        else if (work.type == "cooldown")
                        return (
                            <ExerciseCard exercise_name='Cooldown'/>
                        )
                        else
                        return (
                            <RestCard time={work.time}/>
                        )
                        
                    })

                    }
                </ul>
            </div>
            <NavButtons
            next="/youtube" />
        </div>
       
    );
                
}
export default PlaylistWindow;