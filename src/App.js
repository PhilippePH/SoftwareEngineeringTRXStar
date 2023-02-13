import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import './App.scss'; // need to run 'npm install sass'
//import {loadDatabase} from "./components/Database/loadDatabase.js";
import data from './components/data/ExerciseDatabase4.json'

// import components
import Playlist from "./components/playlist/Playlist";
import SelectMuscleGroups from "./components/selection/SelectMuscleGroups";
import SelectDifficulty from "./components/selection/SelectDifficulty";
import SelectDuration from "./components/selection/SelectDuration";
import SelectFocus from "./components/selection/SelectFocus";
import SelectMuscles from "./components/selection/SelectMuscles";
import Welcome from "./components/intro/WelcomePage";

const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

const createCollectionsInIndexedDB = () => {

    console.log("In create collection")
    if (!indexedDB) {
        console.log("IndexedDB could not be found in this browser.");
    }

    console.log(indexedDB);

    // control version changes
    var versionChangeInProgress = false;
    var jsonSchemaString = JSON.stringify(data);
    var schema = JSON.parse(jsonSchemaString);

    // if a database doesn not already exist with name "ExerciseDatabase" one is created, second param a version number in case we make a change and the user already has a previous version stored in broowser
    const request = indexedDB.open(schema.name, schema.version);

    // error checks before we create schema on database
    request.onerror = function (event) {
        console.error("An error occurred with IndexedDB");
        console.error(event.target.error);
    };

    // create schema of database
    request.onupgradeneeded = function (event) {
        const db = request.result;
        if (event.oldVersion !== 0) {
            // user had an old version of ExerciseDatabase
            console.log("deleting")
            const objectStoreList = db.objectStoreNames;
            for (var i = 0; i < objectStoreList.length; i++) {
                // delete all object stores
                db.deleteObjectStore(objectStoreList[i]);
                console.log("Object stores remaining", db.objectStoreNames)
            }
        }
        for (i = 0; i < schema.tables.length; i++) {
            // Create the object store and add data
            var objectStore = db.createObjectStore(schema.tables[i].name, { keyPath: schema.tables[i].keyPath });
            // Define any indexes
            for (var j = 0; j < schema.tables[i].indexes.length; j++) {
                objectStore.createIndex(schema.tables[i].indexes[j].name, schema.tables[i].indexes[j].keyPath, { unique: schema.tables[i].indexes[j].unique, multiEntry: schema.tables[i].indexes[j].multientry });
            }
            // Add data to the object store
            // line below gave warnings
            // schema.tables[i].data.forEach(row => objectStore.add(row));
            for (var k = 0; k < schema.tables[i].data.length; k++) {
                objectStore.add(schema.tables[i].data[k]);
            }
            
        }
    };
    
    // handle version changes(adding to database)
    request.onversionchange = function (event) {
        versionChangeInProgress = true;
        event.target.close();
    };

    // create filtered database at start-up
    const filtered = indexedDB.open("FilteredDatabase", 1);

    // if filtered database already exists, clear object stores
    filtered.onsuccess = function(event) {
        const db = filtered.result;
        const objectStoreList = db.objectStoreNames;
        for (var i = 0; i < objectStoreList.length; i++) {
            db.transaction(objectStoreList[i], "readwrite").objectStore(objectStoreList[i]).clear();
        }
        
    };

    filtered.onerror = function (event) {
        console.error("An error occurred with IndexedDB");
        console.error(event.target.error);
    };

    filtered.onupgradeneeded = function (event) {
        const db = filtered.result;
        // FilteredDatabase always has version 1, only upgrade if did not have Database
        for (var i = 0; i < schema.tables.length; i++) {
            // Create the object store and add data
            var objectStore = db.createObjectStore(schema.tables[i].name, { keyPath: schema.tables[i].keyPath });
            // Define any indexes
            for (var j = 0; j < schema.tables[i].indexes.length; j++) {
                objectStore.createIndex(schema.tables[i].indexes[j].name, schema.tables[i].indexes[j].keyPath, { unique: schema.tables[i].indexes[j].unique, multiEntry: schema.tables[i].indexes[j].multientry });
            }
        }        
    };

    filtered.onversionchange = function (event) {
        versionChangeInProgress = true;
        event.target.close();
    };
}


const App = () => {
    useEffect(() => {
        createCollectionsInIndexedDB();
    }, []);
    return (
        <div className="App">
            <h1>TRX Star (navbar)</h1>
            <Routes>
                <Route path="/playlist" element={ <Playlist indexedDB={indexedDB}/> } />
                <Route path="/" element={<Welcome/>} />
                <Route exact path="/select/body-part" element={<SelectMuscleGroups/>}/>
                <Route exact path="/select/difficulty" element={<SelectDifficulty/>}/>
                <Route exact path="/select/duration" element={<SelectDuration/>}/>
                <Route exact path="/select/focus" element={<SelectFocus/>}/>
                <Route exact path="/select/muscles" element={<SelectMuscles/>}/>
            </Routes>
        </div>
    );
}

export default App;