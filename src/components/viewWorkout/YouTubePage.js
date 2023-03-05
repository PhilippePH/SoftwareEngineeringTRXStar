import { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
// import BasicButton from './BasicButton';
import './YouTubePage.scss'
import '../utils/style.scss'
import { useDispatch } from "react-redux";
import { setNavDirection } from "../../redux/slices/selectSlice";
import { useNavigate } from "react-router-dom";
import '../intro/WelcomePage.scss'
import { FaForward, FaBackward, FaPause, FaPlay, FaStepForward, FaStepBackward } from "react-icons/fa";
import WorkoutProgress from "./WorkoutProgress";


const YouTubePage = ({nextVideo, exerciseData}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
      
  const [width, setWidth] = useState(window.innerWidth);
  const [isPlaying, setIsPlaying] = useState(true);

  const playerRef = useRef(null); // create a ref for the YouTube component

  // console.log("exercisedata", exerciseData)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fastForward = async () => {
    const currentTime = await playerRef.current.internalPlayer.getCurrentTime(); 
    // ADD logic such that we cannot go beyond the bounds of our current video
    playerRef.current.internalPlayer.seekTo(currentTime + 10, true); 
  };

  const playVideo = async () => {
    playerRef.current.internalPlayer.playVideo(); 
  }

  const pauseVideo = async () => {
    playerRef.current.internalPlayer.pauseVideo(); 
  }

  const rewind = async () => {
    console.log(playerRef.current.internalPlayer);
    const currentTime = await playerRef.current.internalPlayer.getCurrentTime(); 
    // ADD logic such that we cannot go beyond the bounds of our current video
    playerRef.current.internalPlayer.seekTo(Math.max(0, currentTime - 10), true); 
  };

  const clickHandler = () => {
    dispatch(setNavDirection("forwards"));
    navigate(`/end`);
}

let updating_width = 0; 

function check_width() {
    let w = document.documentElement.clientWidth;
    if(w > 1000) { updating_width = 0.7 * w}
    else if(w > 800) { updating_width = 0.8 * w}
    else if(w > 650) { updating_width = 0.9 * w}
    else {updating_width = 0.98 * w}
}

window.onresize = check_width();

const opts = {
    width: '100%', // so that it takes the whole size of the container
    height: updating_width * 9 / 16 , // keeping the ratio
    playerVars: {
      autoplay: 1,
      start: exerciseData.startTime, 
      end: exerciseData.endTime,
    },
  };


      return (
        <>
        <div className='container-youtube'>
        <div className='container-settings' id="divId">
        <div className='container-settings__progress-bar'> 
          <WorkoutProgress completed={50} />
        </div>
        <div className="container-settings__message1">
          {exerciseData.exerciseName}
                </div>
                
          <div
            className="container-settings__wrap">
            <YouTube className="container-settings__iFrameYoutube"
                      videoId={exerciseData.videoId} 
                      opts={opts} 
                      onEnd={nextVideo} 
                      ref={playerRef}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}>
                      </YouTube>
          </div>  
          <div className="youtube-controls">
            <FaStepBackward className="youtube-controls__icon"/>
            <FaBackward onClick={() => rewind()} className="youtube-controls__icon"/>
            {
              isPlaying ?
              <FaPause onClick={() => pauseVideo()} className="youtube-controls__icon"/>
              :
              <FaPlay onClick={() => playVideo()} className="youtube-controls__icon"/>
            }
            <FaForward onClick={() => fastForward()} className="youtube-controls__icon"/>
            <FaStepForward className="youtube-controls__icon"/>
          </div>
  
          {/* <div
            className="container-settings__div-button">
          <BasicButton
            option={"Next exercise"}
            next={nextVideo}
            
          />
              <button
                onClick={() => clickHandler()}
                className="container-settings__button"
              >
                End Workout
              </button>
            </div> */}

          </div>
        </div>
      </>
        
      );
      
}

export default YouTubePage;
