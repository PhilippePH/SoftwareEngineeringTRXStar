import React, { useEffect, useState } from 'react';
import Playlist from '../playlist/Playlist';

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
export function filterDatabase (tableName, indexName, value, indexedDB, database, versionNumber) {
    
    return new Promise(function(resolve, reject) {

        // open database
        const dbPromise = indexedDB.open(database, versionNumber);
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
*/
export function fillStructure(structure, indexedDB) {
    
    console.log("structure", structure)
    // fill each object in workout array
    structure.forEach(item => {

        try {
            var intensity = item.intensity;
        } catch (e) {
            var intensity = null;
        }

        var clip = getClip(indexedDB, item.type, item.time, intensity)
        
    })

}

async function getClip(indexedDB, type, time, intensity) {

    switch (type) {
    
        case "rest":
            console.log("Rest branch")
            break;
            
        case "warmup":
            console.log("Warmup branch");
            var warmup_clips = await filterDatabase("clip", "exercise_name", "warmup", indexedDB, "FilteredDatabase", 1);
            console.log("Warmup clips: ", warmup_clips);
            console.log("Selected warmup", warmup_clips[RandInt(0, warmup_clips.length)]);
            return warmup_clips[RandInt(0, warmup_clips.length)]; 
            
        case "cooldown":
            console.log("Cooldown branch")
            var cooldown_clips = await filterDatabase("clip", "exercise_name", "cooldown", indexedDB, "FilteredDatabase", 1);
            console.log("Cooldown clips: ",cooldown_clips);
            console.log("Selected cooldown", cooldown_clips[RandInt(0, cooldown_clips.length)]);
            return cooldown_clips[RandInt(0, cooldown_clips.length)]
        case "exercise":
            console.log("Exercise branch");
            var valid_exercises = await filterDatabase("exercises", "intensity", intensity, indexedDB, "FilteredDatabase", 1);
            var chosen_exercise = valid_exercises[RandInt(0, valid_exercises.length)]; 
            console.log("Chosen_exercise", chosen_exercise); 
            var exercise_clips = await filterDatabase("clip", "exercise_name", chosen_exercise.exercise_name, indexedDB, "FilteredDatabase", 1);
            console.log("Exercise clips: ", exercise_clips);
            console.log("Selected exercise clip", exercise_clips[RandInt(0, exercise_clips.length)]);
            return exercise_clips[RandInt(0, exercise_clips.length)];

        default:
            console.error("Invalid key");
            return;
    }
}

function RandInt(min, max) {
    return Math.floor(Math.random() * max) + min; 
}
