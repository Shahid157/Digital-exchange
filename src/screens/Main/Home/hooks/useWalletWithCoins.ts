import { useMemo } from 'react';
import { useAppSelector } from '../../../../shared/hooks/redux';
import { CoinWithCurrency } from '../../../../shared/types';
import { RootState } from '../../../../shared/store';

export const useWalletWithCoins = () => {
  const currencies = useAppSelector(
    (state: RootState) => state.currencies.currencies
  );
  const wallet = useAppSelector((state: RootState) => state.wallets.wallet);

  return useMemo(() => {
    if (!wallet || !currencies?.length)
      return {
        error: null,
        loading: true,
        data: null,
      };

    const coins = wallet!.coins
      .map((coin) => {
        const currency = currencies.find(
          (curreny) => curreny.legacyTicker === coin.id
        );
        return {
          ...coin,
          currency,
        } as CoinWithCurrency;
      })
      .filter((coin) => coin.currency);

    return {
      error: null,
      loading: false,
      data: {
        ...wallet,
        coins,
      },
    };
  }, [currencies, wallet]);
};
