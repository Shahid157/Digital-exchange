import { Toast } from 'react-native-toast-message/lib/src/Toast';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AppHeader from 'shared/components/AppHeader';
import AppText from 'shared/components/AppText';
import GlobalRowData from 'shared/components/GlobalRowData';
import PrimaryButton from 'shared/components/PrimaryButton';
import { GenericNavigation } from 'shared/models/types';
import {
  formatAssetAmmount,
  getNormalizedError,
} from 'shared/services/helper.service';
import { estimatedSwapAmount, swapCoins } from 'shared/services/swap.services';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { useTranslation } from 'react-i18next';
import ROUTE_NAMES from 'routes/RouteNames';
import { CoinWithCurrency } from 'shared/types';
import { useWalletWithCoins } from '../../hooks/useWalletWithCoins';
import AssetSelectionModal from '../AssetSelectionModal';
import SwapCard from './SwapCard';
import SwapSuccessModal from './SwapSuccessModal';
import Swapper from './Swapper';
import styles from './styles';
import { numberRoundDown } from '../../../../../shared/utils/numberRoundDown';
import { Transaction } from '../../../../../__generated__/graphql';

interface CoinsBalances {
  coin1: number;
  coin2: number;
}

function SwapScreen(props: GenericNavigation) {
  const selectedCoin: CoinWithCurrency | undefined = props?.route?.params?.coin;
  const walletWithCoins = useWalletWithCoins();
  const [coin1, setCoin1] = useState<CoinWithCurrency | undefined>(
    selectedCoin
  );
  const [coin2, setCoin2] = useState<CoinWithCurrency | undefined>();
  const { t } = useTranslation(['all']);
  const [balances, setBalances] = useState<CoinsBalances>({
    coin1: 0,
    coin2: 0,
  });

  const [estimatedAmount, setEstimatedAmount] = useState(0);
  const [estimatedRate, setEstimatedRate] = useState(0);
  const [rateId, setRateId] = useState('');

  const [loading, setLoading] = useState(false);
  const [rateLoading, setRateLoading] = useState(false);
  const [amountLoading, setAmountLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState<string | null>();
  const toggleCurrencyModal = () => setModalVisible(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [swapResultData, setSwapResultData] = useState<
    Transaction | undefined
  >();

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
        coin1: 0,
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
        coin1: val,
      }));
    }
  };

  const estimateExchangeAmount = async () => {
    try {
      if (!coin2) {
        return;
      }

      setRateLoading(true);

      const res = await estimatedSwapAmount({
        fromAmount: balances.coin1,
        fromCurrency: coin1?.id,
        toCurrency: coin2?.id,
      });

      setEstimatedAmount(Number(res?.data?.toAmount));
      setRateId(res?.data?.rateId);
    } catch (e) {
      setEstimatedAmount(0);
    } finally {
      setRateLoading(false);
    }
  };
  const estimateExchangeRate = async () => {
    try {
      if (!coin2) {
        return;
      }

      setRateLoading(true);

      const res = await estimatedSwapAmount({
        fromAmount: 1,
        fromCurrency: coin1?.id,
        toCurrency: coin2?.id,
      });

      setEstimatedRate(Number(res?.data?.toAmount));
    } catch (e) {
      setEstimatedRate(0);
    } finally {
      setRateLoading(false);
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
        rateId,
      };

      const { data } = await swapCoins(walletWithCoins.data!.id, payload);
      setSwapResultData(data as Transaction);
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
      coin1: 0,
      coin2: 0,
    });
  };

  useEffect(() => {
    if (balances.coin1 > 0) {
      estimateExchangeAmount();
      estimateExchangeRate();
    }
  }, [balances.coin1, coin2]);
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.mainContainer}>
          <AppHeader leftIcon="back" title={t('Swap Crypto')} hideDivider />
          <View style={{ paddingHorizontal: RF(10), paddingTop: RF(10) }}>
            <SwapCard
              title={t('From')}
              titleValidator="From"
              coinItem={coin1}
              toggleModal={() => setModalVisible('from')}
              value={balances.coin1}
              onChangeText={(val) => setBalance('1', val)}
              handleMaxValue={handleMaxValue}
            />
            <View style={styles.balance}>
              <AppText medium>
                {t('Balance')}:{' '}
                {amountLoading ? (
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
              rateLoading={rateLoading}
              coinItem={coin2}
              value={estimatedAmount}
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
              value={t('No Fees')}
              loading={rateLoading}
              colorValue="#5AFF6B"
            />
            <GlobalRowData
              label={t('Exchange Rate')}
              value={`1 ${coin1?.ticker?.toUpperCase()} ≈ ${formatAssetAmmount(
                estimatedAmount
              )} ${coin2?.ticker?.toUpperCase() || '--'}`}
              loading={rateLoading}
              colorValue={THEME.COLORS.white}
            />

            <View style={styles.finalAmountRow}>
              <AppText> {t('You will get')} </AppText>

              {rateLoading ? (
                <ActivityIndicator
                  size="small"
                  color={THEME.COLORS.secondaryYellow}
                  style={{ alignSelf: 'center' }}
                />
              ) : (
                <AppText h3 semiBold color={THEME.COLORS.secondaryYellow}>
                  {estimatedAmount}
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

      <AssetSelectionModal
        visible={modalVisible != null}
        toggleModal={toggleCurrencyModal}
        onSelectAsset={onSelectCoin}
        setCloseModal={() => setModalVisible(null)}
        otherSelectedCoin={modalVisible == 'from' ? coin2 : coin1}
      />

      <SwapSuccessModal
        fromCoin={coin1}
        toCoin={coin2}
        fromAmount={balances.coin1}
        toAmount={estimatedAmount}
        visible={successModalVisible}
        toggleModal={handleOnCloseModal}
        hideModalAndRedirect={hideModalAndRedirect}
        successDetails={swapResultData}
      />
    </>
  );
}

export default SwapScreen;
