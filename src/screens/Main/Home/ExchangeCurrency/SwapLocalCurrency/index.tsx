import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import AppHeader from 'shared/components/AppHeader';
import AppText from 'shared/components/AppText';
import GlobalRowData from 'shared/components/GlobalRowData';
import PrimaryButton from 'shared/components/PrimaryButton';
import { GenericNavigation } from 'shared/models/types';
import {
  formatAssetAmmount,
  getNormalizedError,
} from 'shared/services/helper.service';

import { useTranslation } from 'react-i18next';
import ROUTE_NAMES from 'routes/RouteNames';
import { swapLocalCurrency } from 'shared/services/swap.services';
import {
  useSwapLocalCurrency,
  useSwapLocalCurrencyMutation,
  useSwapRateQuery,
} from 'shared/store/slices/aztc-swap/aztc-swap.api';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { CoinWithCurrency } from 'shared/types';
import { debounce } from 'lodash';
import { useWalletWithCoins } from '../../hooks/useWalletWithCoins';

import { numberRoundDown } from '../../../../../shared/utils/numberRoundDown';
import LocalCurrencySelectionModal from '../LocalCurrencySelectionModal';
import SwapCard from '../SwapScreen/SwapCard';
import SwapSuccessModal from '../SwapScreen/SwapSuccessModal';
import Swapper from '../SwapScreen/Swapper';
import styles from './styles';

type CoinsBalances = {
  coin1: string;
  coin2: string;
};

function SwapLocalCurrency(props: GenericNavigation) {
  const selectedCoin: CoinWithCurrency | undefined = props?.route?.params?.coin;
  const [coin1, setCoin1] = useState<CoinWithCurrency | undefined>(
    selectedCoin
  );
  const [swapRequest] = useSwapLocalCurrencyMutation();
  const [coin2, setCoin2] = useState<CoinWithCurrency | undefined>();
  const { t } = useTranslation(['all']);
  const [balances, setBalances] = useState<CoinsBalances>({
    coin1: '',
    coin2: '',
  });

  const [swapSuccessDetails, setSwapSuccessDetails] = useState();

  const [loading, setLoading] = useState(false);
  const shouldCallSwapRate = balances.coin1 > 0 && coin2;
  const [amountError, setAmountError] = useState('');

  const exchangeAmountQuery = useSwapRateQuery(
    {
      fromAmount: balances.coin1,
      fromCurrency: coin1?.id,
      toCurrency: coin2?.id,
    },
    {
      skip: !shouldCallSwapRate,
    }
  );

  const exchangeRateQuery = useSwapRateQuery(
    {
      fromAmount: 1,
      fromCurrency: coin1?.id,
      toCurrency: coin2?.id,
    },
    {
      skip: !shouldCallSwapRate,
    }
  );

  const [modalVisible, setModalVisible] = useState<string | null>();
  const toggleCurrencyModal = () => setModalVisible(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const handleOnCloseModal = () => {
    setSuccessModalVisible(false);
    props?.navigation?.navigate(ROUTE_NAMES.HOME);
  };

  const handleCurrencySelect = (currency: CoinWithCurrency, option: string) => {
    if (option == '1') {
      setCoin1(currency);
      toggleCurrencyModal();
      setBalances((prev: any) => ({
        ...prev,
        coin1: '',
      }));
    } else {
      setCoin2(currency);
      toggleCurrencyModal();
    }
  };

  const handleMaxValue = (val: number) => {
    const roundedVal = numberRoundDown(val, 6);
    setBalances((prev: any) => ({
      ...prev,
      coin1: parseFloat(roundedVal),
    }));
  };

  const setBalance = (key: string, val: number) => {
    if (key == '1') {
      setBalances((prev: any) => ({
        ...prev,
        coin1: Number(val),
      }));
    }
  };

  const onSelectCoin = (coin: CoinWithCurrency) => {
    if (modalVisible == 'from') {
      handleCurrencySelect(coin, '1');
    } else if (modalVisible == 'to') {
      handleCurrencySelect(coin, '2');
    }
  };

  const hideModalAndRedirect = () => {
    props?.navigation?.navigate(ROUTE_NAMES.HOME);
    setSuccessModalVisible(false);
  };

  const onExchange = () => {
    if (!(coin1 && coin2)) {
      Toast.show({
        text1: 'Failed',
        text2: 'Please Select Both Coins',
        type: 'error',
      });
    } else if (!balances.coin1) {
      Toast.show({
        text1: 'Failed',
        text2: 'Enter Balance for Swapping',
        type: 'error',
      });
      return false;
    } else if (balances.coin1 > (selectedCoin?.amount || 0)) {
      Toast.show({
        text1: 'Failed',
        text2: 'Insufficient Balance',
        type: 'error',
      });
      return false;
    } else {
      onSwap();
    }
  };

  const onSwap = async () => {
    try {
      setLoading(true);

      const payload = {
        fromAmount: balances.coin1,
        fromCurrency: String(coin1?.id),
        toCurrency: String(coin2?.id),
      };

      const res = await swapRequest(payload);
      setSwapSuccessDetails(res?.data);
      setSuccessModalVisible(true);
      setLoading(false);
    } catch (e) {
      const error = getNormalizedError(e);
      Toast.show({
        text2: error,
        type: 'error',
      });
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    const temp = coin1;
    setCoin1(coin2);
    setCoin2(temp);
    setBalances({
      coin1: '',
      coin2: '',
    });
  };
  const changeTextDebounced = (text: string) => {
    if (isNaN(Number(text))) {
      setBalances((prev: any) => ({
        ...prev,
        coin1: '',
      }));
      setAmountError('invalid amount');
      return;
    }
    const value = Number(text);

    setBalances((prev: any) => ({
      ...prev,
      coin1: text,
    }));
    if (value > formatAssetAmmount(coin1?.amount || 0)) {
      setAmountError(t('Amount should be less then available balance'));
      return;
    }
    setAmountError('');
  };
  const changeTextDebouncer = useCallback(
    debounce(changeTextDebounced, 500),
    []
  );
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.mainContainer}>
          <AppHeader leftIcon="back" title={`BSP ${t('Swap')}`} hideDivider />
          <View style={{ paddingHorizontal: RF(10), paddingTop: RF(10) }}>
            <SwapCard
              title={t('From')}
              titleValidator="From"
              coinItem={coin1}
              toggleModal={() => setModalVisible('from')}
              value={balances.coin1}
              onChangeText={(val) => {
                setBalance('1', val), changeTextDebouncer(val);
              }}
              handleMaxValue={handleMaxValue}
            />
            {amountError && (
              <AppText
                color={THEME.COLORS.secondaryYellow}
                style={{ marginVertical: THEME.MARGIN.SUPERLOW }}
                medium
              >
                {amountError}
              </AppText>
            )}
            <View style={styles.balance}>
              <AppText medium>
                {t('Balance')}:{' '}
                {exchangeAmountQuery?.isLoading ? (
                  <ActivityIndicator
                    size="small"
                    color={THEME.COLORS.secondaryYellow}
                    style={{ alignSelf: 'center' }}
                  />
                ) : (
                  <AppText>
                    {formatAssetAmmount(coin1?.amount || 0)}{' '}
                    {coin1?.ticker?.toUpperCase()}
                  </AppText>
                )}
              </AppText>
              <AppText medium color={THEME.COLORS.textGrey}>
                {t('Limit')} : 0.0001 - 10,000 {coin1?.ticker?.toUpperCase()}
              </AppText>
            </View>
            <Swapper onPress={swapCurrencies} />
            <SwapCard
              coinBoxStyle={{
                borderColor: THEME.COLORS.secondaryYellow,
                borderWidth: 1,
              }}
              title={t('To')}
              titleValidator="To"
              rateLoading={
                exchangeAmountQuery?.isLoading || exchangeRateQuery?.isLoading
              }
              coinItem={coin2}
              value={
                exchangeAmountQuery?.data?.toAmount
                  ? exchangeAmountQuery?.data?.toAmount
                  : '0.00'
              }
              toggleModal={() => setModalVisible('to')}
              handleMaxValue={handleMaxValue}
            />
          </View>

          <View style={styles.amountCard}>
            <AppText style={{ marginVertical: THEME.MARGIN.VERYLOW }} medium>
              {t('Summary')}
            </AppText>

            <GlobalRowData
              label={t('Fees')}
              value={exchangeRateQuery?.data?.fee}
              loading={
                exchangeAmountQuery?.isLoading || exchangeRateQuery?.isLoading
              }
              colorValue="#FFCF54"
            />
            <GlobalRowData
              label={t('Exchange Rate')}
              value={`1 ${coin1?.ticker?.toUpperCase()} ≈ ${formatAssetAmmount(
                exchangeRateQuery?.data?.exchangeRate
              )} ${coin2?.ticker?.toUpperCase() || '--'}`}
              loading={
                exchangeAmountQuery?.isLoading || exchangeRateQuery?.isLoading
              }
              colorValue={THEME.COLORS.white}
            />

            <View style={styles.finalAmountRow}>
              <AppText> {t('You will get')} </AppText>

              {exchangeAmountQuery?.isLoading ||
              exchangeRateQuery?.isLoading ? (
                <ActivityIndicator
                  size="small"
                  color={THEME.COLORS.secondaryYellow}
                  style={{ alignSelf: 'center' }}
                />
              ) : (
                <AppText h3 semiBold color={THEME.COLORS.secondaryYellow}>
                  {exchangeAmountQuery?.data?.toAmount
                    ? exchangeAmountQuery?.data?.toAmount
                    : '0'}
                </AppText>
              )}
            </View>
          </View>

          <View style={{ flex: 1 }} />

          <View style={{ marginBottom: RF(10), marginHorizontal: RF(8) }}>
            <PrimaryButton
              title={t('Swap')}
              loading={loading}
              onPress={onExchange}
            />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>

      <LocalCurrencySelectionModal
        visible={modalVisible != null}
        toggleModal={toggleCurrencyModal}
        onSelectAsset={onSelectCoin}
        setCloseModal={() => setModalVisible(null)}
        otherSelectedCoin={modalVisible == 'from' ? coin2 : coin1}
      />

      <SwapSuccessModal
        successDetails={swapSuccessDetails}
        fromCoin={coin1}
        toCoin={coin2}
        fromAmount={balances.coin1}
        toAmount={exchangeAmountQuery?.data?.toAmount}
        visible={successModalVisible}
        toggleModal={handleOnCloseModal}
        hideModalAndRedirect={hideModalAndRedirect}
      />
    </>
  );
}

export default SwapLocalCurrency;
