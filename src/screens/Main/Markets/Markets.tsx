import { Currency } from '__generated__/graphql';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AppHeader from 'shared/components/AppHeader';
import MarketCoins from 'shared/components/markets/MarketCoins';
import { COLORS } from 'shared/constants/theme';
import { useHandleFavoriteCoins } from 'shared/hooks/useHandleFavoriteCoins';
import { RF } from 'shared/theme/responsive';
import { THEME } from 'shared/theme';
import MarketSwiperV2 from '../../../shared/components/markets/MarketSwiperV2';
import { GlobalStyleSheet } from '../../../shared/constants/styleSheet';
import MarketTabs from './MarketTabs';
import { usePriceCharts } from '../../../shared/graphql/coinPriceCharts/usePriceCharts';
import useUniqueCurrencies from '../../../shared/store/slices/currencies/hooks/useUniqueCurrencies';
import { RoutesNamesEnum } from './Markets.types';

function Markets() {
  const { t } = useTranslation(['all']);
  const currencyTimelines = usePriceCharts({ enableSubscription: true });
  const currencies = useUniqueCurrencies({ enableLocalCurrency: true });
  const featuredCurrencies = useMemo(
    () => currencies.filter((it) => it.featured),
    [currencies]
  );
  const { favoritesCoins, onFavorite, onUnFavorite } = useHandleFavoriteCoins();
  const [activeTab, setActiveTab] = useState(RoutesNamesEnum.ALL);

  const loading = currencies?.length === 0;

  const currenciesToRender = (tabSelected: RoutesNamesEnum): Currency[] => {
    switch (tabSelected) {
      case RoutesNamesEnum.FEATURED:
        return featuredCurrencies;
      case RoutesNamesEnum.FAVORITES:
        return currencies.filter((it) => favoritesCoins.includes(it.name));
      case RoutesNamesEnum.NEW_LISTING:
        return currencies.filter((it) => it.isLocal);
      default:
        // eslint-disable-next-line no-case-declarations
        const sorted = [...currencies].sort((a, b) => {
          if (a.isLocal && !b.isLocal) return -1;
          if (!a.isLocal && b.isLocal) return 1;
          return a.name.localeCompare(b.name);
        });
        return sorted;
    }
  };

  const [selectedCoin, setSelectedCoin] = useState<Currency | undefined>(
    currenciesToRender(activeTab)[0] // Set the initial value to the first object in the data array
  );

  const currencyTimeline = useMemo(
    () =>
      currencyTimelines.data?.getCurrencyTimelines?.find(
        (item) => item?.ticker === selectedCoin?.ticker
      ),
    [currencyTimelines.data, selectedCoin]
  );

  return (
    <>
      <AppHeader leftIcon="back" title={t('Markets')} />
      <View style={[styles.container]}>
        <FlatList
          contentContainerStyle={{ paddingBottom: RF(10) }}
          data={currenciesToRender(activeTab)}
          refreshing={loading}
          keyExtractor={(item) => item?.ticker}
          renderItem={({ item }) => (
            <MarketCoins
              onSelect={(coin: Currency) => {
                setSelectedCoin(coin);
              }}
              isFavorite={favoritesCoins.includes(item?.name)}
              onFavorite={() => onFavorite(item?.name)}
              onUnFavorite={() => onUnFavorite(item?.name)}
              key={item?.ticker}
              data={item}
            />
          )}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={
            <View
              style={{
                backgroundColor: THEME.COLORS.primaryBackground,
              }}
            >
              <MarketSwiperV2
                selecetedCoin={selectedCoin}
                timeline={currencyTimeline}
              />

              <MarketTabs activeTab={activeTab} setActiveTab={setActiveTab} />

              <View style={styles.itemsContainer}>
                <Text style={styles.tableHeaderName}>{t('Name')}</Text>
                <Text style={styles.tableHeaderPrice}>{t('Price')}</Text>
              </View>
            </View>
          }
          ListEmptyComponent={
            activeTab !== RoutesNamesEnum.FAVORITES ? (
              <Text style={styles.loadingText}>{t('Loading')}...</Text>
            ) : null
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: THEME.MARGIN.MID_LOW,
  },
  loadingText: {
    textAlign: 'center',
  },
  itemsContainer: {
    ...GlobalStyleSheet.shadow,
    backgroundColor: COLORS.marketHeader,
    borderRadius: THEME.RADIUS.BOX,
    flexDirection: 'row',
    height: 40,
    paddingLeft: 15,
    marginBottom: RF(5),
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  tableHeaderName: {
    color: COLORS.warning,
    width: '70%',
  },
  tableHeaderPrice: {
    color: COLORS.warning,
    width: '30%',
    paddingLeft: 15,
  },
});

export default Markets;
