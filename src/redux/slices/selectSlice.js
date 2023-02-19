import { createSlice } from '@reduxjs/toolkit'

// Javascript object to link body part selection with muscles
const musclesOptions = {
  "Core": ["obliques", "abdomen"],
  "Lower Body": ["glutes", "quads", "hamstrings", "calves"],
  "Upper Body": ["lats", "back", "shoulders", "chest", "biceps", "triceps"]

};

// Stores "select" state globally so that it can be accessed from anywhere in the application 
export const selectSlice = createSlice({
  name: 'select',
  initialState: {
    activeTab: "",
    navDirection: "forwards",
    navigateForward: false,
    difficulty: "",
    focus: "",
    duration: "",
    muscleGroups: [],
    muscles: []

  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },    
    setNavigateForward: (state, action) => {
      state.navigateForward = action.payload;
    },
    setNavDirection: (state, action) => {
      console.log('hi');
      state.navDirection = action.payload;
    },
    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },
    setFocus: (state, action) => {
      state.focus = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setMuscleGroups: (state, action) => {
      if (state.muscleGroups.includes(action.payload)) { // if bodyPart already selected
        state.muscleGroups = state.muscleGroups.filter((muscleGroup) => (muscleGroup!=action.payload)); // remove bodyPart
        const muscleGroupMuscles = musclesOptions[action.payload];
        state.muscles = state.muscles.filter((muscle) => (!muscleGroupMuscles.includes(muscle)));
      } else { // if bodyPart not already selected
        state.muscleGroups = [...state.muscleGroups, action.payload]; // add bodyPart
        const muscleGroupMuscles = musclesOptions[action.payload];
        state.muscles = [...state.muscles, ...muscleGroupMuscles];
      }
    },
    setMuscles: (state, action) => {
      if (state.muscles.includes(action.payload)) {
        state.muscles = state.muscles.filter((muscle) => (muscle!=action.payload));
      } else {
        state.muscles = [...state.muscles, action.payload];

      }
    }
  },
});

// The "Actions" will be used to change the state from anywhere in application - e.g.: dispatch(action(param))
export const { 
  setActiveTab,
  setNavDirection,
  setNavigateForward,
  setDifficulty, 
  setFocus, 
  setDuration, 
  setMuscleGroups, 
  setMuscles
 } = selectSlice.actions;

export default selectSlice.reducer