import React, { useEffect, useState } from 'react';

const retrieveExercises = (indexedDB, stateCb) => {
    if (!indexedDB) {
        return;
    }
    const dbPromise = indexedDB.open("ExerciseDatabase", 1);
    dbPromise.onsuccess = () => {
        const db = dbPromise.result;
        const transaction = db.transaction("exercises", "readwrite");
        const store = transaction.objectStore("exercises");
        const muscleIndex = store.index("muscle_idx");
        const exerciseQuery = muscleIndex.get(["glute"]);

        exerciseQuery.onsuccess = function () {
            stateCb(exerciseQuery.result); // we pass in useState as a callback
            console.log("Success, muscle query resulted in: ", exerciseQuery.result);
        }
        transaction.oncomplete = function () {
            db.close();
        };
    }
}

const Playlist = ({ indexedDB }) => {

    const [ displayExercise, setDisplayExercise ] = useState('');

    useEffect(() => {
        retrieveExercises(indexedDB, setDisplayExercise);
    }, []);

    return (
        <>
            <h1>Playlist page</h1>
            <p>Name: {displayExercise.name}</p>
            <p>Difficulty: {displayExercise.difficulty}</p>
            <p>Muscle: {displayExercise.muscle}</p>
        </>
    );
}

export default Playlist;