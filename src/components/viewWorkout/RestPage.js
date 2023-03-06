import { useState } from 'react';
import Timer from './Timer';
import './RestPage.scss'
import BasicButton from './BasicButton';
import WorkoutProgress from "./WorkoutProgress";
import { useDispatch } from "react-redux";
import { setNavDirection } from "../../redux/slices/selectSlice";
import { useNavigate } from "react-router-dom";
import { FaForward, FaBackward, FaPause, FaPlay, FaStepForward, FaStepBackward } from "react-icons/fa";
import { MdForward10, MdOutlineReplay10 } from "react-icons/md";

const RestPage = ({ nextVideo, prevVideo, restData, nextExerciseName, counter, totalWorkoutLength }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [timeLeft, setTime] = useState(restData.time);
    const [isPlaying, setIsPlaying] = useState(true);

    const fastForward = () => {
        setTime(Math.min(restData.time, timeLeft+10));
    }

    const rewind = () => {
        setTime(Math.max(0,timeLeft-10));
    }

    const pauseTimer = () => {
        setIsPlaying(false);
    }

    const playTimer = () => {
        setIsPlaying(true);
    }

    const endWorkout = () => {
        navigate(`/end`);
      }
    
    const backToPlaylist = () => {
        navigate(`/playlist`);
    }

    return (
        <>
        <div className='larger-container-rest'>
            <div className='container-rest'>
            <div className='container-rest__progress-bar'> 
                <WorkoutProgress completed={(Math.floor((counter/totalWorkoutLength)*100))} />
            </div>
            <div className="container-rest__message-black1">
                </div>
                <div className="container-rest__message-black1">
                    Rest
                </div>
                <div className='container-rest__timer-div'>
                    <Timer fastForward={fastForward} rewind={rewind} isPlaying={isPlaying} timeLeft={timeLeft} setTime={setTime} onTimeout={nextVideo} restData = {restData}/>
                </div>
                <div className="container-rest__message-black2">
                    Next up:
                </div>
                <div className="container-rest__message-yellow">
                    {nextExerciseName}
                </div>
                <div className="rest-controls">
                    <FaStepBackward onClick={backToPlaylist} className="rest-controls__icon"/>
                    <FaBackward onClick={prevVideo} className="rest-controls__icon"/>
                    <MdOutlineReplay10 onClick={rewind} className="rest-controls__icon"/>
                    {
                        isPlaying ?
                        <FaPause onClick={pauseTimer} className="rest-controls__icon"/>
                        :
                        <FaPlay onClick={playTimer} className="rest-controls__icon"/>
                    }
                    <MdForward10 onClick={fastForward} className="rest-controls__icon"/>
                    <FaForward onClick={nextVideo} className="rest-controls__icon"/>
                    <FaStepForward onClick={endWorkout} className="rest-controls__icon"/>
                </div>
                <div
                    className="button-div">
                    <BasicButton
                        option={"Next exercise"}
                        next={nextVideo}
                    />
                </div>
                </div>
            </div>
        </>
    )
}

export default RestPage;