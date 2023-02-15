var exerciseDict = {
    "type": "exercise",
    "exercise_name": "",
    "time": null,
    "sets": 1,
    "rest_set": 0,
    "intensity": 0,
    "URL": "",
    "start_time": "",
    "end_time": ""
}

var restDict = {
    "type": "rest",
    "time": 30 // default 
}

var warmupDict = {
    "type": "warmup",
    "time": 300,
    "URL": "",
    "start_time": "",
    "end_time": ""
}

var cooldownDict =
{
    "type": "cooldown",
    "time": 300,
    "URL": "",
    "start_time": "",
    "end_time": ""
}

function timeConvertor(time)
{
    switch(time){
        case("15 min"):
            return 900; 
        case("30 min"):
            return 1800; 
        case("45 min"):
            return 2700; 
        case("60 min"):
            return 3600; 
    }

}


function generateHIT(split, totalTime)
{
    var HIITPlaylist= [];

    // append warmup this is like 5 min
    HIITPlaylist.push(warmupDict); 

    // Cooldown will be another 5 min  so take this from the totalTime
    var timeForExercises = timeConvertor(totalTime) - 10*60; // 10 minutes
    console.log("HIIT Playlist time", timeForExercises); 

    var totalExercises = Math.floor(timeForExercises/(split[0] + split[1]))
    console.log("HIIT total exercises", totalExercises); 

    for(var i = 0; i<totalExercises; i++)
    {
        var newExercise = exerciseDict; 
        var newRest = restDict; 

        Object.assign(newExercise, {time: split[0], intensity: 1, sets: 1, rest_set: 0}); 
        HIITPlaylist.push(exerciseDict); 
        Object.assign(newRest, {time: split[1]}); 
        HIITPlaylist.push(newRest);
    }

    // append cooldown
    HIITPlaylist.push(cooldownDict);

    return HIITPlaylist; 

}


function generateStrength(totalTime, restPeriod)
{
        var StrengthPlaylist= [];
    
        // append warmup this is like 5 min
        StrengthPlaylist.push(warmupDict); 
    
        // Cooldown will be another 5 min  so take this from the totalTime
        var timeForExercises = timeConvertor(totalTime) - 10*60; // 10 minutes
        
        // assume 20s rest between each exercise and rest at middle of workout
        var totalExercises = Math.floor((timeForExercises-restPeriod)/(180)); 
    
        for(var i = 0; i<totalExercises; i++)
        {
            if(i == Math.floor(totalExercises/2))
            {
                var newRest = restDict; 
                Object.assign(newRest, {time: restPeriod});
                StrengthPlaylist.push(newRest); 
            }
            var newExercise = exerciseDict; 
    
            Object.assign(newExercise, {time: 40, rest_set: 20, sets: 3, intensity: 1}); 
            StrengthPlaylist.push(exerciseDict); 
        }
    
        // append cooldown
        StrengthPlaylist.push(cooldownDict);
    
        //console.log("Strength Playlist", StrengthPlaylist);

        return StrengthPlaylist; 
}


function generateEndurance(restPeriod, totalTime){

    var EndurancePlaylist= [];
    
    // append warmup this is like 5 min
    EndurancePlaylist.push(warmupDict); 

    // Cooldown will be another 5 min  so take this from the totalTime
    var timeForExercises = timeConvertor(totalTime) - 10*60; // 10 minutes
    
    // assume 20s rest between each exercise and rest at middle of workout
    var totalExercises = Math.floor((timeForExercises-restPeriod)/(120)); 

    for(var i = 0; i<totalExercises; i++)
    {
        if(i == Math.floor(totalExercises/2))
        {
            var newRest = restDict; 
            Object.assign(newRest, {time: restPeriod});
            EndurancePlaylist.push(newRest); 
        }
        var newExercise = exerciseDict; 

        Object.assign(newExercise, {time: 40, rest_set: 0, sets: 3, intensity: 1}); 
        EndurancePlaylist.push(exerciseDict); 
    }

    // append cooldown
    EndurancePlaylist.push(cooldownDict);

    return EndurancePlaylist; 

}


function generateRecovery(totalTime){

    // assuming warmup and cooldown workouts are all around 5 minutes

    // have 75/25 split of warmup and cooldowns

    var RecoveryPlaylist= [];

    var numberWarmupClips = Math.floor((3*timeConvertor(totalTime)/4)/300); 
    var numberCooldownClips = Math.floor((1*timeConvertor(totalTime)/4)/300); 

    for(var i = 0; i<numberWarmupClips; i++)
    {
        RecoveryPlaylist.push(warmupDict); 
    }

    for(var j = 0; j<numberCooldownClips; j++)
    {
        RecoveryPlaylist.push(cooldownDict); 
    }

    return RecoveryPlaylist; 


}

export async function createStructure(selectedOptions){

    // workout type 
    switch (selectedOptions.focus) {
        case ("Strength"):
            var restPeriod; 
            if (selectedOptions.difficulty == "easy")
                restPeriod = 120;
            else if (selectedOptions.difficulty == "medium")
                restPeriod = 105;
            else
                restPeriod = 90; 

            var StrengthPlaylist = generateStrength(selectedOptions.duration, restPeriod)
            console.log("Strength Playlist", StrengthPlaylist);
            return StrengthPlaylist; 

        case ("HIIT"):
            var split;
            if (selectedOptions.difficulty == "easy")
                split = [30, 45];
            else if (selectedOptions.difficulty == "medium")
                split = [30, 30];
            else
                split = [45, 30]

            var HIITPlaylist = generateHIT(split, selectedOptions.duration);
            console.log("HIIT Playlist", HIITPlaylist);
            return HIITPlaylist; 

        case ("Recovery"):
            var RecoveryPlaylist = generateRecovery(selectedOptions.duration); 
            console.log("Recovery Playlist", RecoveryPlaylist); 
            return RecoveryPlaylist; 

        case ("Endurance"):
            var restPeriod;
            if (selectedOptions.difficulty == "easy")
                restPeriod = 60;
            else if (selectedOptions.difficulty == "medium")
                restPeriod = 45;
            else
                restPeriod = 30; 

            var EndurancePlaylist = generateEndurance(restPeriod, selectedOptions.duration); 
            console.log("Endurance Playlist", EndurancePlaylist);
            return EndurancePlaylist; 
    }
}
