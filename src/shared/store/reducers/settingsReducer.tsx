/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SettingState } from 'shared/models/types';

const initialState: SettingState = {
  language: 'en',
  darkMode: false,
  faceId: false,
  biometryEnabled: false,
  firstTime: true,
  showBalances: true,
  showTotalBal: true,
  pinEnabled: false,
  fcmToken: '',
  currentCurrencyRate: 1,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    resetSettings: (
      state,
      action: PayloadAction<Partial<SettingState> | undefined>
    ) => {
      const override = action.payload || {};
      return {
        ...initialState,
        firstTime: state.firstTime,
        fcmToken: state.fcmToken, // keeps the fcm token
        ...override,
      };
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    setBioMetryEnabled: (state, action) => {
      state.biometryEnabled = action.payload;
    },
    setFirstTime: (state, action) => {
      state.firstTime = action.payload;
    },

    setShowBalances: (state, action) => {
      state.showBalances = action.payload;
    },

    setShowTotalBal: (state, action) => {
      state.showTotalBal = action.payload;
    },

    toggleShowTotalBal: (state) => {
      state.showTotalBal = !state.showTotalBal;
    },

    toggleShowBalances: (state) => {
      state.showBalances = !state.showBalances;
    },
    setPINEnabled: (state, action) => {
      state.pinEnabled = action.payload;
    },
    setFCMToken: (state, action: PayloadAction<string>) => {
      state.fcmToken = action.payload;
    },
  },
});

export const {
  setLanguage,
  setDarkMode,
  setBioMetryEnabled,
  setFirstTime,
  setShowBalances,
  setShowTotalBal,
  setPINEnabled,
  setFCMToken,
  resetSettings,
  toggleShowBalances,
} = settingsSlice.actions;

export default settingsSlice.reducer;
