import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/shifts';

export const fetchShifts = createAsyncThunk('shifts/fetchShifts', async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
});

export const bookShift = createAsyncThunk('shifts/bookShift', async (shiftId) => {
  const response = await axios.post(`${BASE_URL}/${shiftId}/book`);
  return response.data;
});

export const cancelShift = createAsyncThunk('shifts/cancelShift', async (shiftId) => {
  const response = await axios.post(`${BASE_URL}/${shiftId}/cancel`);
  return response.data;
});

const shiftsSlice = createSlice({
  name: 'shifts',
  initialState: {
    available: [],
    booked: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShifts.fulfilled, (state, action) => {
        state.available = action.payload.filter(shift => shift);
        state.booked = action.payload.filter(shift => shift.booked);
      })
      .addCase(bookShift.fulfilled, (state, action) => {
        const bookedShift = action.payload;
        state.available = state.available.filter(shift => shift.id !== bookedShift.id);
        state.booked.push(bookedShift);
      })
      .addCase(cancelShift.fulfilled, (state, action) => {
        const canceledShift = action.payload;
        state.booked = state.booked.filter(shift => shift.id !== canceledShift.id);
        state.available.push(canceledShift);
      });
  }
});

export default shiftsSlice.reducer;
