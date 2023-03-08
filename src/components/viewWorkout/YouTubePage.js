import { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import './YouTubePage.scss'
import '../utils/style.scss'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import '../intro/WelcomePage.scss'
import { FaForward, FaBackward, FaPause, FaPlay, FaStepForward, FaStepBackward, FaExpand } from "react-icons/fa";
// import { MdForward10, MdOutlineReplay10 } from "react-icons/md";
import WorkoutProgress from "./WorkoutProgress";


const YouTubePage = ({nextVideo, prevVideo, exerciseData}) => {

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

  const handleFastForward = async () => {
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

  const handleRewind = async () => {
    console.log(playerRef.current.internalPlayer);
    const currentTime = await playerRef.current.internalPlayer.getCurrentTime(); 
    // ADD logic such that we cannot go beyond the bounds of our current video
    playerRef.current.internalPlayer.seekTo(Math.max(0, currentTime - 10), true); 
  };

  const handleFullscreen = async () => {
    const playerElement = await playerRef.current.internalPlayer.getIframe();
    playerElement.requestFullscreen();
  };

  const endWorkout = () => {
    navigate(`/end`);
  }

  const backToPlaylist = () => {
    navigate(`/playlist`);
  }

let updating_width = 0; 

function check_width() {
    let w = document.documentElement.clientWidth;
    if(w > 1000) { updating_width = 0.55 * w}
    else if(w > 800) { updating_width = 0.7 * w}
    else if(w > 650) { updating_width = 0.8 * w}
    else {updating_width = 0.98 * w}
}

window.onresize = check_width();

const opts = {
    width: '100%', // so that it takes the whole size of the container
    height: updating_width * 9 / 16 , // keeping the ratio
    playerVars: {
      autoplay: 1,
      controls: 1,
      disablekb: 0,
      start: exerciseData.startTime, 
      end: exerciseData.endTime,
    },
  };


      return (
        <>
        <div className='container-youtube'>
        <div className='container-settings' id="divId">
          <div className='container-settings__progress-bar'> 
            <WorkoutProgress completed={(Math.floor((exerciseData.counter /exerciseData.totalWorkoutLength)*100))} />
          </div>
          <div className="container-settings__message1">
            {exerciseData.exerciseName}
            <div className="container-settings__sets">
                set {exerciseData.setNumber+1} of {exerciseData.totalSets}
                  </div>
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
              <FaStepBackward onClick={backToPlaylist} className="youtube-controls__icon"/>
              <FaBackward onClick={prevVideo} className="youtube-controls__icon"/>
              {/* <MdOutlineReplay10 onClick={() => handleRewind()} className="youtube-controls__icon youtube-controls__icon__ten-seconds"/> */}
              <button onClick={handleRewind} className="youtube-controls__icon">10</button>
              {
                isPlaying ?
                <FaPause onClick={() => pauseVideo()} className="youtube-controls__icon"/>
                :
                <FaPlay onClick={() => playVideo()} className="youtube-controls__icon"/>
              }
              {/* <MdForward10 onClick={() => handleFastForward()} className="youtube-controls__icon youtube-controls__icon__ten-seconds"/> */}
              <button onClick={handleFastForward} className="youtube-controls__icon">10</button>
              <FaForward onClick={nextVideo} className="youtube-controls__icon"/>
              <FaStepForward onClick={endWorkout} className="youtube-controls__icon"/>
              <FaExpand onClick={handleFullscreen} className="youtube-controls__icon"/>
            </div>

          </div>
        </div>
      </>
        
      );
      
}

export default YouTubePage;
