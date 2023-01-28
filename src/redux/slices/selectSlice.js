import { createSlice } from '@reduxjs/toolkit'

// Javascript object to link body part selection with muscles
const musclesOptions = {
  "Core": ["Obliques", "Upper abdomen", "Lower abdomen", "Lower back"],
  "Lower Body": ["Glutes", "Quads", "Hamstrings", "Calves"],
  "Upper body": ["Lats", "Back", "Shoulders", "Chest", "Biceps", "Triceps"]
};

// Stores "select" state globally so that it can be accessed from anywhere in the application 
export const selectSlice = createSlice({
  name: 'select',
  initialState: {
    difficulty: "",
    focus: "",
    duration: "",
    bodyParts: [],
    muscles: []
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
    setBodyParts: (state, action) => {
      if (state.bodyParts.includes(action.payload)) { // if bodyPart already selected
        state.bodyParts = state.bodyParts.filter((bodyPart) => (bodyPart!=action.payload)); // remove bodyPart
        const bodyPartMuscles = musclesOptions[action.payload];
        state.muscles = state.muscles.filter((muscle) => (!bodyPartMuscles.includes(muscle)));
      } else { // if bodyPart not already selected
        state.bodyParts = [...state.bodyParts, action.payload]; // add bodyPart
        const bodyPartMuscles = musclesOptions[action.payload];
        state.muscles = [...state.muscles, ...bodyPartMuscles];
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
  setDifficulty, 
  setFocus, 
  setDuration, 
  setBodyParts, 
  setMuscles
 } = selectSlice.actions;

export default selectSlice.reducer