import { useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { CURRENCIES_SUBSCRIPTION, GET_CURRENCIES } from './currencies.gql';

export interface UseCurrenciesProps {
  enableSubscription: boolean;
}

export const useCurrencies = (props: UseCurrenciesProps) => {
  const { enableSubscription } = props;
  const query = useQuery(GET_CURRENCIES);
  const subscription = useSubscription(CURRENCIES_SUBSCRIPTION, {
    skip: !enableSubscription,
    shouldResubscribe: true,
  });

  useEffect(() => {
    query.updateQuery((prev) => {
      const currencies =
        subscription.data?.currenciesUpdated || prev.currencies;
      return {
        currencies: currencies || [],
      };
    });
  }, [subscription.data?.currenciesUpdated]);

  return query;
};
