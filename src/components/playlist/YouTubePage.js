import YouTube from 'react-youtube';
import BasicButton from './BasicButton';

const YouTubePage = ({nextVideo, exerciseData}) => {
      
      const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
          start: exerciseData.startTime, 
          end: exerciseData.endTime,
        },
      };
    
      return (
        <>
          <div className="App">
            <YouTube videoId={exerciseData.videoId} opts={opts} onEnd={nextVideo}/>
          </div>  
          <div
            style={{
              display:"grid",
              placeItems:"center",
              justifyContent:"center",
              alignContent:"center"
              }}>
          <BasicButton
            option={"Skip to next exercise"}
            next={nextVideo}
          />
          </div>
        </>
      );
      
}

export default YouTubePage;