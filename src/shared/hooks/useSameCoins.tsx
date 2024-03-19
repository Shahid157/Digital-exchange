/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useWalletWithCoins } from 'screens/Main/Home/hooks/useWalletWithCoins';
import { CoinWithCurrency } from '../types';

const useMergedSameCoins = () => {
  const [coinSame, setCoinSame] = useState([]);
  const wallet = useWalletWithCoins();
  const coins = wallet.data?.coins || [];

  useEffect(() => {
    const handleCoinSame = async () => {
      const groupedCoins = coins.reduce((acc: any, obj: any) => {
        let idx = acc.findIndex((item: any) => item.ticker === obj.ticker);
        if (idx === -1) {
          acc.push({ ticker: obj.ticker, amount: 0, pendingAmount: 0 });
          idx = acc?.length - 1;
        }

        acc[idx] = {
          ...obj,
          amount: acc[idx].amount + obj.amount,
          pendingAmount: acc[idx].pendingAmount + obj.pendingAmount,
        };

        return acc;
      }, []);

      // setCoinSame(groupedCoins)
      const sortedGroupedCoins = groupedCoins
        .sort((a: CoinWithCurrency, b: CoinWithCurrency) => {
          if (a.currency.isLocal && b.currency.isLocal) return 0;
          return a.currency.isLocal ? -1 : 1;
        })
        .sort((a: CoinWithCurrency, b: CoinWithCurrency) => {
          const aPrice = a.amount * (a.currency.price || 0);
          const bPrice = b.amount * (b.currency.price || 0);
          return bPrice - aPrice;
        });
      setCoinSame(sortedGroupedCoins);
    };
    handleCoinSame();
  }, [wallet]);

  return coinSame;
};

export default useMergedSameCoins;
