import React from 'react';
import './ExerciseCard';
import ExerciseCard from './ExerciseCard';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RestCard from './RestCard';
import { FaPlay } from "react-icons/fa";
import './PlaylistWindow.scss';
import NavButtons from '../utils/NavButtons'

import './PlaylistWindow.scss'

const PlaylistWindow = () => {

    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    const playlist = useSelector((state) => (state.playlist.playlistData));

    return (
        <div>
            
            <div className='playlist-window'>
                

                <div className='playlist-window__container'>
                    
                    <div className='workout-heading'>WORKOUT 1</div>
                    <div>
                        {
                            playlist.map((work, index) => {
                                if (index + 1 < playlist.length && playlist[index + 1].type == "rest") {
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
                                else if (playlist[index].type == "cooldown")
                                    return (
                                        <ExerciseCard exercise_name='Cooldown' />
                                    )
                                else
                                    return (
                                        <RestCard time={playlist[index].time} />
                                    )

                            })

                        }
                    </div>
                </div>

            </div>
            <div
                style={{
                    display: "flex",
                    placeItems: "center",
                    justifyContent: "center",
                    paddingTop: "2%",
                    alignItems: "center",
                }}>
                <FaPlay
                    style={{
                        // borderRadius: "8px"
                        fontSize: "50px",
                        cursor: "pointer"
                    }}
                    onClick={() => { navigate("/youtube") }}
                />
                
            </div>
            
        </div>
    );

}
export default PlaylistWindow;