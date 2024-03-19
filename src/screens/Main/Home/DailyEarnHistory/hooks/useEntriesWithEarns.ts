import { useMemo } from 'react';
import { Transaction } from '../../../../../__generated__/graphql';
import { StakingEntry } from '../../../../../shared/store/slices/stakings/staking.types';

export interface EntryWithEarns extends StakingEntry {
  earns: Transaction[];
}

/**
 * Hook to get entries with earns
 * @param entries, staking entries
 * @param earns, staking earns
 * @returns entries with earns
 */
export default function useEntriesWithEarns(
  entries: StakingEntry[],
  earns: Transaction[]
): EntryWithEarns[] {
  return useMemo(
    () =>
      entries
        .map((entry) => {
          const entryEarns = earns.filter(
            (earn) => earn.payload?.stakingEntry === entry._id
          );
          return {
            ...entry,
            earns: entryEarns,
          };
        })
        .reverse(),
    [entries, earns]
  );
}
