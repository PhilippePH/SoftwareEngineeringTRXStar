import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import './App.scss'; // need to run 'npm install sass'

// import components
import Playlist from "./components/playlist/Playlist";
import SelectBodyPart from "./components/selection/SelectBodyPart";
import SelectDifficulty from "./components/selection/SelectDifficulty";
import SelectDuration from "./components/selection/SelectDuration";
import SelectFocus from "./components/selection/SelectFocus";
import SelectMuscles from "./components/selection/SelectMuscles";

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

    // if a database doesn not already exist with name "ExerciseDatabase" one is created, second param a version number in case we make a change and the user already has a previous version stored in broowser
    const request = indexedDB.open("ExerciseDatabase", 1);

    // error checks before we create schema on database
    request.onerror = function (event) {
        console.error("An error occurred with IndexedDB");
        console.error(event);
    };

    // create schema of database
    request.onupgradeneeded = function () {
        const db = request.result; // db is the result of the open request, which is the exercise database
        if(!db.objectStoreNames.contains("ExerciseDatabase")) {
            const store = db.createObjectStore("exercises", { keyPath: "id" }); // creating object store eqquivalent to creating tables in SQL
            store.createIndex("muscle_idx", ["muscle"], { unique: false }); // compound index to search for exercises by difficulty and muscle grouup
            // above we specify that it is not unique as we can have exercises with the same  difficulty and muscles trained
        }
    };

    request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction("exercises", "readwrite");
        const store = transaction.objectStore("exercises");
        store.put({ id: 1, name: "squat", muscle: "glute", difficulty: "easy" });
        transaction.oncomplete = function () {
            db.close();
        };
        console.log('Database loaded successfully!');
    }
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
                <Route path="/" element={<SelectDifficulty/>} />
                <Route exact path="/select/body-part" element={<SelectBodyPart/>}/>
                <Route exact path="/select/difficulty" element={<SelectDifficulty/>}/>
                <Route exact path="/select/duration" element={<SelectDuration/>}/>
                <Route exact path="/select/focus" element={<SelectFocus/>}/>
                <Route exact path="/select/muscles" element={<SelectMuscles/>}/>
            </Routes>
        </div>
    );
}

export default App;