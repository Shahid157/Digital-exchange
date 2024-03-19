import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { RF } from 'shared/theme/responsive';
import DepositCoinItem from 'shared/components/DepositCoinItem';
import { GenericNavigation } from '../types';
import ROUTE_NAMES from '../../../../routes/RouteNames';
import AppHeader from '../../../../shared/components/AppHeader';
import AppInput from '../../../../shared/components/AppInput';
import AlphabetSidebar from '../../../../shared/components/AlphabetSidebar';
import { Icons } from '../../../../shared/components/AnyIcon';
import useUniqueCurrencies from '../../../../shared/store/slices/currencies/hooks/useUniqueCurrencies';
import { Currency } from '../../../../__generated__/graphql';

function ChooseCurrency(props: GenericNavigation) {
  const coins = useUniqueCurrencies({
    onlyEnabledCoins: true,
    enableLocalCurrency: true,
  });
  const [selectedLetter, setSelectedLetter] = useState('A');
  const [searchText, setSearchText] = useState('');
  const { t } = useTranslation(['all']);

  const handleLetterPress = (letter: string) => {
    setSelectedLetter(letter);
  };

  const onPressCoin = (coin: Currency) => {
    if (coin.isLocal) {
      props?.navigation?.navigate(ROUTE_NAMES.DEPOSIT_LOCAL_SCREEN, {
        coin,
      });
    } else {
      props?.navigation?.navigate(ROUTE_NAMES.DEPOSIT_SCREEN, {
        coin,
      });
    }
  };

  const searchedCoins = useMemo(() => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const sortedCoins = coins.sort((a, b) => {
      if (a.isLocal) return -1;
      if (b.isLocal) return 1;
      return 0;
    });

    if (!lowerCaseSearchText) {
      return sortedCoins;
    }

    return sortedCoins.filter(
      (it) =>
        it.name.toLowerCase().includes(lowerCaseSearchText) ||
        it.ticker.toLowerCase().includes(lowerCaseSearchText)
    );
  }, [searchText, coins]);

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        leftIcon="back"
        title={t('Choose Currency')}
        rightIcon="history"
        rightIconType={Icons.MaterialCommunityIcons}
        onPressRightIcon={() =>
          props?.navigation?.navigate(ROUTE_NAMES.TRANSACTIONS_HISTORY, {
            type: 'Deposit',
          })
        }
      />
      <AppInput
        leftIconType={Icons.Feather}
        leftIcon="search"
        placeholder={t('Search here..')}
        onChangeText={setSearchText}
        value={searchText}
      />
      <View style={styles.flatList}>
        <ScrollView>
          {searchedCoins.map((data) => (
            <DepositCoinItem
              key={data.ticker}
              data={data}
              onPress={onPressCoin}
            />
          ))}
        </ScrollView>
        <AlphabetSidebar
          selectedLetter={selectedLetter}
          onLetterPress={handleLetterPress}
        />
      </View>
    </SafeAreaView>
  );
}

export default ChooseCurrency;

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    flexDirection: 'row',
  },
  container: { backgroundColor: 'black', flex: 1, paddingHorizontal: RF(8) },
});
