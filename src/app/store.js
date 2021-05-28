import { configureStore } from '@reduxjs/toolkit';
import seatsReducer from '../slices/seatsSlice';

export const store = configureStore({
  reducer: {
    seats: seatsReducer,
  },
});
