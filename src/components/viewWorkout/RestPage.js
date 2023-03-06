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

const RestPage = ({ nextVideo, prevVideo, restData, nextExerciseName, counter, totalWorkoutLength}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isPlaying, setIsPlaying] = useState(true);

    const endWorkout = () => {
        dispatch(setNavDirection("forwards")); // what does this line do?
        navigate(`/end`);
      }
    
    const backToPlaylist = () => {
        navigate(`/playlist`);
    }

    const fastForward = () => {

    }

    const rewind = () => {
        
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
                    <Timer onTimeout={nextVideo} restData = {restData} fastForward={fastForward} rewind={rewind}/>
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
                    <MdOutlineReplay10 className="rest-controls__icon"/>
                    {
                        isPlaying ?
                        <FaPause  className="rest-controls__icon"/>
                        :
                        <FaPlay  className="rest-controls__icon"/>
                    }
                    <MdForward10 className="rest-controls__icon"/>
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
