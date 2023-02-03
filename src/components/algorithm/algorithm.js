import React, { useEffect, useState } from 'react';


export function recommendationAlgorithm(indexedDB, stateCb) {
    
    filterDatabase("video", "complexity", 2, indexedDB)
        .then(function(filteredObjects) {addToFilteredDB(filteredObjects, stateCb)})
        .catch(function(event) {reject(event)});

}

/*
tableName: string specifying the name of the table to filter on
indexNameArray: array of keys over which the table will be filtered
valueArray: array of values, corresponding to each given key, for which entries will be kept
*/ 
export function filterDatabase (tableName, indexName, value, indexedDB) {
    
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

export function addToFilteredDB(tableName, objects) {
    console.log("Resolved:", objects);
    const open  = indexedDB.open("FilteredDatabase", 1);
    open.onsuccess = function(event) {
        const db = event.target.result
        const transaction = db.transaction(tableName, "readwrite");
        const videoStore = transaction.objectStore(tableName);
        objects.forEach(row => {videoStore.put(row)});
        transaction.oncomplete = () => { db.close() }
    }
}

export function reject(event) {
    console.error("DB filtering rejected.");
    console.error(event.target.error);
}