import { useMemo } from 'react';
import moment from 'moment';
import { Transaction } from '../../../../../__generated__/graphql';
import { StakingTypes } from '../../../../../shared/store/slices/stakings/staking.types';

const reducer = (acc: number, item: Transaction) => {
  if (item.payload?.stakingType !== StakingTypes.CryptoBank) {
    return acc;
  }
  acc += item.movements[0].amount;
  return acc;
};

export default function useEarnedPnls(transactions: Transaction[]) {
  return useMemo(() => {
    const last24Earns = transactions.filter((item) => {
      const createdAt = moment(item.createdAt);
      const currentDate = moment();
      return currentDate.diff(createdAt, 'days') <= 1;
    });

    const last24EarnsAmount = last24Earns.reduce(reducer, 0);
    const last30EarnsAmount = transactions.reduce(reducer, 0);

    return {
      last24: last24EarnsAmount,
      last30: last30EarnsAmount,
    };
  }, [transactions]);
}
