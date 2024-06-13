import { configureStore } from '@reduxjs/toolkit';
import shiftsReducer from '../features/shifts/shiftsSlice'

export const store = configureStore({
  reducer: {
    shifts: shiftsReducer
  }
});
