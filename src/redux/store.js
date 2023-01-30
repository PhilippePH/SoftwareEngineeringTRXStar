import { configureStore } from '@reduxjs/toolkit'
import selectReducer from './slices/selectSlice'

// configure global store 
export const store = configureStore({
  reducer: {
    select: selectReducer,
  },
})