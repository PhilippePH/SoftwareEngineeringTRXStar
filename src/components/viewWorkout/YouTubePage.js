import { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import BasicButton from './BasicButton';
import './YouTubePage.scss'
import '../utils/style.scss'
import { useDispatch } from "react-redux";
import { setNavDirection } from "../../redux/slices/selectSlice";
import { useNavigate } from "react-router-dom";
import '../intro/WelcomePage.scss'
import { faForward, faBackward, faPause, faPlay, faStepBackward, faStepForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const YouTubePage = ({nextVideo, exerciseData}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
      
  const [width, setWidth] = useState(window.innerWidth);
  const [isPlaying, setIsPlaying] = useState(true);

  const playerRef = useRef(null); // create a ref for the YouTube component

  console.log("exercisedata", exerciseData)

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

  const opts = {
    height: width * 9 / 16 * 0.5,
    width: width * 0.5,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      start: exerciseData.startTime, 
      end: exerciseData.endTime,
      disablekb: 1,
      controls: 1, // switch to 0 to not show them
    },
  };
      return (
        <>
        <div className='youtube-container'>
        <div className="message1">
        </div>
        <div className="message1">
          {exerciseData.exerciseName}
                </div>
          <div
            align="center"
            className="video">
            <YouTube  videoId={exerciseData.videoId} 
                      opts={opts} 
                      onEnd={nextVideo} 
                      ref={playerRef}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)} />
          </div>  
          <div className="youtube-controls">
            <FontAwesomeIcon icon={faStepBackward} className="youtube-controls__icon"/>
            <FontAwesomeIcon icon={faBackward} onClick={() => rewind()} className="youtube-controls__icon"/>
            {
              isPlaying ?
              <FontAwesomeIcon icon={faPause} onClick={() => pauseVideo()} className="youtube-controls__icon youtube-controls__icon__play-pause"/>
              :
              <FontAwesomeIcon icon={faPlay} onClick={() => playVideo()} className="youtube-controls__icon youtube-controls__icon__play-pause"/>
            }
            <FontAwesomeIcon icon={faForward} onClick={() => fastForward()} className="youtube-controls__icon"/>
            <FontAwesomeIcon icon={faStepForward} className="youtube-controls__icon"/>
          </div>
  
          <div
            className="div-button">
          <BasicButton
            option={"Next exercise"}
            next={nextVideo}
            
          />
              <button
                onClick={() => clickHandler()}
                className="button"
              >
                End Workout
              </button>
            </div>
          </div>
        </>
        
      );
      
}

export default YouTubePage;
