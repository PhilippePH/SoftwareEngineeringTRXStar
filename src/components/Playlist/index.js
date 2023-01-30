import React, { useEffect, useState } from 'react';

const retrieveExercises = (indexedDB, stateCb) => {
    if (!indexedDB) {
        return;
    }
    const dbPromise = indexedDB.open("ExerciseDatabase", 1);
    dbPromise.onsuccess = () => {
        const db = dbPromise.result;
        const transaction = db.transaction(["exercises"], "readonly");
        const store = transaction.objectStore("exercises");
        const muscleIndex = store.index("muscle_type");
        const exerciseQuery = muscleIndex.openCursor("glute");


        let results = {}; 
        exerciseQuery.onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                results = cursor.value;
                console.log("Success, muscle query resulted in: ", cursor.value);
                cursor.continue();
            } else {
                stateCb(results); 
        }

        transaction.oncomplete = function () {
            db.close();
        };
    }
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
            <p>Name: {displayExercise.exercise_name}</p>
            <p>Difficulty: {displayExercise.intensity}</p>
            <p>Muscle: {displayExercise.muscle_type}</p>
        </>
    );
}

export default Playlist;