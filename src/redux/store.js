import { configureStore } from '@reduxjs/toolkit';
import studentSlice from './studentSlice';


const store = configureStore({
  reducer: {
    students: studentSlice
  },
});

export default store;
