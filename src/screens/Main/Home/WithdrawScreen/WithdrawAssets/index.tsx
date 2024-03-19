import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import ROUTE_NAMES from 'routes/RouteNames';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import AppHeader from 'shared/components/AppHeader';
import AppText from 'shared/components/AppText';
import { GenericNavigation } from 'shared/models/types';
import { THEME } from 'shared/theme';
import CoinAssetListItem from 'shared/components/SendAssetsCoins/CoinAssetListItem';
import { RF } from 'shared/theme/responsive';
import { useWalletWithCoins } from '../../hooks/useWalletWithCoins';
import { CoinWithCurrency } from '../../../../../shared/types';

function WithdrawAssets(props: GenericNavigation) {
  const wallet = useWalletWithCoins();
  const [searchText, setSearchText] = useState('');
  const { t } = useTranslation(['all']);

  const coins = useMemo(() => {
    const coins = wallet.data?.coins || [];
    if (!searchText) return coins;

    return coins
      .filter((coin: any) => {
        const name = coin.currency.name.toLowerCase();
        const ticker = coin.currency.ticker.toLowerCase();
        const search = searchText.toLowerCase();
        return name.includes(search) || ticker.includes(search);
      })
      .sort((a: any, b: any) => a?.ticker.localeCompare(b?.ticker));
  }, [searchText, wallet]);

  const onPressCoin = (coin: CoinWithCurrency) => {
    if (coin?.currency?.isLocal) {
      props?.navigation?.navigate(ROUTE_NAMES.WITHDRAW_AZTCA, {
        coin,
      });
    } else {
      props?.navigation?.navigate(ROUTE_NAMES.WITHDRAW_SCREEN, {
        coin,
      });
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
      <AppHeader
        leftIcon="back"
        title={t('Withdraw', { ns: ['all'] })}
        rightIcon="history"
        rightIconType={Icons.MaterialCommunityIcons}
        rightIconColor={THEME.COLORS.secondaryYellow}
        onPressRightIcon={() =>
          props?.navigation?.navigate(ROUTE_NAMES.TRANSACTIONS_HISTORY)
        }
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: THEME.PADDING.MID_LOW,
        }}
      >
        <AppText h3 semiBold>
          {t('Assets')}
        </AppText>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AppText color={THEME.COLORS.textGrey} medium>
            {t('Value')}{' '}
          </AppText>
          <AnyIcon
            type={Icons.Entypo}
            name="chevron-down"
            size={20}
            color={THEME.COLORS.textGrey}
          />
        </View>
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
      <ScrollView style={{ paddingHorizontal: RF(8) }}>
        {coins.map((data: CoinWithCurrency, index: any) => (
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

export default WithdrawAssets;
