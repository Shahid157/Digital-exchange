/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-return-await */
import { axiosInstance } from './axiosInstance';
import { BS_CONFIG } from './apisConfig';

const baseUrl = `${BS_CONFIG.BASE_URL}/api`;

export const withdrawV2 = async (id: number, payload: any) =>
  await axiosInstance.post(`${baseUrl}/v2/wallets/${id}/withdraw`, payload);

export const transactions = async (id: number) =>
  await axiosInstance.get(`${baseUrl}/wallets/${id}/transactions`);
// eslint-disable-next-line consistent-return
export const transactionType = (index: number) => {
  if (index === 0) {
    return 'Withdraw';
  }
  if (index === 1) {
    return 'Deposit';
  }
  if (index === 2) {
    return 'Swap';
  }
  if (index === 3) {
    return 'Transfer';
  }
};
