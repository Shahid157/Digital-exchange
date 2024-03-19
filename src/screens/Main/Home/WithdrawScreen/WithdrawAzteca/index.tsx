import React, { useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import {
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { Icons } from 'shared/components/AnyIcon';
import AppHeader from 'shared/components/AppHeader';
import AppText from 'shared/components/AppText';
import PrimaryButton from 'shared/components/PrimaryButton';
import { formatAssetAmmount, toast } from 'shared/services/helper.service';
import { THEME } from 'shared/theme';
import CoinInput from 'shared/components/CoinInput';
import ROUTE_NAMES from 'routes/RouteNames';
import AddressInput from 'shared/components/AddressInput';
import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from 'react-i18next';
import { numberRoundDown } from 'shared/utils/numberRoundDown';
import { limitedDecimalInputs } from 'shared/utils/limitedDecimalInputs';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/store';
import { ScrollView } from 'react-native-gesture-handler';
import {
  useExchangeWithdrawRateQuery,
  useWithdrawAztcMutation,
} from 'shared/store/slices/aztc-withdraw/aztc-withdraw.api';
import { useMfaOTPPatchMutation } from 'shared/store/slices/mfa/mfa-otp.api';
import {
  PaymentMovementType,
  PaymentType,
} from 'shared/store/slices/aztc-withdraw/types';
import { TransportTypes } from 'shared/store/slices/mfa/mfa-otp.types';
import { clabeRegex } from 'shared/hooks/useValidationYupT';
import { BANKS } from 'shared/constants/AppConstants';
import { CoinWithCurrency } from '../../../../../shared/types';
import styles from './styles';
import { GenericNavigation } from '../../types';

function RowData({ label, value, loading }: any) {
  return (
    <View style={styles.rowData}>
      <AppText color={THEME.COLORS.textGrey}>{label}</AppText>
      {loading ? (
        <ActivityIndicator size="small" color={THEME.COLORS.secondaryYellow} />
      ) : (
        <AppText color={THEME.COLORS.textGrey}>{value}</AppText>
      )}
    </View>
  );
}

function WithdrawAzteca(props: GenericNavigation) {
  const { t } = useTranslation('all');
  const coin = props?.route?.params?.coin as CoinWithCurrency;
  const { user } = useSelector((state: RootState) => state.session);
  const [amount, setAmount] = useState(0);
  const [bank, setBank] = useState('--');
  const [holder, setHolder] = useState('');
  const [clabe, setClabe] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amountStr, setAmountStr] = useState('');
  const [invalidAmountErr, setInvalidAmountErr] = useState('');
  const [invalidClabeErr, setInvalidClaveErr] = useState('');
  const [aztecWithdrawRequest, aztecWithdrawReslut] = useWithdrawAztcMutation();
  const [patchOtp, patchOtpResult] = useMfaOTPPatchMutation();

  const changeTextDebounced = (text: string) => {
    if (Number.isNaN(Number(text))) {
      setAmount(0);
      setInvalidAmountErr('invalid amount');
      return;
    }
    limitedDecimalInputs(text, setAmountStr);
  };

  const changeTextDebouncer = useCallback(
    debounce(changeTextDebounced, 500),
    []
  );

  useEffect(() => {
    if (aztecWithdrawReslut.isSuccess) {
      props?.navigation?.navigate(ROUTE_NAMES.WITHDRAW_AZTC_SUCCESS);
    }
    if (aztecWithdrawReslut.isError) {
      // @ts-ignore
      const message = aztecWithdrawReslut?.error?.data?.message;
      toast(t('withdraw_failed'), t(message), 'error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aztecWithdrawReslut]);

  useEffect(() => {
    if (patchOtpResult.isSuccess) {
      const otpId = patchOtpResult?.data?.id;
      Toast.show({
        text1: t('Successful', { ns: ['all'] }),
        text2: t('otpVerifiedSuccessfully', { ns: ['all'] }),
        type: 'success',
      });
      withdrawAssets(otpId);
    }
    if (patchOtpResult.isError) {
      // @ts-ignore
      const message = patchOtpResult?.error?.data?.message;
      if (message == 'code not found') {
        toast(t('Error'), t('Invalid Code'), 'error');
      } else {
        toast(t('Error'), 'An error occurred while sending the code', 'error');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patchOtpResult]);

  const withdrawAssets = (otpId: string) => {
    const payload = {
      otpId,
      type: PaymentType.LocalCurrency,
      movementType: PaymentMovementType.Deposit,
      fromAmount: amount,
      fromTicker: coin.currency.legacyTicker,
      toTicker: 'mxn',
      bank,
      accountNumber,
      clabe,
      holder,
    };
    aztecWithdrawRequest(payload);
  };

  const exchangeRateQuery = useExchangeWithdrawRateQuery(
    {
      fromAmount: amount,
      fromTicker: coin.currency.legacyTicker,
      toTicker: 'mxn',
    },
    {
      skip: !amount,
    }
  );

  const otpValidation = (otp: string, method: TransportTypes) => {
    const payload = {
      transport: method,
      code: otp,
    };
    patchOtp(payload);
  };

  const onOptEntered = async (otp: string, method: TransportTypes) => {
    await otpValidation(otp, method);
  };
  const navigateToTransfer = async () => {
    const emailMethod = user?.twoFactorAuthenticationMethods.find(
      (method: any) => method.type === 'email'
    );
    // Check which method is available and navigate accordingly
    if (emailMethod) {
      props?.navigation?.navigate(ROUTE_NAMES.OPT_SWITCHER, {
        coinId: props?.route?.params?.coin?.currency?.legacyTicker,
        withdrawalFee: estimatedRate,
        isMFA: true,
        isWithdraw: true,
        amount,
        finalAmount,
        coin,
        onOptEntered,
      });
    } else {
      Toast.show({
        text1: t('Error', { ns: ['all'] }),
        text2: t("You don't have any v", { ns: ['all'] }),
        type: 'error',
      });
    }
  };

  const finalAmount = exchangeRateQuery.data?.toAmount || 0;
  const estimatedRate = exchangeRateQuery.data?.exchangeRate || 0;

  const onPaste = (key: 'holder' | 'clave') => async () => {
    const clipboardContent = await Clipboard.getString();
    if (!clipboardContent) {
      return;
    }

    switch (key) {
      case 'holder':
        setHolder(clipboardContent);
        break;
      case 'clave':
        onChangeClave(clipboardContent);
        break;
      default:
        break;
    }
  };

  const onChangeClave = (text: string) => {
    setClabe(text);
    if (clabeRegex.test(text)) {
      setInvalidClaveErr('');
      setAccountNumber(text.slice(-11));
    } else {
      setInvalidClaveErr('clabeError');
      setAccountNumber('');
    }
    const prefix = text.substring(0, 3);
    // eslint-disable-next-line no-shadow
    const matchingBank = BANKS.find((bank) => bank.code === prefix);
    setBank(matchingBank?.shorName || '');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView>
          <AppHeader
            leftIcon="back"
            title={t('Withdraw')}
            rightIcon="history"
            rightIconType={Icons.MaterialCommunityIcons}
            rightIconColor={THEME.COLORS.secondaryYellow}
            onPressRightIcon={() =>
              props?.navigation?.navigate(ROUTE_NAMES.TRANSACTIONS_HISTORY)
            }
          />
          <View style={styles.container}>
            <CoinInput
              coin={coin.currency}
              hideNetworkTag
              keyboardType="decimal-pad"
              hideChevron
              label={t('Enter Amount')}
              value={amountStr}
              onPressRightText={() => {
                const max = coin?.amount || 0;
                const formattedMax = numberRoundDown(max, 6);
                setAmount(Number(formattedMax));
                setAmountStr(`${formattedMax}`);
              }}
              onChangeText={(text) => {
                changeTextDebouncer(text);
                limitedDecimalInputs(text, setAmountStr);
                setAmount(Number(text));
                if (Number(text) > coin?.amount) {
                  setInvalidAmountErr(
                    t('amount is greater than available balance')
                  );
                } else {
                  setInvalidAmountErr('');
                }
              }}
              showRightText
              rightText="Max"
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
              h6
              style={{
                alignSelf: 'flex-end',
                marginVertical: THEME.MARGIN.VERYLOW,
              }}
              medium
            >
              {t('Available Amount')}
              <AppText h6>
                {' '}
                {numberRoundDown(coin?.amount, 6)} {coin?.ticker.toUpperCase()}
              </AppText>
            </AppText>

            <AddressInput
              keyboardType="number-pad"
              label={t('interbankClabe')}
              value={clabe}
              onChangeText={onChangeClave}
              placeholder={t('enter_clabe')}
              showRightText
              rightText={t('Paste')}
              rightTextColor={THEME.COLORS.textGrey}
              onPressRightText={onPaste('clave')}
            />

            {invalidClabeErr && (
              <AppText
                color={THEME.COLORS.errorRed}
                style={{ marginVertical: THEME.MARGIN.SUPERLOW }}
                medium
              >
                {t(invalidClabeErr)}
              </AppText>
            )}

            <AddressInput
              keyboardType="default"
              label={t('accountHolderName')}
              value={holder}
              onChangeText={setHolder}
              placeholder={t('enter_name')}
              showRightText
              rightText={t('Paste')}
              rightTextColor={THEME.COLORS.textGrey}
              onPressRightText={onPaste('holder')}
            />

            <View style={styles.amountCard}>
              <AppText style={{ marginVertical: THEME.MARGIN.LOW }} medium>
                {t('Summary')}
              </AppText>

              <RowData
                label={t('bankName')}
                value={bank || t('no_bank_selected')}
                loading={exchangeRateQuery.isLoading}
              />
              <RowData
                label={t('Exchange Rate')}
                value={`1 ${exchangeRateQuery.data?.fromCurrency?.toUpperCase() || '-'
                  } ≈ ${formatAssetAmmount(estimatedRate)} ${exchangeRateQuery.data?.toCurrency?.toUpperCase() || '-'
                  }`}
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
                    {finalAmount
                      ? `${finalAmount} ${exchangeRateQuery?.data?.toCurrency?.toUpperCase()}`
                      : '--'}
                  </AppText>
                )}
              </View>
            </View>

            <View style={{ flex: 1 }} />
            <PrimaryButton
              disabled={
                !finalAmount || !holder || !clabe || !!invalidClabeErr || !bank
              }
              buttonStyle={{ width: '100%' }}
              title={t('Continue')}
              onPress={navigateToTransfer}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default WithdrawAzteca;
