/* eslint-disable no-shadow */
export enum StakingTypes {
  DailyEarns = 'DailyEarns',
  CryptoBank = 'CryptoBank',
}

export enum StakingPolicy {
  ReenterOnComplete = 'ReenterOnComplete',
  RefundOnComplete = 'RefundOnComplete',
}

export enum StakingEntryStatus {
  Active = 'Active',
  Completed = 'Completed',
}

export interface StakingSnapshot {
  type: StakingTypes;
  name: string;
  days: number;
  policy: string;
  profit: number;
}

export interface StakingEntry {
  _id: string;
  nextRewardDate: string;
  snapshot: StakingSnapshot;
  status: StakingEntryStatus;
  currency: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Staking {
  _id: string;
  type: StakingTypes;
  name: string;
  days: number;
  policy: StakingPolicy;
  profit: number;
  createdAt: string;
  updatedAt: string;
  currencies: string[];
}

export interface SkakingState {
  loading: boolean;
  error: string | null;
  entries: StakingEntry[];
}

export const STAKING_CURRENCY_LEGACY_TICKER = 'bsp';
