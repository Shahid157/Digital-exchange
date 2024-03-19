import React, { useMemo, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import ROUTE_NAMES from 'routes/RouteNames';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import AppHeader from 'shared/components/AppHeader';
import AppText from 'shared/components/AppText';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { GenericNavigation } from '../types';
import { useWalletWithCoins } from '../hooks/useWalletWithCoins';
import CoinAssetListItem from '../../../../shared/components/SendAssetsCoins/CoinAssetListItem';

function SendAssets(props: GenericNavigation) {
  const wallet = useWalletWithCoins();
  const [searchText, setSearchText] = useState('');
  const { t } = useTranslation(['all']);
  const [hideSmallCoins, setHideSmallCoins] = useState<any>();

  const coins = useMemo(() => {
    const coins = wallet.data?.coins || [];

    // Filter coins with specific tickers (actec, bsd, and bsp)
    const specificTickers = ['actec', 'bsd', 'bsp'];
    const specificCoins = coins.filter((coin) =>
      specificTickers.includes(coin.currency.ticker.toLowerCase())
    );

    // Filter other coins
    const otherCoins = coins.filter(
      (coin) => !specificTickers.includes(coin.currency.ticker.toLowerCase())
    );

    // Filter coins based on the search text
    const filteredCoins = otherCoins.filter(
      (coin) =>
        coin.currency.name.toLowerCase().includes(searchText.toLowerCase()) ||
        coin.currency.ticker.toLowerCase().includes(searchText.toLowerCase())
    );

    // Sort the coins
    const sortedSpecificCoins = specificCoins.sort(
      (a, b) =>
        specificTickers.indexOf(a.currency.ticker.toLowerCase()) -
        specificTickers.indexOf(b.currency.ticker.toLowerCase())
    );

    const sortedOtherCoins = filteredCoins.sort((a, b) =>
      a.currency.ticker.localeCompare(b.currency.ticker)
    );

    const filterCoins = [...sortedSpecificCoins, ...sortedOtherCoins];
    if (!searchText) {
      return filterCoins;
    }

    return filterCoins;
  }, [searchText, wallet]);

  const onPressCoin = (coin: any) => {
    props?.navigation?.navigate(ROUTE_NAMES.SEND_ASSET_OTHER, {
      coin,
    });
  };

  // const filteredCoinsAmountSmalls = () => {
  //   const result = coins.filter(item => {
  //     const price = item?.currency?.price || 0;
  //     const valueTotal = price * item.amount;
  //     if (valueTotal >= 1) {
  //       return true;
  //     }
  //     return false;
  //   });
  //   return result;
  // };

  // useEffect(() => {
  //   const filterSmallCoin = filteredCoinsAmountSmalls();
  //   setHideSmallCoins(filterSmallCoin);
  // }, [coins]);

  return (
    <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
      <AppHeader
        leftIcon="back"
        title={t('Send Assets', { ns: ['all'] })}
        rightIcon="history"
        rightIconType={Icons.MaterialCommunityIcons}
        onPressRightIcon={() =>
          props?.navigation?.navigate(ROUTE_NAMES.TRANSACTIONS_HISTORY, {
            type: 'Transfer',
          })
        }
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: RF(10),
          paddingHorizontal: THEME.MARGIN.LOW,
        }}
      >
        <AppText h3 semiBold>
          {t('Assets', { ns: ['all'] })}
        </AppText>
        <AppText h4 style={{ color: '#979797' }}>
          {t('Value')}
          {'  '}
          <AnyIcon
            style={{ bottom: RF(1), marginRight: RF(3) }}
            type={Icons.FontAwesome}
            name="chevron-down"
            size={12}
            color="#979797"
          />
        </AppText>
      </View>
      {coins.filter((item) => item?.amount)?.length < 1 && (
        <AppText
          h3
          medium
          style={{
            marginVertical: THEME.MARGIN.LOW,
            textAlign: 'center',
            color: THEME.COLORS.textGrey,
          }}
        >
          {t('You have no assets at the moment')}
        </AppText>
      )}
      <ScrollView>
        {coins.map((data: any, index: any) => (
          <React.Fragment key={index}>
            <CoinAssetListItem
              key={index}
              item={data}
              onPress={() => onPressCoin(data)}
            />
          </React.Fragment>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default SendAssets;
