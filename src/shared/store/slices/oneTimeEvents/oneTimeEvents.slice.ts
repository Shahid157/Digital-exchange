/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

type OneTimeEventsState = {
  onRefreshWalletSubscription: number | null;
  onGoToVerifyKYCNeeded: number | null;
};

const initialState: OneTimeEventsState = {
  onRefreshWalletSubscription: null,
  onGoToVerifyKYCNeeded: null,
};

const slice = createSlice({
  name: 'oneTimeEvents',
  initialState,
  reducers: {
    emitRefreshWalletSubscription: (state) => {
      state.onRefreshWalletSubscription = Date.now();
    },
    emitGoToVerifyKYCNeeded: (state) => {
      state.onGoToVerifyKYCNeeded = Date.now();
    },
  },
});

export const { emitRefreshWalletSubscription, emitGoToVerifyKYCNeeded } =
  slice.actions;
export default slice.reducer;
