import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { debounce } from 'lodash';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import AppHeader from 'shared/components/AppHeader';
import AppText from 'shared/components/AppText';
import { GenericNavigation } from 'shared/models/types';
import {
  GetNetworkName,
  getNormalizedError,
} from 'shared/services/helper.service';
import { THEME } from 'shared/theme';
import CoinInput from 'shared/components/CoinInput';
import {
  createDeposit,
  estimatedDepositAmount,
  getMinDepositAmount,
} from 'shared/services/deposit.services';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import AppLoader from 'shared/components/AppLoader';
import ROUTE_NAMES from 'routes/RouteNames';
import { Currency } from '__generated__/graphql';
import { useTranslation } from 'react-i18next';
import { Portal } from '@gorhom/portal';
import SecondaryButton from 'shared/components/SecondaryButton';
import { RF } from 'shared/theme/responsive';
import styles from './styles';
import useCurrencyNetowrks from '../../../../shared/store/slices/currencies/hooks/useCurrencyNetworks';
import { useAppSelector } from '../../../../shared/hooks/redux';
import DepositBottomSheet from './components/DepositBottomSheet';

function RowData({ label, value, loading }: any) {
  return (
    <View style={styles.rowContainer}>
      <AppText color={THEME.COLORS.textGrey}>{label}</AppText>
      {loading ? (
        <ActivityIndicator size="small" color={THEME.COLORS.secondaryYellow} />
      ) : (
        <AppText color={THEME.COLORS.textGrey}>{value}</AppText>
      )}
    </View>
  );
}
function DepositScreen(props: GenericNavigation) {
  const coin = props?.route?.params?.coin as Currency;
  const { t } = useTranslation(['all']);
  const [sheetIndex, setSheetIndex] = useState(0);
  const [amountStr, setAmountStr] = useState('');
  const [amount, setAmount] = useState(0);
  const [minDeposit, setMinDeposit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rateLoading, setRateLoading] = useState(false);
  const [amountLoading, setAmountLoading] = useState(false);
  const [invalidAmountErr, setInvalidAmountErr] = useState('');
  const networks = useCurrencyNetowrks(coin);
  const coins = useAppSelector((state) => state.currencies.currencies);

  const [validUntil, setValidUntil] = useState('');
  const [network, setNetwork] = useState('');
  const [depositFee, setDepositFee] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  const selectedCoinWithNetowrk = useMemo(() => {
    const result = coins?.find(
      (i) => i.ticker === coin.ticker && i.network === network
    );
    return result || coin;
  }, [network, coins]);

  const changeTextDebounced = (text: string) => {
    if (isNaN(Number(text))) {
      setAmount(0);
      setInvalidAmountErr(t('invalid amount'));
      return;
    }
    setInvalidAmountErr('');
    setAmount(Number(text));
  };

  const changeTextDebouncer = useCallback(
    debounce(changeTextDebounced, 500),
    []
  );

  const onDeposit = async (coin: Currency) => {
    try {
      setLoading(true);
      const payload = {
        currency: coin.ticker,
        network: coin.network,
        legacyTicker: coin.legacyTicker,
        amount: Number(amount),
      };
      const res = await createDeposit(payload);
      props?.navigation?.navigate(ROUTE_NAMES.DEPOSIT_STATUS, {
        id: res.data.id,
        address: res.data.payload.payinAddress,
        currency: coin.ticker,
        network: coin.network,
        validUntil,
        depositFee,
        finalAmount,
      });
      setLoading(false);
      Toast.show({
        text2: t('Success'),
        type: 'success',
      });
    } catch (e) {
      setLoading(false);
      const error = getNormalizedError(e);
      Toast.show({
        text2: error,
        type: 'error',
      });
    }
  };

  const fetchMinDepositAmount = async () => {
    setAmountLoading(true);
    const payload = {
      currency: selectedCoinWithNetowrk.ticker as string,
      network: selectedCoinWithNetowrk.network as string,
    };
    try {
      const res = await getMinDepositAmount(payload);
      setMinDeposit(res || 0);
    } finally {
      setAmountLoading(false);
    }
  };

  const estAmount = async (
    coin: Currency,
    minDeposit: number,
    amount: number
  ) => {
    if (!amount) {
      setFinalAmount(0);
      setDepositFee(0);
      setValidUntil('');
      setInvalidAmountErr('');
      return;
    }

    if (minDeposit > amount) {
      setFinalAmount(0);
      setDepositFee(0);
      setValidUntil('');
      setInvalidAmountErr(
        t('Amount must be greater than minimum deposit amount')
      );
      return;
    }

    try {
      setInvalidAmountErr('');
      const res = await estimatedDepositAmount({
        currency: coin.ticker,
        network: coin.network,
        amount,
      });
      setFinalAmount(res?.data?.toAmount);
      setDepositFee(res?.data?.fromAmount - res?.data?.toAmount);
      setValidUntil(res?.data?.validUntil);
    } catch (e) {
      const error = getNormalizedError(e);
      if (error == 'not_valid_params') {
        setInvalidAmountErr(t('invalid amount'));
      }
      setFinalAmount(0);
      setDepositFee(0);
      setValidUntil('');
    } finally {
      setRateLoading(false);
    }
  };

  useEffect(() => {
    if (!network) return;
    fetchMinDepositAmount();
  }, [selectedCoinWithNetowrk, network]);

  useEffect(() => {
    if (!network) return;
    estAmount(selectedCoinWithNetowrk, minDeposit, amount);
  }, [amount, selectedCoinWithNetowrk, network]);

  return (
    <>
      {loading && <AppLoader isVisible />}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.mainContainer}>
          <AppHeader leftIcon="back" title={t('Deposit Crypto')} />
          <View style={styles.container}>
            <CoinInput
              coin={selectedCoinWithNetowrk}
              keyboardType="numeric"
              hideChevron
              label={t('Enter Amount')}
              value={amountStr}
              onChangeText={(text) => {
                changeTextDebouncer(text);
                setAmountStr(text);
              }}
            />
            {invalidAmountErr && (
              <AppText
                color={THEME.COLORS.errorRed}
                style={{ marginVertical: THEME.MARGIN.SUPERLOW }}
                medium
              >
                {t(invalidAmountErr)}
              </AppText>
            )}
            <AppText
              h5
              style={{
                margin: THEME.MARGIN.LOW,
              }}
              color={THEME.COLORS.textGrey}
              medium
            >
              {t('Minimum Deposit Amount:')}
              {'  '}
              {amountLoading ? (
                <ActivityIndicator
                  size="small"
                  color={THEME.COLORS.secondaryYellow}
                  style={{ alignSelf: 'center' }}
                />
              ) : (
                <AppText h5 color={THEME.COLORS.textGrey} medium>
                  {minDeposit} {selectedCoinWithNetowrk.ticker.toUpperCase()}
                </AppText>
              )}
            </AppText>

            <TouchableOpacity
              style={styles.sheetPress}
              onPress={() => setSheetIndex(1)}
            >
              <View>
                <AppText
                  style={{ marginBottom: RF(5) }}
                  semiBold
                  color={THEME.COLORS.textGrey}
                >
                  {t('Network')}
                </AppText>
                <AppText h3 medium>
                  {GetNetworkName(network) || t('Select Network')}
                </AppText>
              </View>
              <AnyIcon
                disabled
                type={Icons.Ionicons}
                name="swap-horizontal"
                color={THEME.COLORS.textGrey}
                size={20}
              />
            </TouchableOpacity>

            <View style={styles.amountCard}>
              <AppText style={{ marginVertical: THEME.MARGIN.LOW }} medium>
                {t('Summary')}
              </AppText>
              <RowData
                label={t('Desposit Fee')}
                value={
                  depositFee
                    ? `${depositFee} ${selectedCoinWithNetowrk.ticker.toUpperCase()}`
                    : '--'
                }
                loading={rateLoading}
              />

              <View style={styles.finalAmountRow}>
                <AppText>{t('You will get')}</AppText>
                {rateLoading ? (
                  <ActivityIndicator
                    size="small"
                    color={THEME.COLORS.secondaryYellow}
                  />
                ) : (
                  <AppText h3 semiBold color={THEME.COLORS.secondaryYellow}>
                    {finalAmount
                      ? `${finalAmount} ${selectedCoinWithNetowrk.ticker.toUpperCase()}`
                      : '--'}
                  </AppText>
                )}
              </View>
            </View>

            <View style={{ flex: 1 }} />
            <SecondaryButton
              disabled={!finalAmount || rateLoading || !network}
              buttonStyle={{
                width: '100%',
              }}
              title={t('Deposit')}
              onPress={() => onDeposit(selectedCoinWithNetowrk)}
            />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
      <Portal>
        <DepositBottomSheet
          sheetIndex={sheetIndex}
          setSheetIndex={setSheetIndex}
          setNetwork={setNetwork}
          networks={networks}
        />
      </Portal>
    </>
  );
}

export default DepositScreen;
