import React, { useEffect, useState } from 'react';


export function recommendationAlgorithm(indexedDB, stateCb) {
    // fetch valid exercises from database
    /*var dictPreferences = {
        "difficulty": _difficulty,
        "focus": _focus,
        "time": _time,
        "muscleGroup": _muscleGroup,
        "muscleType": _muscleType
    };*/

    filterDatabase("exercises", "muscle_type", "glute", indexedDB)
        .then(function(filteredObjects) {createFilteredDB(filteredObjects, stateCb)})
        .catch(function(event) {reject(event)});

}

/*
tableName: string specifying the name of the table to filter on
indexNameArray: array of keys over which the table will be filtered
valueArray: array of values, corresponding to each given key, for which entries will be kept
*/ 
function filterDatabase (tableName, indexName, value, indexedDB) {
    
    return new Promise(function(resolve, reject) {

        // open database
        const dbPromise = indexedDB.open("ExerciseDatabase", 1);
        dbPromise.onsuccess = () => {
    
            const db = dbPromise.result;
            const transaction = db.transaction(tableName, "readonly");

            // retrieve table and index of attribute specified
            const store = transaction.objectStore(tableName);
            const index = store.index(indexName)
            
            // get all entries in table with specified value of attribute
            const request = index.getAll(value);

            request.onsuccess = function (event) { resolve(event.target.result); }

            request.onerror = function(event) { reject(event) }
            transaction.oncomplete = () => { db.close(); };
            transaction.onerror = function(event) { reject(event) }
        }

        dbPromise.onerror = function(event) { reject(event) }

    })

}

function createFilteredDB(objects, stateCb) {
    console.log("Resolved:", objects);
    stateCb(objects[0]);
}

function reject(event) {
    console.error("DB filtering rejected.");
    console.error(event);
}