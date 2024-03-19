import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Wallet } from '../../../../__generated__/graphql';

type MainWallet = Omit<Wallet, 'transactions'>;

type WalletsState = {
  wallet: MainWallet | null;
};

const initialState: WalletsState = {
  wallet: null,
};

const slice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    resetWallet: () => initialState,
    setWallet: (state, action: PayloadAction<MainWallet | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.wallet = action.payload;
    },
  },
});

export const { setWallet, resetWallet } = slice.actions;
export default slice.reducer;
