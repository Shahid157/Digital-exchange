/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../../models/types';

const initialState: UserState = {
  onboardingPercentage: 0,
  otpSentTime: null,
  portfolioHideSmallBalance: false,
  homeHideSmallBalance: false,
  tranferModal: false,
  lastUsername: null,
  userUUID: null,
  publicKey: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => ({
      ...initialState,
      lastUsername: state.lastUsername,
      userUUID: state.userUUID,
    }),
    setOnboardingPercentage: (state, action) => {
      state.onboardingPercentage = action.payload;
    },
    setOtpSentTime: (state, action) => {
      state.otpSentTime = action.payload;
    },
    setPortfolioHideSmallBalance: (state, action) => {
      state.portfolioHideSmallBalance = action.payload;
    },
    setHomeHideSmallBalance: (state, action) => {
      state.homeHideSmallBalance = action.payload;
    },
    setUserUUID: (state, action) => {
      state.userUUID = action.payload;
    },
    setPublicKey: (state, action) => {
      state.publicKey = action.payload;
    },
    setLastUsername: (state, action) => {
      state.lastUsername = action.payload;
    },
  },
});

export const {
  resetUser,
  setOnboardingPercentage,
  setOtpSentTime,
  setPortfolioHideSmallBalance,
  setHomeHideSmallBalance,
  setLastUsername,
  setUserUUID,
  setPublicKey,
} = userSlice.actions;

export default userSlice.reducer;
