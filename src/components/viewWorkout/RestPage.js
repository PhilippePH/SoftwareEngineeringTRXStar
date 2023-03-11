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
import EndWorkoutModal from './EndWorkoutModal';
import BackToPlaylistModal from './BackToPlaylistModal';


// This concerns the rest pages (between youtube pages, where the user rests)
// This includes the format of the page, and the Youtube Control buttons
// The timer is imported from the timer file


const RestPage = ({ nextVideo, prevVideo, restData, nextExerciseName, counter, totalWorkoutLength }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [timeLeft, setTime] = useState(restData.time);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showEndOfWorkoutModal, setShowEndOfWorkoutModal] = useState(false);
    const [showBackToPlaylistModal, setShowBackToPlaylistModal] = useState(false);


    // THOSE ARE THE CONTROL BUTTONS 
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

    // The format of the page
    return (
        <>
        <EndWorkoutModal show={showEndOfWorkoutModal}
                         unshow={() => {
                          if(!isPlaying) {
                            playTimer();
                            setIsPlaying(true);
                          }
                          setShowEndOfWorkoutModal(false)
                          }} endWorkout={endWorkout} />
        <BackToPlaylistModal show={showBackToPlaylistModal}
                         unshow={() => {
                          if(!isPlaying) {
                            playTimer();
                            setIsPlaying(true);
                          }
                          setShowBackToPlaylistModal(false)
                          }} backToPlaylist={backToPlaylist} />
        <div className='progress-bar'> 
            <WorkoutProgress completed={(Math.floor((counter/totalWorkoutLength)*100))} />
        </div>
        
        <div className='container-rest'>
            <div className="container-rest__message-black1">
                Rest
            </div>

            <div className='container-rest__timer-div'>
                <Timer fastForward={fastForward} rewind={rewind} isPlaying={isPlaying} timeLeft={timeLeft} setTime={setTime} onTimeout={nextVideo} restData = {restData}/>
            </div>
            
            <div className="container-rest__message-black2">
                Next up:
                <div className="container-rest__message-black2__message-yellow">
                    {nextExerciseName}
                </div>
            </div>
            
            <div className="container-rest__rest-controls">
                <FaStepBackward onClick={() => {
                    if(isPlaying) {
                        setIsPlaying(false);
                    }
                    setShowBackToPlaylistModal(true);
                }} className="container-rest__rest-controls__icon"/>
                <FaBackward onClick={prevVideo} className="container-rest__rest-controls__icon"/>
                <MdOutlineReplay10 onClick={fastForward} className="container-rest__rest-controls__icon container-rest__rest-controls__icon__ten-seconds"/>
                {
                    isPlaying ?
                    <FaPause onClick={pauseTimer} className="container-rest__rest-controls__icon"/>
                    :
                    <FaPlay onClick={playTimer} className="container-rest__rest-controls__icon"/>
                }
                <MdForward10 onClick={rewind} className="container-rest__rest-controls__icon container-rest__rest-controls__icon__ten-seconds"/>
                <FaForward onClick={nextVideo} className="container-rest__rest-controls__icon"/>
                <FaStepForward onClick={() => {
                    if(isPlaying) {
                        setIsPlaying(false);
                    }
                    setShowEndOfWorkoutModal(true);
                }} className="container-rest__rest-controls__icon"/>
            </div>
        </div>
        </>
    )
}

export default RestPage;