import { createApi } from '@reduxjs/toolkit/query/react';
import {
  AztcWithdrawEntry,
  CreateAztcWithdraw,
  ExchangeWithdrawRateQuery,
  ExchangeWithdrawRateResponse,
} from './types';
// eslint-disable-next-line import/no-cycle
import { baseQueryWithReauth } from '../../../utils/RTKBaseQueryWithReauth';

export const aztcWithdrawApi = createApi({
  reducerPath: 'aztcWithdrawApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    exchangeWithdrawRate: builder.query<
      ExchangeWithdrawRateResponse,
      ExchangeWithdrawRateQuery
    >({
      query: (params: ExchangeWithdrawRateQuery) => ({
        url: `/withdrawal/exchange-rate`,
        params,
      }),
    }),
    withdrawAztc: builder.mutation<AztcWithdrawEntry, CreateAztcWithdraw>({
      query: (body) => ({
        url: `/withdrawal`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useExchangeWithdrawRateQuery, useWithdrawAztcMutation } =
  aztcWithdrawApi;
