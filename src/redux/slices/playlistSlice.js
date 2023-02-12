import { createSlice } from '@reduxjs/toolkit';

const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    playlistData: []
  },
  reducers: {
    addPlaylist: (state, action) => {
      state.playlistData = action.payload;
    }
  }
});

const { actions, reducer } = playlistSlice;
const { addPlaylist } = actions;

export default reducer;
export { addPlaylist };