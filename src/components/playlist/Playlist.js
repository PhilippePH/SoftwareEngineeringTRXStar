import React, {useEffect, useState } from 'react';
import {recommendationAlgorithm} from '../algorithm/algorithm.js'; 
import { useSelector  } from 'react-redux';


const retrieveExercises = (indexedDB, stateCb, selectedOptions) => {

    if (!indexedDB) {
        return;
    }

    console.log("Selected:", JSON.stringify(selectedOptions));

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