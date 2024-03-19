import { useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import {
  GET_CURRENCY_TIMELINES,
  TIMELINE_SUBSCRIPTION,
} from './priceCharts.gql';

export interface UseCurrenciesProps {
  enableSubscription: boolean;
}

export const usePriceCharts = (props: UseCurrenciesProps) => {
  const { enableSubscription } = props;
  const query = useQuery(GET_CURRENCY_TIMELINES);
  const subscription = useSubscription(TIMELINE_SUBSCRIPTION, {
    skip: !enableSubscription,
    shouldResubscribe: true,
  });

  // whenever subscription data changes, then we update the query data
  useEffect(() => {
    query.updateQuery((prev) => {
      const priceCharts =
        subscription.data?.timelineUpdated || prev.getCurrencyTimelines;
      return {
        getCurrencyTimelines: priceCharts || [],
      };
    });
  }, [subscription.data?.timelineUpdated]);

  return query;
};
