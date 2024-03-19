/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from './axiosInstance';
import { BS_CONFIG } from './apisConfig';

const baseUrl = `${BS_CONFIG.BASE_URL}/api`;

// Get List of tokens

export const swapCoins = async (id: string, payload: any) =>
  axiosInstance.post(`${baseUrl}/wallets/${id}/swap`, payload);
export const swapLocalCurrency = async (payload: any) =>
  axiosInstance.post(`${baseUrl}/wallets/bsp/swap`, payload);

export const estimatedSwapAmount = async (payload: any) =>
  axiosInstance.get(
    `wallets/swap/convertion_estimated?fromCurrency=${payload?.fromCurrency}&toCurrency=${payload?.toCurrency}&fromAmount=${payload?.fromAmount}`
  );
export const estimatedSwapLocalCurrencyAmount = async (payload: any) =>
  axiosInstance.get(
    `wallets/bsp/swap/convertion_estimated?fromCurrency=${payload?.fromCurrency}&toCurrency=${payload?.toCurrency}&fromAmount=${payload?.fromAmount}`
  );
