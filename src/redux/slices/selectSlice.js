import { createSlice } from '@reduxjs/toolkit'

// Javascript object to link body part selection with muscles
const musclesOptions = {
  "absCore": ["obliques", "abdomen"],
  "lowerBody": ["glutes", "quads", "hamstrings", "calves"],
  "upperBody": ["lats", "back", "shoulders", "chest", "biceps", "triceps"]

};

// Stores "select" state globally so that it can be accessed from anywhere in the application 
export const selectSlice = createSlice({
  name: 'select',
  initialState: {
    difficulty: "",
    focus: "",
    duration: "",
    muscle_group: [],
    muscle_type: []

  },
  reducers: {
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
      if (state.muscle_group.includes(action.payload)) { // if bodyPart already selected
        state.muscle_group = state.muscle_group.filter((bodyPart) => (bodyPart!=action.payload)); // remove bodyPart
        const bodyPartMuscles = musclesOptions[action.payload];
        state.muscle_type = state.muscle_type.filter((muscle) => (!bodyPartMuscles.includes(muscle)));
      } else { // if bodyPart not already selected
        state.muscle_group = [...state.muscle_group, action.payload]; // add bodyPart
        const bodyPartMuscles = musclesOptions[action.payload];
        state.muscle_type = [...state.muscle_type, ...bodyPartMuscles];
      }
    },
    setMuscles: (state, action) => {
      if (state.muscle_type.includes(action.payload)) {
        state.muscle_type = state.muscle_type.filter((muscle) => (muscle!=action.payload));
      } else {
        state.muscle_type = [...state.muscle_type, action.payload];

      }
    }
  },
});

// The "Actions" will be used to change the state from anywhere in application - e.g.: dispatch(action(param))
export const { 
  setDifficulty, 
  setFocus, 
  setDuration, 
  setMuscleGroups, 
  setMuscles
 } = selectSlice.actions;

export default selectSlice.reducer