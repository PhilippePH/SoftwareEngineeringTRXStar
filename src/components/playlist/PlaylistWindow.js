import React from 'react';
import './ExerciseCard';
import ExerciseCard from './ExerciseCard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlay } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { TfiReload } from "react-icons/tfi"
import { increaseVersion, setNavDirection } from "../../redux/slices/selectSlice"
import { store } from "../../redux/store"
import Playlist from './Playlist';
import { ThreeDots } from 'react-loader-spinner'
import { MUSCLE_GROUPS } from '../utils/constants';
import './playlist.scss'

const fadeIn = `
    @keyframes fade-in {
        0%   { opacity: 0; }
        50%  { opacity: 0; }
        100% { opacity: 1; }
}`;

const PlaylistWindow = ({ indexedDB }) => {

    const [key, setKey] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const playlist = useSelector((state) => (state.playlist.playlistData));
    const version = useSelector((state) => (state.select.version));

    function convertMuscleList(array) {
        //console.log("Array", array)
        var list = [] //array.muscles
        for(var i = 0; i< array.muscles.length; i++)
        {
            if (i+1 == array.muscles.length)
            list += (array.muscles[i].charAt(0).toUpperCase() + array.muscles[i].slice(1))
            else {
                list += (array.muscles[i].charAt(0).toUpperCase() + array.muscles[i].slice(1))
                list += ", "
            }
        }
        return list; 
    }

    useEffect(() => {
        setIsLoading(false);
    }, [playlist])

    const handleIncreaseVersion = () => {
        setIsLoading(true);
        store.dispatch(increaseVersion());
        setKey(key + 1);
    };

    return (

        <>
            <Playlist indexedDB={indexedDB} key={key}/>
            <div className='playlist-window'>
                <div 
                    className='playlist-window__container'>
                    {isLoading ? (
                        <div className='playlist-window__load'>
                            <ThreeDots
                                height="80"
                                width="80"
                                radius="9"
                                color="black"
                                ariaLabel="three-dots-loading"
                                visible={true}
                            />
                        </div>) :
                        <>
                            <div className='playlist-window__heading'>Workout {version}</div>
                            <div className = "playlist-window__parent">
                                {playlist.map((work, index) => {

                                    if (index == 0)
                                        return;

                                    if (playlist[index].type == "warmup") {
                                        return (
                                            <ExerciseCard exercise_name='Warmup' 
                                                duration={playlist[index].time} 
                                                sets='1' time='300' ind={index} />
                                        )
                                    }
                                    else if (playlist[index].type == "cooldown") {
                                        return (
                                            <ExerciseCard exercise_name='Cooldown' 
                                                duration={playlist[index].time} 
                                                sets='1' time='300' ind={index} />
                                        )
                                    }
                                    else if (index + 1 < playlist.length && playlist[index + 1].type == "rest") {
                                        return (
                                            <ExerciseCard exercise_name={playlist[index].exercise_name}
                                                duration={playlist[index].time} 
                                                sets={playlist[index].sets} 
                                                time={playlist[index].rest_set} 
                                                ind={index} 
                                                muscle_types = {convertMuscleList(playlist[index])} 
                                                size = {playlist.length} 
                                                no_warmup = {playlist[1].type != "warmup" } 
                                                no_cooldown = {playlist[playlist.length-1].type != "cooldown"} />
                                        )
                                    }

                                    else if (playlist[index].type == "exercise") {
                                        return (
                                            <ExerciseCard exercise_name={playlist[index].exercise_name} 
                                                duration={playlist[index].time}
                                                sets={playlist[index].sets} 
                                                time={playlist[index].rest_set} 
                                                rest_time={playlist[index].rest_set} 
                                                ind={index} 
                                                muscle_types = {convertMuscleList(playlist[index])} 
                                                size = {playlist.length} 
                                                no_warmup = {playlist[1].type != "warmup" } 
                                                no_cooldown = {playlist[playlist.length-1].type != "cooldown"} />
                                        )
                                    }
                                    else {
                                        return (
                                            <ExerciseCard 
                                                exercise_name={playlist[index].time + "s rest"} 
                                                type = {playlist[index].type} 
                                                ind = {index} size = {playlist.length} />
                                        )
                                    }
                                })}
                            </div>
                        </>
                    }
                </div>
                <div
                    className='playlist-window__bar'>
                    <style children={fadeIn} /> 
                    <IoIosArrowBack 
                        className="playlist-window__bar__button"
                        style={{fontSize:"50px"}}
                        onClick={() => {dispatch(setNavDirection("backwards")) && navigate(`/select/${MUSCLE_GROUPS}`)}} />
                    <TfiReload
                        className = "playlist-window__bar__button"
                        onClick={handleIncreaseVersion} />
                    <FaPlay
                        className = "playlist-window__bar__button"
                        onClick={() => { navigate("/youtube") }}
                    />
                </div>
            </div>
        </>
    );

}
export default PlaylistWindow;