function recommendationAlgorithm(_difficulty, _focus, _time, _muscleGroup, _muscleType)
{
    // fetch valid exercises from database
    var dictPreferences = {
        "difficulty": _difficulty,
        "focus": _focus,
        "time": _time, 
        "muscleGroup" : _muscleGroup,
        "muscleType": _muscleType
      };   
}

function filterDatabase(dictPreferences)
{
    let request = indexedDB.open("ExerciseDatabase", 1);
    request.onsuccess = function(event) {
      let db = event.target.result;
      let objectStore = db.transaction("FilteredExercises").objectStore("FilteredExercises");
      let request = objectStore.getAll();
      request.onsuccess = function(event) {
        let data = event.target.result;

        for (const [key, value] of Object.entries(dictPreferences))
        {
            if (value == None)
                continue; 

            let filteredData = data.filter(item => item.key === value)
            console.log(filteredData);
        }
      };
    };
}