import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import BasicButton from './BasicButton';
import './YouTubePage.scss'
import '../utils/style.scss'

const YouTubePage = ({nextVideo, exerciseData}) => {
      
  const [width, setWidth] = useState(window.innerWidth);
  console.log("exercisedata", exerciseData)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const opts = {
    height: width * 9 / 16 * 0.7,
    width: width * 0.7,
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
        <div className="message1">
          </div>
        <div className="message1">
          {exerciseData.exerciseName}
                </div>
          <div
            align="center"
            className="video">
            <YouTube videoId={exerciseData.videoId} opts={opts} onEnd={nextVideo}/>
          </div>  
          <div
            className="div-button">
          <BasicButton
            option={"Skip to next exercise"}
            next={nextVideo}
          />
          </div>
          </div>
        </>
        
      );
      
}

export default YouTubePage;
