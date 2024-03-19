import { createApi } from '@reduxjs/toolkit/query/react';
import {
  SwapLocalCurrency,
  SwapLocalEntry,
  SwapRateQuery,
  SwapRateResponse,
} from './types';
// eslint-disable-next-line import/no-cycle
import { baseQueryWithReauth } from '../../../utils/RTKBaseQueryWithReauth';

export const aztcSwapApi = createApi({
  reducerPath: 'aztcSwapApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    swapRate: builder.query<SwapRateResponse, SwapRateQuery>({
      query: (params: SwapRateQuery) => ({
        url: `/wallets/bsp/swap/convertion_estimated`,
        params,
      }),
    }),
    swapLocalCurrency: builder.mutation<SwapLocalEntry, SwapLocalCurrency>({
      query: (body) => ({
        url: `/wallets/bsp/swap`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSwapRateQuery, useSwapLocalCurrencyMutation } = aztcSwapApi;
