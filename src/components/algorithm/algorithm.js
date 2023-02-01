import React, { useEffect, useState } from 'react';


export function recommendationAlgorithm(indexedDB, stateCb) {
    // make filtered exercises table
    // if a database doesn not already exist with name "ExerciseDatabase" one is created, second param a version number in case we make a change and the user already has a previous version stored in broowser
    var db;
    var request = indexedDB.open("ExerciseDatabase", 1);
    request.onsuccess = function (event) {
        db = event.target.result;

        if (db.version == 1) {

            console.log("Successful database connection established");
            var transaction = db.transaction(["exercises"], "readonly");
            var objectStore = transaction.objectStore("exercises");

            var indexNames = Array.from(objectStore.indexNames);
            var keyPath = objectStore.keyPath;

            // Close the database connection before upgrading
            db.close();

            var upgradeRequest = indexedDB.open("ExerciseDatabase", 2);

            upgradeRequest.onupgradeneeded = function (event) {
                var db = event.target.result;
                var newTable = db.createObjectStore("filteredExercises", { keyPath: keyPath });

                // Loop through the index names and create the same indexes on the new table
                indexNames.forEach(function (indexName) {
                    newTable.createIndex(indexName, indexName, { unique: false });
                });
            }

            upgradeRequest.onsuccess = function (event) {
                db = event.target.result;
                console.log("Successful database upgrade to version 2");
                var transaction = db.transaction(["filteredExercises"], "readwrite");
                var newObjectStore = transaction.objectStore("filteredExercises");
            }
        }
    }


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
        const dbPromise = indexedDB.open("ExerciseDatabase", 2);
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