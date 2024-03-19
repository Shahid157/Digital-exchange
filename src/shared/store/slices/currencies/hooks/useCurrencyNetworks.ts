import { useMemo } from 'react';
import { useAppSelector } from '../../../../hooks/redux';
import { Currency } from '../../../../../__generated__/graphql';

export default function useCurrencyNetowrks(currency: Currency) {
  const currencies = useAppSelector((state) => state.currencies.currencies);

  return useMemo(
    () =>
      currencies
        .filter((c) => c.ticker === currency.ticker && c.enabled)
        .map((c) => c.network),
    [currencies, currency]
  );
}
