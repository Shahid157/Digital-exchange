/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-return-await */
/* eslint-disable no-restricted-syntax */
import { axiosInstance } from './axiosInstance';
import config from './apisConfig';

export const fethcCoins = async () =>
  axiosInstance.get(config.marketPlace.getCoins);
export const fetchWallets = async () =>
  axiosInstance.get(config.marketPlace.getWallets);

export const compareAndCalculatePricing = (walletCoins: any, tokens: any) => {
  const resultData = [];
  if (!walletCoins || !tokens) {
    return [];
  }

  // Loop through walletCoins
  for (const item1 of walletCoins) {
    const matchingItem2 = tokens?.find(
      (item2: any) => item2.symbol === item1.ticker
    );
    if (matchingItem2) {
      const calculatedPrice = item1.amount * matchingItem2.price;
      const { price } = matchingItem2;
      const { name } = matchingItem2;
      const { image } = matchingItem2;

      const combinedObject = {
        ...item1,
        name,
        calculatedPrice,
        price,
        image,
      };
      resultData.push(combinedObject);

      // }
    }
  }

  return resultData;
};

export const sendOTP = async (payload: any) =>
  await axiosInstance.post(config.assetTransfer.sendOTP, payload);

export const sendAssetApi = async (payload: any) =>
  await axiosInstance.post(config.assetTransfer.sendAsset, payload);
export const sendAssetV2Api = async (payload: any) =>
  await axiosInstance.post(config.assetTransfer.sendAssetV2, payload);
