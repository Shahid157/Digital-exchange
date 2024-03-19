import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import ProfileHeader from 'shared/components/ProfileHeader';
import useMergedSameCoins from 'shared/hooks/useSameCoins';
import { RootState } from 'shared/store';
import { setHomeHideSmallBalance } from 'shared/store/reducers/userReducer';
import { THEME } from 'shared/theme';
import { CoinWithCurrency } from 'shared/types';
import CoinAssetListItem from '../../../shared/components/CoinAssets/CoinAssetListItem';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux';
import { emitRefreshWalletSubscription } from '../../../shared/store/slices/oneTimeEvents/oneTimeEvents.slice';
import CoinListHeader from './components/CoinListHeader';
import HomeFlatlistHeader from './components/HomeFlatlistHeader';
import { useWalletWithCoins } from './hooks/useWalletWithCoins';
import { GenericNavigation } from './types';

function HomeV2(props: GenericNavigation) {
  const { t } = useTranslation(['all']);
  const dispatch = useAppDispatch();
  const wallet = useWalletWithCoins();
  const mergedCoins = useMergedSameCoins();

  const { homeHideSmallBalance } = useAppSelector(
    (state: RootState) => state.user
  );

  const balanceCheckHandler = async () => {
    await dispatch(setHomeHideSmallBalance(!homeHideSmallBalance));
  };

  const handleOnRefresh = () => {
    dispatch(emitRefreshWalletSubscription());
  };

  const mergedArray: CoinWithCurrency[] = useMemo(() => {
    // Merge mergedCoins and tempCoins arrays
    const result = mergedCoins;
    if (!homeHideSmallBalance) {
      return result;
    }
    return result.filter(
      (coin: any) => coin?.amount * coin?.currency?.price > 0.9
    );
  }, [mergedCoins, homeHideSmallBalance]);

  useEffect(() => {
    if (!wallet.error) {
      return;
    }
    dispatch(emitRefreshWalletSubscription());
  }, [wallet.error]);

  useEffect(() => {
    if (!wallet.error) {
      return;
    }
    dispatch(emitRefreshWalletSubscription());
  }, [wallet.error]);

  useEffect(() => {
    if (!wallet.error) {
      return;
    }
    dispatch(emitRefreshWalletSubscription());
  }, [wallet.error]);

  return (
    <>
      <ProfileHeader />
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            tintColor={THEME.COLORS.secondaryYellow}
            onRefresh={handleOnRefresh}
          />
        }
      >
        <HomeFlatlistHeader
          setChecked={balanceCheckHandler}
          checked
          t={t}
          navigation={props.navigation}
        />
        <View style={styles.assetsContainer}>
          <CoinListHeader
            setChecked={balanceCheckHandler}
            checked={homeHideSmallBalance}
            t={t}
          />
          {mergedArray.map((item) => (
            <CoinAssetListItem
              key={item.id}
              disabled={wallet.loading}
              item={item}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  assetsContainer: {
    padding: 16,
    backgroundColor: '#191C1B',
    borderTopStartRadius: 17,
    borderTopEndRadius: 17,
  },
});

export default HomeV2;
