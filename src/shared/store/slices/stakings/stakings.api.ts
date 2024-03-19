import { createApi } from '@reduxjs/toolkit/query/react';
import { Staking, StakingEntry, StakingPolicy } from './staking.types';
import { Transaction } from '../../../../__generated__/graphql';
// eslint-disable-next-line import/no-cycle
import { baseQueryWithReauth } from '../../../utils/RTKBaseQueryWithReauth';

export interface CreateStakingEntry {
  staking: string;
  amount: number;
  currency: string;
}

export const stakingsApi = createApi({
  reducerPath: 'stakingsApi',
  tagTypes: ['stakings', 'entries', 'earns'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    stakings: builder.query<Staking[], string>({
      providesTags: ['stakings'],
      query: () => `/products/staking`,
    }),
    stakingEntries: builder.query<StakingEntry[], string>({
      providesTags: ['entries'],
      query: () => `/products/staking/entries`,
    }),
    stakingEarns: builder.query<Transaction[], string>({
      providesTags: ['earns'],
      query: (walletId: string) =>
        `/wallets/${walletId}/transactions?type=BankStakingEarning`,
    }),
    createEntry: builder.mutation<StakingEntry, CreateStakingEntry>({
      invalidatesTags: ['entries', 'earns'],
      query: (body) => ({
        url: `/products/staking/entries`,
        method: 'POST',
        body,
      }),
    }),
    changeEntryPolicy: builder.mutation<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      { entryId: string; policy: StakingPolicy }
    >({
      invalidatesTags: ['entries'],
      query: ({ entryId, policy }) => ({
        url: `/products/staking/entries/${entryId}/policy`,
        method: 'PATCH',
        body: { policy },
      }),
    }),
  }),
});

export const {
  useStakingsQuery,
  useStakingEntriesQuery,
  useStakingEarnsQuery,
  useCreateEntryMutation,
  useChangeEntryPolicyMutation,
} = stakingsApi;
