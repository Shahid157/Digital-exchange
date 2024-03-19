import { createApi } from '@reduxjs/toolkit/query/react';
import {
  AztcDepositPaymentEntry,
  AztcDepositPaymentMethod,
  CreateAztcDepositPaymentEntry,
  ExchangeRateQuery,
  ExchangeRateResponse,
} from './aztc-deposits.types';
// eslint-disable-next-line import/no-cycle
import { baseQueryWithReauth } from '../../../utils/RTKBaseQueryWithReauth';

export interface CreateStakingEntry {
  staking: string;
  amount: number;
  currency: string;
}

export const aztcDepositsApi = createApi({
  reducerPath: 'aztcDepositsApi',
  tagTypes: ['aztc-deposit-payment-methods', 'aztc-deposit-payment-entries'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    paymentMethods: builder.query<AztcDepositPaymentMethod[], string>({
      providesTags: ['aztc-deposit-payment-methods'],
      query: () => `/payments/methods?type=Fiat`,
    }),
    exchangeRate: builder.query<ExchangeRateResponse, ExchangeRateQuery>({
      query: (params: ExchangeRateQuery) => ({
        url: `/payments/exchange-rate`,
        params,
      }),
    }),
    createEntry: builder.mutation<
      AztcDepositPaymentEntry,
      CreateAztcDepositPaymentEntry
    >({
      invalidatesTags: ['aztc-deposit-payment-entries'],
      query: (body) => {
        const data = new FormData();
        data.append('paymentMethodId', body.paymentMethodId);
        data.append('type', body.type);
        data.append('movementType', body.movementType);
        data.append('fromAmount', body.fromAmount.toString());
        data.append('transactionId', body.transactionId);
        data.append('toTicker', body.toTicker);
        data.append('voucher', body.attachemnt);

        return {
          url: `/payments`,
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const {
  usePaymentMethodsQuery,
  useExchangeRateQuery,
  useCreateEntryMutation,
} = aztcDepositsApi;
