import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async () => {
    try {
      const response = await axios.get('http://3.223.98.72:1337/api/students');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  students: [],
  searchQuery: '',
  currentPage: 1,
  studentsPerPage: 5,
  loading: false,
  error: null,
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    // Your existing reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true; // Access loading through state object
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false; // Access loading through state object
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false; // Access loading through state object
        state.error = action.error.message;
      });
  },
});

// Export your existing actions and reducers
export const { addStudent, setSearchQuery, setCurrentPage } = studentsSlice.actions;

export default studentsSlice.reducer;
