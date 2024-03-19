import { useMemo } from 'react';
import moment from 'moment';
import { Transaction } from '../../../../../__generated__/graphql';

export default function useEarns(
  currency: string,
  transactions?: Transaction[]
) {
  return useMemo(() => {
    if (!transactions) return [];

    return transactions.filter((item: any) => {
      if (!item.payload || !item.payload.currency) return false;
      if (item.payload.currency !== currency) return false;
      const createdAt = moment(item.createdAt);
      const currentDate = moment();
      return currentDate.diff(createdAt, 'days') <= 30;
    });
  }, [transactions]);
}
