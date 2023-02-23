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

let be_width_plz = 0; 
function check_width() {
    let w = document.documentElement.clientWidth;
    if(w > 1000) { be_width_plz = 0.7 * w}
    else if(w > 800) { be_width_plz = 0.8 * w}
    else if(w > 650) { be_width_plz = 0.9 * w}
    else {be_width_plz = width}
}
window.onresize = check_width();
//window.addEventListener('resize', function(){
// })

// maybe pass in a width parameter of the div??
// https://www.codespeedy.com/retrieve-the-width-of-div-element-in-javascript/
// https://www.w3schools.com/jsref/dom_obj_var.asp 
const opts = {
    width: '100%', // so that it takes the whole size of the container
    height: be_width_plz * 9 / 16 ,
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
        <div className='container-settings' id="divId">
        <div className="container-settings__message1">
          {exerciseData.exerciseName}
                </div>
                
          <div
            className="container-settings__wrap">
            <YouTube className="container-settings__iFrameYoutube" videoId={exerciseData.videoId} opts={opts} onEnd={nextVideo}></YouTube>
          </div>  
          <div
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
            </div>
            </div>
          </div>
        </>
        
      );
      
}



export default YouTubePage;
