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
import { THEME } from 'shared/theme';
import AppLoader from 'shared/components/AppLoader';
import { Currency } from '__generated__/graphql';
import { useTranslation } from 'react-i18next';
import { Portal } from '@gorhom/portal';
import SecondaryButton from 'shared/components/SecondaryButton';
import { RF } from 'shared/theme/responsive';
import styles from './styles';
import { useAppSelector } from '../../../../shared/hooks/redux';
import PaymentMethodBottomSheet from './components/PaymentMethodBottomSheet';
import {
  useExchangeRateQuery,
  usePaymentMethodsQuery,
} from '../../../../shared/store/slices/aztc-deposits/aztc-deposits.api';
import {
  AZTEC_TICKER,
  DepositMethodNames,
} from '../../../../shared/store/slices/aztc-deposits/aztc-deposits.types';
import DepositInput from './components/DepositInput';
import ROUTE_NAMES from '../../../../routes/RouteNames';
import PrimaryButton from '../../../../shared/components/PrimaryButton';

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
function DepositLocalScreen(props: GenericNavigation) {
  const coin = props?.route?.params?.coin as Currency;
  const { t } = useTranslation(['all']);
  const [sheetIndex, setSheetIndex] = useState(0);
  const [amountStr, setAmountStr] = useState('');
  const [amount, setAmount] = useState(0);
  const [minDeposit, setMinDeposit] = useState(100);
  const [invalidAmountErr, setInvalidAmountErr] = useState('');
  const coins = useAppSelector((state) => state.currencies.currencies);

  const paymentMethodsQuery = usePaymentMethodsQuery('');
  const paymentMethod = paymentMethodsQuery.data?.at(0);

  const exchangeRateQuery = useExchangeRateQuery(
    {
      paymentMethodId: paymentMethod?._id || '',
      fromAmount: amount,
      toTicker: coin.legacyTicker,
    },
    {
      skip: !paymentMethodsQuery.data?.length || !amount,
    }
  );

  const [method, setMethod] = useState('');
  const finalAmount = exchangeRateQuery.data?.toAmount || 0;
  const estimatedRate = exchangeRateQuery.data?.exchangeRate || 0;

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

  const handleOnDeposit = () => {
    props.navigation?.navigate(ROUTE_NAMES.DEPOSIT_LOCAL_ATTACHMENT_SCREEN, {
      amount,
      method,
      coin,
    });
  };

  return (
    <>
      {paymentMethodsQuery.isLoading && <AppLoader isVisible />}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.mainContainer}>
          <AppHeader leftIcon="back" title={t('Fiat Deposit')} />
          <View style={styles.container}>
            <DepositInput
              coin={{
                ticker: 'mxn',
              }}
              keyboardType="numeric"
              hideChevron
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
              <AppText h5 color={THEME.COLORS.textGrey} medium>
                {minDeposit} {coin.ticker.toUpperCase()}
              </AppText>
            </AppText>

            <TouchableOpacity
              style={styles.sheetPress}
              onPress={() => {
                setSheetIndex(1);
                Keyboard.dismiss();
              }}
            >
              <View>
                <AppText
                  style={{ marginBottom: RF(5) }}
                  semiBold
                  color={THEME.COLORS.textGrey}
                >
                  {t('PaymentMethod')}
                </AppText>
                <AppText h3 medium>
                  {t(method) || t('SelectPaymentMethod')}
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
                label={t('Estimated Rate')}
                value={`1 MXN ≈ ${
                  estimatedRate ? 1 * estimatedRate : amountStr
                } ${coin.legacyTicker.toUpperCase()}`}
                loading={exchangeRateQuery.isLoading}
              />

              <View style={styles.finalAmountRow}>
                <AppText>{t('You will get')}</AppText>
                {exchangeRateQuery.isLoading ? (
                  <ActivityIndicator
                    size="small"
                    color={THEME.COLORS.secondaryYellow}
                  />
                ) : (
                  <AppText h3 semiBold color={THEME.COLORS.secondaryYellow}>
                    {exchangeRateQuery.data?.toAmount || 0}
                  </AppText>
                )}
              </View>
            </View>

            <View style={{ flex: 1 }} />

            <PrimaryButton
              disabled={!finalAmount || exchangeRateQuery.isLoading || !method}
              title={t('Deposit')}
              onPress={handleOnDeposit}
            />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
      <Portal>
        <PaymentMethodBottomSheet
          sheetIndex={sheetIndex}
          setSheetIndex={setSheetIndex}
          depositMethods={DepositMethodNames}
          setMethod={setMethod}
        />
      </Portal>
    </>
  );
}

export default DepositLocalScreen;
