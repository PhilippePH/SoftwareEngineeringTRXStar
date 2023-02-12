import { configureStore } from '@reduxjs/toolkit'
import reducer from './slices/playlistSlice'
import selectReducer from './slices/selectSlice'

// configure global store 
export const store = configureStore({
  reducer: {
    select: selectReducer,
    playlist: reducer,
  },
})