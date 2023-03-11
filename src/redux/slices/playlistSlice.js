import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from 'redux-persist'
import { getCardio } from '../../scripts/algorithm'

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
    },
    updateRest:(state, action) => {
      var newTime = action.payload[0];
      // var changeForCardio = action.payload[1];
      // console.log(changeForCardio); 
      const updatedPlaylistData = [state.playlistData]; // fetches the most recent data
      var playlistLength = updatedPlaylistData[0].length;

      for(var i = 0; i < playlistLength; i++){
        if(updatedPlaylistData[0][i].type == "rest" && newTime > 0)
          updatedPlaylistData[0][i].time = newTime;

          // if user wants to replace rest for cardio
        // else if(updatedPlaylistData[0][i].type == "rest" && changeForCardio)
        // {
          // This does all filtering and updating code is in algorithm.js
          // getCardio(i); 
        // }


      }
      state.playlistData = [] // empties the playlist
      state.playlistData = updatedPlaylistData[0]; // saves updated playlist into original playlist attribute
    }
  }
});

//const { actions, reducer } = playlistSlice;
export const { addPlaylist, initialisePlaylist, inputToPlaylist, removeFromPlaylist, updateSaved, updateLoaded, moveDownExercise, moveUpExercise, updateRest } = playlistSlice.actions;

const playlistPersistConfig = {
  key: 'playlist',
  storage: storage,
  whitelist: ['playlistData', 'playlistSaved']
};

export const persistedPlaylistReducer = persistReducer(playlistPersistConfig, playlistSlice.reducer);


//export default reducer;
//export { addPlaylist, initialisePlaylist, inputToPlaylist, removeFromPlaylist, updateSaved};
