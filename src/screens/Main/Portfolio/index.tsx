/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PortfolioChart from 'shared/components/PortfolioChart';
import AppHeader from 'shared/components/AppHeader';
import { THEME } from 'shared/theme';
import { ICONS } from 'assets/images/icons';
import AppText from 'shared/components/AppText';
import ROUTE_NAMES from 'routes/RouteNames';
import { Icons } from 'shared/components/AnyIcon';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { RF } from 'shared/theme/responsive';
import useMergedSameCoins from 'shared/hooks/useSameCoins';
import { useWalletWithCoins } from '../Home/hooks/useWalletWithCoins';
import CoinAssetListItem from '../../../shared/components/CoinAssets/CoinAssetListItem';
import { RootState } from '../../../shared/store';
import { setPortfolioHideSmallBalance } from '../../../shared/store/reducers/userReducer';
import PrimaryCheckboxV2 from '../../../shared/components/PrimaryCheckboxV2';

function PortfolioScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { t } = useTranslation(['all']);
  const wallet = useWalletWithCoins();
  const coins = wallet.data?.coins || [];
  const mergedCoins = useMergedSameCoins();
  const dispatch = useAppDispatch();
  const { portfolioHideSmallBalance } = useAppSelector(
    (state: RootState) => state.user
  );
  const balanceCheckHandler = () => {
    dispatch(setPortfolioHideSmallBalance(!portfolioHideSmallBalance));
  };

  const listHeaderComponent = useMemo(
    () => (
      <>
        <PortfolioChart coins={coins} />

        <View style={styles.header}>
          <AppText h3 semiBold>
            {t('Assets', { ns: ['all'] })}
          </AppText>

          <AppText h3>
            {t('Value')}{' '}
            <FontAwesome name="chevron-down" size={10} color="white" />
          </AppText>
        </View>
        <PrimaryCheckboxV2
          viewStyle={{ marginHorizontal: 0 }}
          checked={portfolioHideSmallBalance}
          setChecked={balanceCheckHandler}
          onCheckColor={THEME.COLORS.primary}
          title={t('Hide Small Balances')}
        />
      </>
    ),
    [coins, portfolioHideSmallBalance]
  );

  const listEmptyComponent = useMemo(
    () => (
      <AppText
        color={THEME.COLORS.textGrey}
        medium
        style={{ textAlign: 'center' }}
      >
        {t('No Coins in the wallet', { ns: ['all'] })}
      </AppText>
    ),
    []
  );

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <AppHeader
        leftIcon="back"
        rightImage={ICONS.HISTORYC}
        rightIconType={Icons.MaterialCommunityIcons}
        onPressRightIcon={() => {
          // @ts-ignore
          navigation.navigate(ROUTE_NAMES.TRANSACTIONS_HISTORY);
        }}
        title={t('Portfolio', { ns: ['all'] })}
      />
      <FlatList
        data={
          (portfolioHideSmallBalance
            ? mergedCoins?.filter(
                (coin: any) => coin?.amount * coin?.currency?.price > 0.9
              )
            : mergedCoins) || []
        }
        contentContainerStyle={{
          paddingBottom: RF(30),
          paddingHorizontal: THEME.PADDING.LOW,
        }}
        keyExtractor={(item: any) => item.id}
        ListEmptyComponent={listEmptyComponent}
        ListHeaderComponent={listHeaderComponent}
        renderItem={({ item, index }) => (
          <CoinAssetListItem
            isPortfolio={false}
            disabled={wallet.loading}
            key={index}
            item={item as any}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  marginLeft: {
    marginLeft: THEME.MARGIN.LOW,
  },
});

export default PortfolioScreen;
