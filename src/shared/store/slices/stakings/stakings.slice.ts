/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { SkakingState } from './staking.types';

const initialState: SkakingState = {
  loading: false,
  error: null,
  entries: [],
};

const slice = createSlice({
  name: 'stakings',
  initialState,
  reducers: {
    setEntries: (state, action) => {
      state.entries = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setEntries, setLoading, setError } = slice.actions;
export default slice.reducer;
