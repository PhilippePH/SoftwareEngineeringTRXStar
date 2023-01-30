import React, {useEffect, useState } from 'react';
import {recommendationAlgorithm} from '../Algorithm/algorithm.js'; 


const retrieveExercises = (indexedDB, stateCb) => {

    if (!indexedDB) {
        return;
    }

    recommendationAlgorithm(indexedDB, stateCb);
    /*
    filterDatabase("exercises", "muscle_type", "glute", indexedDB)
        .then(function(filteredObjects) {createFilteredDB(filteredObjects, stateCb)})
        .catch(function(event) {reject(event)});*/
    
}
/*
function createFilteredDB(objects, stateCb) {
    console.log("Resolved:", objects);
    stateCb(objects[0]);
}

function reject(event) {
    console.error("DB filtering rejected.");
    console.error(event);
}*/

const Playlist = ({ indexedDB }) => {

    const [ displayExercise, setDisplayExercise ] = useState('');

    useEffect(() => {
        retrieveExercises(indexedDB, setDisplayExercise);
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