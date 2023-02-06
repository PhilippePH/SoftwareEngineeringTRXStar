import React, { useEffect, useState } from 'react';
import { recommendationAlgorithm, filterDatabase, addToFilteredDB, reject, negFilterDatabase, createStructure, fillStructure} from '../algorithm/algorithm.js';
import { useSelector } from 'react-redux';

const retrieveExercises = (indexedDB, stateCb, selectedOptions) => {

    if (!indexedDB) {
        return;
    }

    console.log("Selected:", JSON.stringify(selectedOptions));
    const complexity = diff_to_comp(selectedOptions["difficulty"]);
    const muscles = selectedOptions["muscle_type"];
    
    // filter videos based on difficulty
    filterDatabase("video", "complexity", complexity, indexedDB, "ExerciseDatabase")
        .then(function (filteredVideos) {

            // adds videos of selected difficulty into filteredDB
            addToFilteredDB("video", filteredVideos);

            // store valid video IDs in array
            const video_IDs = [];
            for (var i = 0; i < filteredVideos.length; i++) {
                video_IDs[i] = filteredVideos[i].video_ID;
            }

            var fullExercises = [];
            // filter exercises based on muscle_type
            muscles.forEach(muscle => {
                filterDatabase("exercises", "muscle_type", muscle, indexedDB, "ExerciseDatabase")
                    .then(function (filteredExercises) {

                        // add exercises which target selected muscles into filteredDB
                        addToFilteredDB("exercises", filteredExercises);

                        // store valid exercise in array
                        const valid_exercises = []
                        for (let i = 0; i < filteredExercises.length; i++) {
                            valid_exercises[i] = filteredExercises[i].exercise_name;
                        }

                        console.log("Valid exercise", valid_exercises);
                        valid_exercises.forEach(exercise => {
                            if (!fullExercises.includes(exercise)) {
                                fullExercises.push(exercise)
                            }
                        })
                        console.log("Full exercises", fullExercises);
                    })
                    .catch(function (event) { reject(event) })
                })

            console.log("All exercise", fullExercises);

            // filter clips based on video IDs
            video_IDs.forEach(videoID => {
                filterDatabase("clip", "video_ID", videoID, indexedDB, "ExerciseDatabase")
                    .then(function (filteredClips) {
                        // add valid clips into filteredDB
                        addToFilteredDB("clip", filteredClips)
                        // filter clips based on exercise_name from filtered exercises
                        negFilterDatabase("clip", fullExercises, indexedDB, "FilteredDatabase"); 
                    })
                    .catch(function (event) { reject(event) })
            })
            
        })
        .catch(function (event) { reject(event) })
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

    //var playlistStructure = createStructure(selectedOptions); 

    useEffect(() => {
        retrieveExercises(indexedDB, setDisplayExercise, selectedOptions);
    }, [indexedDB]);

    // playlist is of redux type
    //var playlist = fillStructure(playlistStructure, indexedDB)

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