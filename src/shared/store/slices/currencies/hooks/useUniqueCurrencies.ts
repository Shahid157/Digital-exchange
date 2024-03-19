import { useMemo } from 'react';
import { useAppSelector } from '../../../../hooks/redux';
import { RootState } from '../../../index';

export interface UseUniqueCurrenciesProps {
  onlyEnabledCoins?: boolean;
  enableLocalCurrency?: boolean;
  enableFiatCurrencies?: boolean;
}

const defaultProps: UseUniqueCurrenciesProps = {
  onlyEnabledCoins: false,
  enableLocalCurrency: false,
  enableFiatCurrencies: false,
};

export default function useUniqueCurrencies(
  props: UseUniqueCurrenciesProps = defaultProps
) {
  const { onlyEnabledCoins, enableLocalCurrency, enableFiatCurrencies } = props;
  const currencies = useAppSelector(
    (state: RootState) => state.currencies.currencies
  );

  return useMemo(() => {
    const map = new Map();

    currencies.forEach((currency) => {
      if (onlyEnabledCoins && !currency.enabled) {
        return;
      }
      if (!enableLocalCurrency && currency.isLocal) {
        return;
      }
      if (!enableFiatCurrencies && currency.isFiat) {
        return;
      }
      if (!map.has(currency.ticker)) {
        map.set(currency.ticker, currency);
      }
    });

    return [...map.values()];
  }, [currencies, onlyEnabledCoins, enableLocalCurrency, enableFiatCurrencies]);
}
