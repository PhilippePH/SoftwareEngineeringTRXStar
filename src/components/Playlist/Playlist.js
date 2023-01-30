import React, { useEffect, useState } from 'react';
import {filterDatabase} from '../Algorithm/algorithm.js'; 


const retrieveExercises = (indexedDB, stateCb) => {

    if (!indexedDB) {
        return;
    }
    
    filterDatabase("exercises", ["muscle_type"], ["glute"], indexedDB)
        .then(function(filteredObjects) {createFilteredDB(filteredObjects, stateCb)})
        .catch(reject);
}

function createFilteredDB(objects, stateCb) {
    console.log("Resolved:", objects);
    stateCb(objects[0]);
}

function reject() {
    console.error("DB transaction rejected.");
}

const Playlist = ({ indexedDB }) => {

    const [ displayExercise, setDisplayExercise ] = useState('');

    useEffect(() => {
        retrieveExercises(indexedDB, setDisplayExercise);
    }, []);

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