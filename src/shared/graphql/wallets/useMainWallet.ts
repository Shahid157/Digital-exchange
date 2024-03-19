import { useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { GET_MAIN_WALLET, WALLET_UPDATED_SUBSCRIPTION } from './wallets.gql';

export interface UseMainWalletProps {
  enableSubscription: boolean;
}

export const useMainWallet = (props: UseMainWalletProps) => {
  const { enableSubscription } = props;
  const query = useQuery(GET_MAIN_WALLET);
  const subscription = useSubscription(WALLET_UPDATED_SUBSCRIPTION, {
    variables: { walletUpdatedId: query.data?.mainWallet?.id! },
    skip: !enableSubscription || !query.data?.mainWallet?.id,
    shouldResubscribe: true,
  });

  useEffect(() => {
    query.updateQuery((prev) => {
      const mainWallet = prev.mainWallet || subscription.data?.walletUpdated;
      return { ...prev, mainWallet: mainWallet || null };
    });
  }, [subscription.data?.walletUpdated]);

  return query;
};
