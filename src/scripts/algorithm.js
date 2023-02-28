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

export function filterOnKey (tableName, value, indexedDB, database, versionNumber) {
    
    return new Promise(function(resolve, reject) {

        // open database
        const dbPromise = indexedDB.open(database, versionNumber);
        dbPromise.onsuccess = () => {
            const db = dbPromise.result;
            const request = db.transaction(tableName, "readonly")
                .objectStore(tableName)
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
export async function fillStructure(structure, indexedDB) {
    
    //("Before fill", structure)
    var structureCopy = JSON.parse(JSON.stringify(structure));
    // fill each object in workout array

    console.log("Structure copy 1", structureCopy)
    
    for (let i = 1; i < structureCopy.length; i++) {

        //console.log("Item", structureCopy[i])
        try {
            var intensity = structureCopy[i].intensity; // computeRollingAverageIntensity(structureCopy)
        } catch (e) {
            var intensity = null;
        }

        if (structureCopy[i].type !== "rest") {
    
            await getClip(indexedDB, structureCopy[i].type, structureCopy[i].time, intensity)
            .then(async function(clip) {

                //("clip", clip);
                var video_of_clip = await filterOnKey("video", clip.video_ID, indexedDB, "ExerciseDatabase", 1);

                if(structureCopy[i].type === "exercise"){
                    structureCopy[i].exercise_name = clip.exercise_name; 
                }
            
                structureCopy[i].start_time = clip.start_time; 
                structureCopy[i].end_time = clip.end_time; 
                structureCopy[i].URL = video_of_clip[0].URL; 
            })
        }
    }

    console.log("Structure copy 2", structureCopy)

    //console.log("After fill", structureCopy);
    return structureCopy; 
}



export async function getClip(indexedDB, type, time, intensity) {

    switch (type) {
    
        case "rest":
            break;
            
        case "warmup":
            var warmup_clips = await filterDatabase("clip", "exercise_name", "warmup", indexedDB, "ExerciseDatabase", 1);
            return warmup_clips[RandInt(0, warmup_clips.length)]; 
            
        case "cooldown":
            var cooldown_clips = await filterDatabase("clip", "exercise_name", "cooldown", indexedDB, "ExerciseDatabase", 1);
            return cooldown_clips[RandInt(0, cooldown_clips.length)]

        case "exercise":
            var valid_exercises = await filterDatabase("exercises", "intensity", intensity, indexedDB, "FilteredDatabase", 1);
            var exercise_clips = []
            var depth = 0; 
            while (exercise_clips.length === 0 && depth<20) {
                var chosen_exercise = valid_exercises[RandInt(0, valid_exercises.length)]; 
                //console.log("Chosen_exercise", chosen_exercise);
                exercise_clips = await filterDatabase("clip", "exercise_name", chosen_exercise.exercise_name, indexedDB, "FilteredDatabase", 1);
                //console.log("Exercise clips: ", exercise_clips);
                depth++; 
            }
            if(exercise_clips.length === 0)
            {
                console.log("Error could not find valid clips"); 
            }
            //console.log("Selected exercise clip", exercise_clips[RandInt(0, exercise_clips.length)]);
            return exercise_clips[RandInt(0, exercise_clips.length)];

        default:
            console.error("Invalid key");
            return;
    }
}

function RandInt(min, max) {
    return Math.floor(Math.random() * max) + min; 
}
