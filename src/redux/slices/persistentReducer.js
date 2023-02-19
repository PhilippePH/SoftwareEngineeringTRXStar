import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { persistedSelectReducer } from './selectSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedSelectConfig = {
  key: 'select',
  storage,
};


export const store = configureStore({
  reducer: persistedSelectReducer,
});

export const persistor = persistStore(store);
