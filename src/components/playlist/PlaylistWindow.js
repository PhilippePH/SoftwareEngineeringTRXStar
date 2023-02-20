import React from 'react';
import './ExerciseCard';
import ExerciseCard from './ExerciseCard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RestCard from './RestCard';
import { FaPlay } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi"
import './PlaylistWindow.scss';
import NavButtons from '../utils/NavButtons'
import { increaseVersion } from "../../redux/slices/selectSlice"
import { store } from "../../redux/store"
import './PlaylistWindow.scss'
import Playlist from './Playlist';


const PlaylistWindow = ({ indexedDB }) => {

    const [count, setCount] = useState(0);
    const [key, setKey] = useState(0);
    const navigate = useNavigate();
    const playlist = useSelector((state) => (state.playlist.playlistData));
    const version = useSelector((state) => (state.select.version));



    const handleIncreaseVersion = () => {
        store.dispatch(increaseVersion());
        setKey(key + 1);
    }; 

    return (
        
        <div>
            <Playlist indexedDB={indexedDB} key={key}/>
            
            <div className='playlist-window'>
                

                <div className='playlist-window__container'>
                    
                    <div className='workout-heading'>WORKOUT {version}</div>
                    <div>
                        {
                            playlist.map((work, index) => {
                                if (index + 1 < playlist.length && playlist[index + 1].type == "rest") {
                                    return (<ExerciseCard exercise_name={playlist[index].exercise_name} 
                                        duration={playlist[index].time} sets={playlist[index].sets} intensity={playlist[index].intensity}/>)
                                }



                                else if (playlist[index].type == "exercise") {
                                    return (
                                        <div>
                                            <ExerciseCard exercise_name={playlist[index].exercise_name}  duration={playlist[index].time} 
                                            sets={playlist[index].sets} intensity={playlist[index].intensity} />
                                            <RestCard time={playlist[index].rest_set} />
                                        </div>


                                    )
                                }
                                else if (playlist[index].type == "warmup")
                                    return (

                                        <ExerciseCard exercise_name='Warmup'  duration={playlist[index].time} sets ='1' intensity='N/A'/>
                                    )
                                else if (playlist[index].type == "cooldown")
                                    return (
                                        <ExerciseCard exercise_name='Cooldown'  duration={playlist[index].time} sets ='1' intensity='N/A'/>
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
                    gap: '25%',
                }}>
                <TfiReload
                    style={{
                        // borderRadius: "8px"
                        fontSize: "50px",
                        cursor: "pointer"
                    }}
                    onClick={handleIncreaseVersion}/>
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