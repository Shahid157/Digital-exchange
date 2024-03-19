/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignUpUser } from 'shared/types/userSignUpTypes';

interface SignUpState {
  user: SignUpUser | null;
}

const initialState: SignUpState = {
  user: null,
};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SignUpUser>) => {
      state.user = { ...state.user, ...action.payload };
    },
    resetUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, resetUser } = signUpSlice.actions;

export default signUpSlice.reducer;
