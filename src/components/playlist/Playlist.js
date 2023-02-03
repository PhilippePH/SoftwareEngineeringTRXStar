import React, { useEffect, useState } from 'react';
import { recommendationAlgorithm, filterDatabase, addToFilteredDB, reject, negFilterDatabase } from '../algorithm/algorithm.js';
import { useSelector } from 'react-redux';

const retrieveExercises = (indexedDB, stateCb, selectedOptions) => {

    if (!indexedDB) {
        return;
    }

    console.log("Selected:", JSON.stringify(selectedOptions));
    var complexity = diff_to_comp(selectedOptions["difficulty"]);
    var muscles = selectedOptions["muscle_type"];

    // filter videos based on difficulty
    filterDatabase("video", "complexity", complexity, indexedDB, "ExerciseDatabase")
        .then(function (filtered) {

            addToFilteredDB("video", filtered);
            
            // find clips of specified difficulty and of specified muscle types
            var video_IDs = [];
            for (var i = 0; i < filtered.length; i++) {
                video_IDs[i] = filtered[i].video_ID;
            }

            // filter exercises based on muscle_type
            muscles.forEach(muscle => {
                filterDatabase("exercises", "muscle_type", muscle, indexedDB, "ExerciseDatabase")
                    .then(function (filtered) {

                        addToFilteredDB("exercises", filtered)

                        // get all valid exercises based on muscle_type
                        var valid_exercises = []
                        for(var i=0; i<filtered.length; i++)
                        {
                            valid_exercises[i] = filtered[i].exercise_name; 
                        }

                        // filter clips based on video IDs
                        video_IDs.forEach(videoID => {

                            console.log("Filtering on:", videoID)
                            filterDatabase("clip", "video_ID", videoID, indexedDB, "ExerciseDatabase")
                                .then(function (filtered) {
                                    addToFilteredDB("clip", filtered)

                                    // filter clips based on exercise_name from filtered exercises
                                    negFilterDatabase("clip", valid_exercises, indexedDB, "FilteredDatabase"); 
                                })
                                .catch(function (event) { reject(event) })

                        })
                    .catch(function (event) { reject(event) })
                })

            })
        })
        .catch(function (event) { reject(event) });


    // find clips of specified difficulty and of specified muscle types
    
    /*
    for(var i = 0; i< filtered_videos.length(); i++)
    {
        filterDatabase("clips", "video_ID", video_ID)
    }
*/
    //recommendationAlgorithm(indexedDB, stateCb);
    /*
    filterDatabase("exercises", "muscle_type", "glute", indexedDB)
        .then(function(filteredObjects) {createFilteredDB(filteredObjects, stateCb)})
        .catch(function(event) {reject(event)});*/
    
}

function diff_to_comp(difficulty) {
    if (difficulty === "easy") 
        return 0;
    if (difficulty === "medium")
        return 1;
    if (difficulty === "hard")
        return 2;
}

const Playlist = ({ indexedDB }) => {

    const [ displayExercise, setDisplayExercise ] = useState('');

    const selectedOptions = useSelector((state) => (state.select));

    useEffect(() => {
        retrieveExercises(indexedDB, setDisplayExercise, selectedOptions);
    }, [indexedDB]);

    return (
        <>
            <h1>Playlist page</h1>
            <p>Name: {displayExercise.exercise_name}</p>
            <p>Difficulty: {displayExercise.intensity}</p>
            <p>Muscle: {displayExercise.muscle_type}</p>
        </>
    );
}

export default Playlist;