import React, { useEffect, useState } from 'react';

/*
export function recommendationAlgorithm(indexedDB, stateCb) {
    
    filterDatabase("video", "complexity", 2, indexedDB, "ExerciseDatabase")
        .then(function(filteredObjects) {addToFilteredDB("video", filteredObjects)})
        .catch(function(event) {reject(event)});

}*/

/*
tableName: string specifying the name of the table to filter on
indexNameArray: array of keys over which the table will be filtered
valueArray: array of values, corresponding to each given key, for which entries will be kept
*/ 
export function filterDatabase (tableName, indexName, value, indexedDB, database) {
    
    return new Promise(function(resolve, reject) {

        // open database
        const dbPromise = indexedDB.open(database, 2);
        dbPromise.onsuccess = () => {
            const db = dbPromise.result;
            const request = db.transaction(tableName, "readonly")
                .objectStore(tableName)
                .index(indexName)
                .getAll(value);
            request.onsuccess = function(event) { resolve(event.target.result); }
            request.onerror = function(event) { reject(event); }
        } 
        dbPromise.onerror = (event) => { reject(event); }

    })

}

export function negFilterDatabase (tableName, value, indexedDB, database) { 
    return new Promise(function(resolve, reject) {
        // open database
        const dbPromise = indexedDB.open(database, 1);
        dbPromise.onsuccess = () => {
            const db = dbPromise.result;
            const request = db.transaction(tableName, "readwrite")
                .objectStore(tableName)
                .openCursor();

            // retrieve table and index of attribute specified
            request.onsuccess = function (event) { 
                var cursor = event.target.result; 
                if(cursor){
                    var entry = cursor.value; 
                    if(!(value.includes(entry.exercise_name))) {cursor.delete();}
                    cursor.continue(); 
                }
            }
            request.onerror = function(event) {reject(event);}
        }
        dbPromise.onerror = function(event) {reject(event);}
    })
}

export function addToFilteredDB(tableName, objects) {
    return new Promise(function(resolve, reject) {
        const dbPromise  = indexedDB.open("FilteredDatabase", 1);
        dbPromise.onsuccess = () => {
            const db = dbPromise.result;
            const transaction = db.transaction(tableName, "readwrite");
            const objectStore = transaction.objectStore(tableName);
            objects.forEach(row => { objectStore.put(row); })
            transaction.oncomplete = () => {
                db.close();
                resolve();
            }
            transaction.onerror = function(event) { reject(event); }
        }
        dbPromise.onerror = function(event) { reject(event); }
    })
}

export function reject(event) {
    console.error("DB filtering rejected.");
    console.error(event.target.error);
}


/*
export function createStructure(){

    exercise_dict = {
        "time": null,
        "sets": 2,
        "rest_set": 20,
        "intensity": 2,
        "URL": "",
        "start_time": "",
        "end_time": ""

}

export function fillStructure(){

}
*/