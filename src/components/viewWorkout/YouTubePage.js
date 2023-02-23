import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import BasicButton from './BasicButton';
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
  console.log("exercisedata", exerciseData)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const clickHandler = () => {
    dispatch(setNavDirection("forwards"));
    navigate(`/end`);
}

const opts = {
    width: '100%', // so that it takes the whole size of the container
    height: 0.5625 * width,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      start: exerciseData.startTime, 
      end: exerciseData.endTime,
    },
  };


    
      return (
        <>
        <div className='container-youtube'>
        <div className='container-youtube__container-settings'>
        <div className="container-youtube__message1">
          {exerciseData.exerciseName}
                </div>
          <div
            className="container-youtube__wrap">
            <YouTube className="container-youtube__iFrameYoutube" videoId={exerciseData.videoId} opts={opts} onEnd={nextVideo}></YouTube>
          </div>  
          <div
            className="container-youtube__div-button">
          <BasicButton
            option={"Next exercise"}
            next={nextVideo}
            
          />
              <button
                onClick={() => clickHandler()}
                className="container-youtube__button"
              >
                End Workout
              </button>
            </div>
            </div>
          </div>
        </>
        
      );
      
}

export default YouTubePage;
