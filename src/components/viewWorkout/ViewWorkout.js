import { useState } from 'react';
import { RiSliceFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import playlist_to_clipList from '../playlist/playlist_to_clipList';
import RestPage from './RestPage';
import YouTubePage from './YouTubePage';

const ViewWorkout = () => {
    const [count, setCount] = useState(0);

    const playlist = useSelector((state) => (state.playlist));
    var clipList = playlist_to_clipList(playlist); 

    console.log("clip list", clipList); 

    if (count == clipList.length) { // if end of video we display 'Finished' component
        return (
            <p>Finished !</p>
        )
    } else if (clipList[count].type == 'clip') { // check if exercise 
        const videoId = extractVideoIdFromURL(clipList[count].URL)
        const startTime = parseTime(clipList[count].start_time)
        const endTime = parseTime(clipList[count].end_time)
        const exerciseData = {
            videoId,
            startTime,
            endTime,
        }
        console.log("Exercise data parsed: ", exerciseData)
        return (
            <YouTubePage nextVideo={() => setCount(count+1)} exerciseData={exerciseData} />
        )
    } else { // if not we are resting
        // extract rest data
        return (
            <RestPage nextVideo={() => setCount(count+1)} restData={clipList[count]} nextExerciseName = {clipList[count+1].exercise_name} />
        )
    }
}

function extractVideoIdFromURL (URL) {
    const startIndex = URL.indexOf("v=")+2
    const endIndex = URL.indexOf("&");
    // "https://www.youtube.com/watch?v="
    return URL.slice(startIndex, endIndex)
}

function parseTime (time) {
    var a = time.split(':'); // split it at the colons

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
    return seconds
}

export default ViewWorkout;