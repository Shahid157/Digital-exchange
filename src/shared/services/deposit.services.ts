/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from './axiosInstance';
import config, { BS_CONFIG } from './apisConfig';

const baseUrl = `${BS_CONFIG.BASE_URL}/api`;

// Get List of tokens
export const getMinDepositAmount = async (payload: {
  currency: string;
  network: string;
}): Promise<number | undefined> =>
  (
    await axiosInstance.get(
      `${baseUrl}/transactions/deposits/min_amount?currency=${payload.currency}&network=${payload.network}`
    )
  ).data?.minAmount;

export const estimatedDepositAmount = async (payload: any) =>
  axiosInstance.get(
    `${baseUrl}/transactions/deposits/estimated_amount?currency=${payload.currency}&network=${payload.network}&amount=${payload.amount}`
  );

export const depositStatus = async (id: number) =>
  axiosInstance.get(`${baseUrl}/transactions/deposits/${id}/status`);
export const createDeposit = async (payload: any) =>
  axiosInstance.post(config.deposit.createDeposit, payload);

export const getPaymentMethods = async () =>
  axiosInstance.get(config.deposit.getPaymentMethods);
export const getExchangeRate = async (payload: any) =>
  axiosInstance.get(config.deposit.exchangeRate, payload);
