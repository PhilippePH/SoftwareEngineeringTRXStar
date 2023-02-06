import React, {useEffect, useState } from 'react';
import {recommendationAlgorithm} from '../algorithm/algorithm.js'; 
import { useSelector  } from 'react-redux';
import { dblClick } from '@testing-library/user-event/dist/click.js';


const retrieveExercises = (indexedDB, stateCb, selectedOptions) => {

    if (!indexedDB) {
        return;
    }

    console.log("Selected:", JSON.stringify(selectedOptions));

    recommendationAlgorithm(indexedDB, stateCb);

    // dblClick.filter("exercise", (exercise) => {
    //     return if (exercise.muscle_group == muscleGroup)
    // })
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