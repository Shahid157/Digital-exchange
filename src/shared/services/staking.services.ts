/* eslint-disable import/prefer-default-export */
import { BS_CONFIG } from './apisConfig';
import { axiosInstance } from './axiosInstance';

const baseUrl = `${BS_CONFIG.BASE_URL}/api`;

export async function getTransactions(
  walletId: string,
  transactionType: string
) {
  const query = transactionType ? `?type=${transactionType}` : '';
  return axiosInstance.get(
    `${baseUrl}/wallets/${walletId}/transactions${query}`
  );
}
