import { createSlice } from '@reduxjs/toolkit';

const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    playlistData: [],
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
      state.playlistData = updatedPlaylistData;
    },
    initialisePlaylist: (state, action) => {
      state.playlistData = action.payload;
    }
  }
});

const { actions, reducer } = playlistSlice;
const { addPlaylist, initialisePlaylist, inputToPlaylist } = actions;

export default reducer;
export { addPlaylist, initialisePlaylist, inputToPlaylist };
