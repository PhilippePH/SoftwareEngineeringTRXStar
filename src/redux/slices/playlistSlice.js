import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from 'redux-persist'

const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    playlistData: [],
    playlistSaved: false,
    playlistLoaded: false,
  },
  reducers: {
    addPlaylist: (state, action) => {
      state.playlistData = action.payload;
    }, 
    inputToPlaylist: (state, action) => {
      const arr = action.payload;
      const value = arr[0]; 
      const index = arr[1];
      console.log(value)
      console.log(index)
      const updatedPlaylistData = [state.playlistData];
      updatedPlaylistData[0][index] = value;
      console.log("updated", updatedPlaylistData)
      state.playlistData = []
      state.playlistData = updatedPlaylistData[0];
    },
    removeFromPlaylist:(state, action) => {
      const updatedPlaylistData = [state.playlistData];
      updatedPlaylistData[0].splice(action.payload, 1);
      state.playlistData = []
      state.playlistData = updatedPlaylistData[0];
    },
    initialisePlaylist: (state, action) => {
      state.playlistData = action.payload;
      state.playlistSaved = false;
      state.playlistLoaded = false;
    },
    updateSaved: (state, action) => {
      state.playlistSaved = action.payload;
    },
    updateLoaded: (state, action) => {
      state.playlistLoaded = action.payload;
    },
    moveDownExercise:(state, action) => {
      const updatedPlaylistData = [state.playlistData];
      var tempExercise =  updatedPlaylistData[0][action.payload +1];
      updatedPlaylistData[0][action.payload+1] = updatedPlaylistData[0][action.payload];
      updatedPlaylistData[0][action.payload] = tempExercise; 
      state.playlistData = []
      state.playlistData = updatedPlaylistData[0];
    },
    moveUpExercise:(state, action) => {
      const updatedPlaylistData = [state.playlistData];
      var tempExercise =  updatedPlaylistData[0][action.payload-1];
      updatedPlaylistData[0][action.payload-1] = updatedPlaylistData[0][action.payload];
      updatedPlaylistData[0][action.payload] = tempExercise; 
      state.playlistData = []
      state.playlistData = updatedPlaylistData[0];
    }
  }
});

//const { actions, reducer } = playlistSlice;
export const { addPlaylist, initialisePlaylist, inputToPlaylist, removeFromPlaylist, updateSaved, updateLoaded, moveDownExercise, moveUpExercise } = playlistSlice.actions;

const playlistPersistConfig = {
  key: 'playlist',
  storage: storage,
  whitelist: ['playlistData', 'playlistSaved']
};

export const persistedPlaylistReducer = persistReducer(playlistPersistConfig, playlistSlice.reducer);


//export default reducer;
//export { addPlaylist, initialisePlaylist, inputToPlaylist, removeFromPlaylist, updateSaved};
