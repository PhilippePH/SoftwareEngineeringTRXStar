import { configureStore } from '@reduxjs/toolkit'
import { persistedPlaylistReducer} from './slices/playlistSlice'
import selectReducer from './slices/selectSlice'
import { persistStore, persistReducer } from 'redux-persist';
import {persistedSelectReducer} from './slices/selectSlice'

// configure global store 
export const store = configureStore({
  reducer: {
    //select: selectReducer,
    select: persistedSelectReducer,
    playlist: persistedPlaylistReducer,
  },
});

export const persistor = persistStore(store);