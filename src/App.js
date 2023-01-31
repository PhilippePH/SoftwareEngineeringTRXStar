import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import './App.scss'; // need to run 'npm install sass'
//import {loadDatabase} from "./components/Database/loadDatabase.js";
import data from './components/data/ExerciseDatabase.json'

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
    if (!indexedDB) {
        console.log("IndexedDB could not be found in this browser.");
    }

    console.log(indexedDB);

    // control version changes
    var versionChangeInProgress = false;

    // if a database doesn not already exist with name "ExerciseDatabase" one is created, second param a version number in case we make a change and the user already has a previous version stored in broowser
    const request = indexedDB.open("ExerciseDatabase", 1);

    // error checks before we create schema on database
    request.onerror = function (event) {
        console.error("An error occurred with IndexedDB");
        console.error(event);
    };

    // create schema of database
    request.onupgradeneeded = function (event) {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("ExerciseDatabase")) {
            var jsonSchemaString = JSON.stringify(data);
            var schema = JSON.parse(jsonSchemaString);
    
            for (var i = 0; i < schema.tables.length; i++) {
                // Create the object store and add data
                var objectStore = db.createObjectStore(schema.tables[i].name, { keyPath: schema.tables[i].keyPath });
                // Define any indexes
                for (var j = 0; j < schema.tables[i].indexes.length; j++) {
                    objectStore.createIndex(schema.tables[i].indexes[j].name, schema.tables[i].indexes[j].keyPath, { unique: schema.tables[i].indexes[j].unique, multiEntry: schema.tables[i].indexes[j].multientry });
                }
                // Add data to the object store
                schema.tables[i].data.forEach(row => objectStore.add(row));
            }
        }
    };
    
    // handle version changes(adding to database)
    request.onversionchange = function (event) {
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