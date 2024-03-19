import React, { useMemo, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import ROUTE_NAMES from 'routes/RouteNames';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import AppHeader from 'shared/components/AppHeader';
import AppInput from 'shared/components/AppInput';
import AppText from 'shared/components/AppText';
import { GenericNavigation } from 'shared/models/types';
import { RF } from 'shared/theme/responsive';
import { CoinWithCurrency } from 'shared/types';
import { useWalletWithCoins } from '../hooks/useWalletWithCoins';
import CoinAssetListItem from '../../../../shared/components/SwapAssets/CoinAssetListItem';
import styles from './styles';

const specificTickers = ['aztec', 'dbsp', 'bsp'];

function ExchangeCurrency(props: GenericNavigation) {
  const wallet = useWalletWithCoins();
  const [searchText, setSearchText] = useState('');
  const { t } = useTranslation(['all']);

  const coins = useMemo(() => {
    const result = wallet.data?.coins || [];

    const sorted = result.sort((a, b) =>
      a.currency.ticker.localeCompare(b.currency.ticker)
    );
    if (!searchText) {
      return sorted;
    }

    return sorted.filter((coin) => {
      const name = coin.currency.name.toLowerCase();
      const ticker = coin.currency.ticker.toLowerCase();
      const search = searchText.toLowerCase();
      return name.includes(search) || ticker.includes(search);
    });
  }, [searchText, wallet]);

  const onPressCoin = (coin: CoinWithCurrency) => {
    if (specificTickers.includes(coin?.ticker)) {
      props?.navigation?.navigate(ROUTE_NAMES.SWAP_LOCAL_CURRENCY, {
        coin,
      });
    } else {
      props?.navigation?.navigate(ROUTE_NAMES.SWAP_SCREEN, {
        coin,
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <AppHeader
          leftIcon="back"
          title={t('Swap Crypto', { ns: ['all'] })}
          rightIcon="history"
          rightIconType={Icons.MaterialCommunityIcons}
          onPressRightIcon={() =>
            props?.navigation?.navigate(ROUTE_NAMES.TRANSACTIONS_HISTORY, {
              type: 'Swap',
            })
          }
        />
        <View style={styles.subContainer}>
          <AppInput
            leftIconType={Icons.Feather}
            leftIcon="search"
            placeholder={t('Search here..', { ns: ['all'] })}
            onChangeText={setSearchText}
            value={searchText}
          />
          <View style={styles.subContainer2}>
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
            <AppText h3 medium style={styles.textStyle}>
              {t('You have no assets at the moment')}
            </AppText>
          )}
          <FlatList
            data={coins}
            renderItem={({ item, index }) => (
              <React.Fragment key={index}>
                <CoinAssetListItem
                  key={index}
                  item={item}
                  onPress={() => onPressCoin(item)}
                />
              </React.Fragment>
            )}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default ExchangeCurrency;
