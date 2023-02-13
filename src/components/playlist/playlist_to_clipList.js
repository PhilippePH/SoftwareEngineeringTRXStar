function playlist_to_clipList(playlist){

    const playlistArray = playlist.playlistData; 
    console.log("here", playlist.playlistData); 


    var clipList = []; 

    // for every element in the playlist array
    for (var i=0; i < playlistArray.length; i++)
    {
        // if rest
        if (!playlistArray[i].type.localeCompare("rest")){
            var restTemp = {}; 
            Object.assign(restTemp, {type: "rest", time: playlistArray[i].time}); 
            clipList.push(restTemp); 
        }

        // if exercise check for rest set
        else if (!playlistArray[i].type.localeCompare("exercise"))
        {
            for (var j=0; j<playlistArray[i].sets; j++)
            {
                // apend to list
                var clipInfoTemp = {}; 
                var restInfoTemp = {}; 
                Object.assign(clipInfoTemp, {type: "clip", exercise_name:playlistArray[i].exercise_name,  URL: playlistArray[i].URL, start_time: playlistArray[i].start_time, end_time:playlistArray[i].end_time}); 
                clipList.push(clipInfoTemp); 
                Object.assign(restInfoTemp, {type: "rest", time: playlistArray[i].rest_set}); 
                clipList.push(restInfoTemp); 
            }
        }

        else{
            // warmup or cooldown
            var clipInfoTemp = {}; 
            Object.assign(clipInfoTemp, {type: "clip", exercise_name:playlistArray[i].type, URL: playlistArray[i].URL, start_time: playlistArray[i].start_time, end_time:playlistArray[i].end_time}); 
            clipList.push(clipInfoTemp); 
        }
    }

    return clipList; 
}

export default playlist_to_clipList; 