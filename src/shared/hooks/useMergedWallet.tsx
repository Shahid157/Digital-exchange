import { useState, useEffect } from 'react';
import { useAppSelector } from './redux';
import { RootState } from '../store';

const useMergedWallet = () => {
  const [mergedWallet, setMergedWallet] = useState<any>([]);
  const currencies = useAppSelector(
    (state: RootState) => state.currencies.currencies
  );
  const { wallet } = useAppSelector((state: RootState) => state.wallets);

  useEffect(() => {
    const mergeWalletWithCoin = () => {
      if (!wallet?.coins || !currencies) {
        return;
      }
      const updatedWallet = wallet.coins.map((coin) => {
        const currency = currencies.find(
          (coinItem: any) =>
            coinItem.ticker === coin.ticker && coinItem.network === coin.network
        );

        if (currency) {
          return { ...coin, ...currency };
        }

        return coin;
      });

      setMergedWallet(updatedWallet);
    };

    mergeWalletWithCoin();
  }, [wallet, currencies]);

  return mergedWallet;
};

export default useMergedWallet;
