import { useMemo } from 'react';
import { useWalletWithCoins } from './useWalletWithCoins';

export const useWalletGlobalBalances = () => {
  const walletWithCoins = useWalletWithCoins();
  return useMemo(() => {
    const { data } = walletWithCoins;
    if (!data) return [0, 0];

    let total = 0;
    data.coins.forEach((coin: any) => {
      total += coin.amount * coin.currency.price;
    });
    let blocked = 0;
    data.coins.forEach((coin: any) => {
      blocked += coin.pendingAmount * coin.currency.price;
    });

    return [total, blocked];
  }, [walletWithCoins]);
};
