import React, { useEffect, useState } from 'react';


export function recommendationAlgorithm(_difficulty, _focus, _time, _muscleGroup, _muscleType) {
    // fetch valid exercises from database
    var dictPreferences = {
        "difficulty": _difficulty,
        "focus": _focus,
        "time": _time,
        "muscleGroup": _muscleGroup,
        "muscleType": _muscleType
    };

    return filterDatabase(dictPreferences);


}

export function filterDatabase (tableName, indexNameArray, valueArray, indexedDB, stateCb)
/*

tableName: string
*/ {
    const dbPromise = indexedDB.open("ExerciseDatabase", 1);
    dbPromise.onsuccess = () => {

        const db = dbPromise.result;
        const transaction = db.transaction([tableName], "readonly");
        const store = transaction.objectStore(tableName);

        var request = store.getAll(); 
        // Get all objects from the object store
        request.onsuccess = function (event) {
            var allObjects = event.target.result;
            console.log("All objects:", allObjects);

            if (indexNameArray.length != valueArray.length) {
                console.log.error("Invalid filtering inputs arrays");
                return;
            }

            for (let i = 0; i < indexNameArray.length; i++) {
                if (typeof (valueArray[i]) === "number") {
                    // Filter the objects based on two attributes
                    allObjects = allObjects.filter(object => object.attribute1 === valueArray[i]);
                }
                else if (typeof (valueArray[i] === "string")) {
                    // Filter the objects that have the desired string in the array
                    allObjects = allObjects.filter(object => object.muscle_type.includes(valueArray[i]));
                }

            }

        

        console.log("Filtered:", allObjects);
        stateCb(allObjects[0]);
        }

    }

}