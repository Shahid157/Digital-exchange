import React from 'react';
import { FlatList, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/hooks/redux';
import { emitRefreshWalletSubscription } from 'shared/store/slices/oneTimeEvents/oneTimeEvents.slice';
import AppHeader from 'shared/components/AppHeader';
import CoinAssetListItem from 'shared/components/CoinAssets/CoinAssetListItem';
import { THEME } from 'shared/theme';
import AppText from 'shared/components/AppText';
import { useWalletWithCoins } from '../hooks/useWalletWithCoins';
import { GenericNavigation } from '../types';
import styles from './styles';

function BlockedFunds(props: GenericNavigation) {
  const { t } = useTranslation(['all']);
  const dispatch = useAppDispatch();
  const wallet = useWalletWithCoins();
  const coins = wallet.data?.coins || [];

  const handleOnRefresh = () => {
    dispatch(emitRefreshWalletSubscription());
  };

  const filteredCoins = coins.filter((coin) => coin.pendingAmount !== 0);

  return (
    <View style={{ flex: 1, backgroundColor: THEME.COLORS.primaryBackground }}>
      <AppHeader title={t('Blocked Funds')} leftIcon="back" />
      <FlatList
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <AppText h2 semiBold>
              {t('no blocked funds')}
            </AppText>
          </View>
        }
        data={filteredCoins}
        onRefresh={handleOnRefresh}
        refreshing={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <CoinAssetListItem
            disabled={wallet.loading}
            key={index}
            item={{
              ...item,
              amount: item.pendingAmount, // workaround to show pending amount instead of total amount
            }}
          />
        )}
      />
    </View>
  );
}

export default BlockedFunds;
