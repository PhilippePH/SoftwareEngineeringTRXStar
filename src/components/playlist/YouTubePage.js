import YouTube from 'react-youtube';

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
        </>
      );
      
}

export default YouTubePage;