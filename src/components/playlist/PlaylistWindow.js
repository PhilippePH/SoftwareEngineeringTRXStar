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
                        playlist.map((work, index) => {
                            if (playlist[index].type == "cooldown")
                            return (
                                <ExerciseCard exercise_name='Cooldown' />
                            )
                            while ((index+1) < playlist.length) {
                                if (playlist[index+1].type == "rest"){
                                    return (<ExerciseCard exercise_name={playlist[index].exercise_name} />)
                                }
                                else if (playlist[index].type == "exercise") {
                                    return (
                                        <div>
                                            <ExerciseCard exercise_name={playlist[index].exercise_name} />
                                            <RestCard time={playlist[index].rest_set} />
                                        </div>


                                    )
                                }
                                else if (playlist[index].type == "warmup")
                                    return (

                                        <ExerciseCard exercise_name='Warmup' />
                                    )
                                
                                else
                                    return (
                                        <RestCard time={playlist[index].time} />
                                    )
                            }
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