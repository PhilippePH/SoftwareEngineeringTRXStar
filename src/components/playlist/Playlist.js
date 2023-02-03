import React, {useEffect, useState } from 'react';
import { recommendationAlgorithm, filterDatabase, addToFilteredDB, reject } from '../algorithm/algorithm.js'; 
import { useSelector  } from 'react-redux';


const retrieveExercises = (indexedDB, stateCb, selectedOptions) => {

    if (!indexedDB) {
        return;
    }

    console.log("Selected:", JSON.stringify(selectedOptions));
    var complexity = diff_to_comp(selectedOptions["difficulty"]);
    var muscles = selectedOptions["muscle_type"];

    // filter videos based on difficulty
    filterDatabase("video", "complexity", complexity, indexedDB)
        .then(function(filtered) {addToFilteredDB("video", filtered)})
        .catch(function(event) {reject(event)});

    // filter exercises based on muscle_type
    muscles.forEach(muscle => {
        console.log("Filtering on:", muscle)
        filterDatabase("exercises", "muscle_type", muscle, indexedDB)
            .then(function(filtered) {addToFilteredDB("exercises", filtered)})
            .catch(function(event) {reject(event)});
    });

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