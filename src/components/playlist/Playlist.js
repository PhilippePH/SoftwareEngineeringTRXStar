import React, { useEffect, useState } from 'react';
import { recommendationAlgorithm, filterDatabase, addToFilteredDB, reject, negFilterDatabase, fillStructure} from '../algorithm/algorithm.js';
import { createStructure } from '../algorithm/createStructure.js';
import { useSelector } from 'react-redux';
import structure from "../data/workoutStructure.json"
import { addPlaylist } from "../../redux/slices/playlistSlice.js"
import { store } from "../../redux/store"
import { dblClick } from '@testing-library/user-event/dist/click.js';
import ExerciseCard from './ExerciseCard.js';
import PlaylistWindow from './PlaylistWindow.js';

// filter using async await
async function filterAll(indexedDB, userOptions) {

    console.log("Selected:", JSON.stringify(userOptions));
    const complexity = diff_to_comp(userOptions["difficulty"]);
    const muscles = userOptions["muscle_type"];
    
    try {

        // filter videos based on difficulty
        let filteredVideos = await filterDatabase("video", "complexity", complexity, indexedDB, "ExerciseDatabase", 2);
        
        // adds videos of selected difficulty into filteredDB
        await addToFilteredDB("video", filteredVideos);

        // store valid video IDs in array
        const video_IDs = [];
        for (var i = 0; i < filteredVideos.length; i++) {
            video_IDs[i] = filteredVideos[i].video_ID;
        }

        var fullExercises = [];
        // filter exercises based on muscle_type
        for (i = 0; i < muscles.length; i++) {
            let filteredExercises = await filterDatabase("exercises", "muscle_type", muscles[i], indexedDB, "ExerciseDatabase", 2);
            await addToFilteredDB("exercises", filteredExercises);
            filteredExercises.forEach(exercise => {
                if (!fullExercises.includes(exercise.exercise_name)) {
                    fullExercises.push(exercise.exercise_name);
                }
            })
        }

        console.log("Full exercises", fullExercises); 
        
        for (i = 0; i < video_IDs.length; i++) {
            let filteredClips = await filterDatabase("clip", "video_ID", video_IDs[i], indexedDB, "ExerciseDatabase", 2);
            let validClips = []
            filteredClips.forEach(clip => {
                if (fullExercises.includes(clip.exercise_name)) {
                    validClips.push(clip);
                }
            })
            console.log("Valid clips", validClips);
            await addToFilteredDB("clip", validClips);
        }

    } catch (error) {

        console.error("Database filtering rejected", error);

    }


function diff_to_comp(difficulty) {
    if (difficulty === "easy") 
        return 0;
    if (difficulty === "medium")
        return 1;
    if (difficulty === "hard")
        return 2;
}

async function callFilterAll(indexedDB, selectedOptions) {
    await filterAll(indexedDB, selectedOptions);
}

const Playlist = ({ indexedDB }) => {

    
    const [ displayName, setDisplayName ] = useState('');

    const { 
        difficulty,
        focus,
        duration,
        muscleGroups,
        muscles
    } = useSelector((state) => (state.select));

    const selectedOptions = {
        difficulty,
        focus,
        duration,
        muscleGroups,
        muscles
    }

    
    useEffect(() => {// make sure not re-rendering all the time
    filterAll(indexedDB, selectedOptions)
    .then(function() {
        try {
            createStructure(selectedOptions)
            .then(function (empty) {
                console.log("Should be empty", empty);
                fillStructure(empty, indexedDB)
                .then(function(filled) {
                    console.log("Filled structure", filled);
                    setDisplayName(filled[1].exercise_name); 
                    store.dispatch(addPlaylist(filled));
                })
            });
        } catch (e) {
            console.error(e);
        }
    });
}, []);


const playlist = useSelector((state) => (state.playlist));
console.log("here", playlist.playlistData[1]); 

    return (
        <>
            <PlaylistWindow />
            <h1>Playlist page</h1>
            <p>Exercise 1: {displayName}</p>
        </>
    );
}   

export default Playlist;
