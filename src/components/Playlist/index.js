import React, { useEffect, useState } from 'react';
import {filterDatabase} from '../Algorithm/algorithm.js'; 


const retrieveExercises = (indexedDB, stateCb) => {

    if (!indexedDB) {
        return;
    }
    
    filterDatabase("exercises", ["muscle_type"], ["glute"], indexedDB, stateCb);
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