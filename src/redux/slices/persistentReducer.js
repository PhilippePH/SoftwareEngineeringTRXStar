import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { persistedSelectReducer } from './selectSlice';
import { persistedPlaylistReducer } from './playlistSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedSelectConfig = {
  key: 'select',
  storage,
};


const store = configureStore({

  reducer: {
    select: persistedSelectReducer, 
    playlist: persistedPlaylistReducer
  },

})

export const persistor = persistStore(store);
