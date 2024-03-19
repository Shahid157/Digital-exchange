import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Currency } from '../../../../__generated__/graphql';

type CurrenciesState = {
  currencies: Currency[];
};

const initialState: CurrenciesState = {
  currencies: [],
};

const slice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    resetCurrencies: () => initialState,
    setCurrencies: (state, action: PayloadAction<Currency[]>) => {
      state.currencies = action.payload;
    },
  },
});

export const { setCurrencies, resetCurrencies } = slice.actions;
export default slice.reducer;
