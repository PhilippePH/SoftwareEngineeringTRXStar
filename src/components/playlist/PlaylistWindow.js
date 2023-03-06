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
import { increaseVersion } from "../../redux/slices/selectSlice"
import { store } from "../../redux/store"
import './PlaylistWindow.scss'
import Playlist from './Playlist';
import { ThreeDots } from 'react-loader-spinner'


const PlaylistWindow = ({ indexedDB }) => {

    const [count, setCount] = useState(0);
    const [key, setKey] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const playlist = useSelector((state) => (state.playlist.playlistData));
    const version = useSelector((state) => (state.select.version));


    useEffect(() => {
        setIsLoading(false);
    }, [playlist])


    const handleIncreaseVersion = () => {
        setIsLoading(true);
        store.dispatch(increaseVersion());
        setKey(key + 1);
    };

    return (

        <div>
            <Playlist indexedDB={indexedDB} key={key} />

            <div className='playlist-window'>


                <div className='playlist-window__container'>
                    {isLoading ? (
                        <div style=
                        {{ display: 'flex',
                         justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                          paddingBottom: '30px' }}>
                            <ThreeDots
                                height="80"
                                width="80"
                                radius="9"
                                color="black"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClassName=""
                                visible={true}
                            />
                        </div>
                    ) :
                        // Add your other content here


                        <><div className='workout-heading'>WORKOUT {version}</div><div>
                            {playlist.map((work, index) => {

                                if (playlist[index].type == "warmup")
                                    return (

                                        <ExerciseCard exercise_name='Warmup' duration={playlist[index].time} sets='1' time='300' ind={index} />
                                    )
                                else if (playlist[index].type == "cooldown")
                                    return (
                                        <ExerciseCard exercise_name='Cooldown' duration={playlist[index].time} sets='1' time='300' ind={index} />
                                    )

                                else if (index + 1 < playlist.length && playlist[index + 1].type == "rest") {
                                    return (<ExerciseCard exercise_name={playlist[index].exercise_name}
                                        duration={playlist[index].time} sets={playlist[index].sets} time={playlist[index].rest_set} ind={index} />)
                                }


                                else if (playlist[index].type == "exercise") {
                                    return (
                                        <div>
                                            <ExerciseCard exercise_name={playlist[index].exercise_name} duration={playlist[index].time}
                                                sets={playlist[index].sets} time={playlist[index].rest_set} rest_time={playlist[index].rest_set} ind={index} />
                                        </div>


                                    );
                                }
                                else
                                    return (
                                        <RestCard time={playlist[index].time} />
                                    );
                                    

                            })}

                        </div></>
                    }
                </div>

            </div>
            <div
                style={{
                    display: "flex",
                    placeItems: "center",
                    justifyContent: "center",
                    paddingTop: "2%",
                    alignItems: "center",
                    gap: '20%',
                }}>
                <TfiReload
                    style={{
                        // borderRadius: "8px"
                        fontSize: "40px",
                        cursor: "pointer"
                    }}
                    onClick={handleIncreaseVersion} />
                <FaPlay
                    style={{
                        // borderRadius: "8px"
                        fontSize: "40px",
                        cursor: "pointer"
                    }}
                    onClick={() => { navigate("/youtube") }}
                />


            </div>

        </div>
    );

}
export default PlaylistWindow;