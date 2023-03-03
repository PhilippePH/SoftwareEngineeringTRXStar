import { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import BasicButton from './BasicButton';
import { FaPlay } from "react-icons/fa";
import './YouTubePage.scss'
import '../utils/style.scss'
import { useDispatch } from "react-redux";
import { setNavDirection } from "../../redux/slices/selectSlice";
import { useNavigate } from "react-router-dom";
import '../intro/WelcomePage.scss'

const YouTubePage = ({nextVideo, exerciseData}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
      
  const [width, setWidth] = useState(window.innerWidth);

  const playerRef = useRef(null); // create a ref for the YouTube component

  console.log("exercisedata", exerciseData)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fastForward = async () => {
    console.log('fast-forwarding!')
    const currentTime = await playerRef.current.internalPlayer.getCurrentTime(); 
    // ADD logic such that we cannot go beyond the bounds of our current video
    playerRef.current.internalPlayer.seekTo(currentTime + 10, true); 
  };

  const rewind = async () => {
    console.log('fast-forwarding!')
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
        <div className='container-youtube'>
        <div className="message1">
          </div>
        <div className="message1">
          {exerciseData.exerciseName}
                </div>
          <div
            align="center"
            className="video">
            <YouTube videoId={exerciseData.videoId} opts={opts} onEnd={nextVideo} ref={playerRef} />
          </div>  
          <div>
            <FaPlay onClick={() => rewind()}/>
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
