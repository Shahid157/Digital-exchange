import { useMemo } from 'react';
import moment from 'moment';
import {
  STAKING_CURRENCY_LEGACY_TICKER,
  StakingEntry,
  StakingTypes,
} from '../staking.types';

export default function useEntries(
  type: StakingTypes,
  entries?: StakingEntry[]
) {
  return useMemo(() => {
    if (!entries) return [];

    return entries.filter((item) => {
      if (
        item.snapshot.type !== type ||
        item.currency !== STAKING_CURRENCY_LEGACY_TICKER
      ) {
        return false;
      }
      const createdAt = moment(item.createdAt);
      const currentDate = moment();
      return (
        item.status === 'Active' && currentDate.diff(createdAt, 'days') <= 30
      );
    });
  }, [entries]);
}
