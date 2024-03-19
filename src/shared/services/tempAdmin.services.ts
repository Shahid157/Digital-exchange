import config from './apisConfig';
import { axiosInstance } from './axiosInstance';

export interface IGetBalanceStats {
  dataSet: string;
  timeFrame: string;
  legacyTicker?: string;
  type: 'Deposit' | 'Withdraw';
}
export interface IGetBalanceSwaps {
  dataSet: string;
  timeFrame: string;
  fromLegacyTicker: string;
  toLegacyTicker: string;
}

export const getBalanceStats = async (payload: IGetBalanceStats) =>
  axiosInstance.get(config.tempAdmin.getBalanceStats, {
    params: payload,
  });

export const getBalanceSwaps = async (payload: IGetBalanceSwaps) =>
  axiosInstance.get(config.tempAdmin.getBalanceSwaps, {
    params: payload,
  });
