function playlistToClipList(playlist) {

    const playlistArray = playlist.playlistData;

    console.log("playlist array", playlistArray);

    var clipList = [];

    // for every element in the playlist array
    for (var i = 0; i < playlistArray.length; i++) {
        // if exercise check for rest set
        if (!playlistArray[i].type.localeCompare("exercise")) {
            for (var j = 0; j < playlistArray[i].sets; j++) {
                // apend to list
                var clipInfoTemp = {};
                var restInfoTemp = {};
                Object.assign(clipInfoTemp, { type: "clip", exercise_name: playlistArray[i].exercise_name, URL: playlistArray[i].URL, start_time: playlistArray[i].start_time, end_time: playlistArray[i].end_time });
                clipList.push(clipInfoTemp);
                if (playlistArray[i].rest_set > 0) {
                    Object.assign(restInfoTemp, { type: "rest", time: playlistArray[i].rest_set });
                    clipList.push(restInfoTemp);
                }
            }
        }

        // if rest
        else if (!playlistArray[i].type.localeCompare("rest")) {
            var restTemp = {};
            // if previous was a rest then we just change the time of this 
            if (!clipList[clipList.length - 1].type.localeCompare("rest")) {
                clipList[clipList.length - 1].time = playlistArray[i].time;
            }
            // otherwise
            else {
                Object.assign(restTemp, { type: "rest", time: playlistArray[i].time });
                clipList.push(restTemp);
            }
        }

        else {
            // warmup or cooldown
            var clipInfoTemp = {};
            Object.assign(clipInfoTemp, { type: "clip", exercise_name: playlistArray[i].type, URL: playlistArray[i].URL, start_time: playlistArray[i].start_time, end_time: playlistArray[i].end_time });
            clipList.push(clipInfoTemp);
        }
    }

    return clipList;
}

export default playlistToClipList; 