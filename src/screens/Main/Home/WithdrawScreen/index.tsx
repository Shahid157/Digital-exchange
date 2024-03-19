import React, { useEffect, useState, useCallback } from 'react';
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
import { getNormalizedError } from 'shared/services/helper.service';
import { THEME } from 'shared/theme';
import CoinInput from 'shared/components/CoinInput';
import { estimatedDepositAmount } from 'shared/services/deposit.services';
import ROUTE_NAMES from 'routes/RouteNames';
import AddressInput from 'shared/components/AddressInput';
import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from 'react-i18next';
import { numberRoundDown } from 'shared/utils/numberRoundDown';
import { limitedDecimalInputs } from 'shared/utils/limitedDecimalInputs';
import styles from './styles';
import { GenericNavigation } from '../types';

function WithdrawScreen(props: GenericNavigation) {
  const { t } = useTranslation('all');
  const { coin }: any = props?.route?.params;

  const [address, setAddress] = useState(
    __DEV__ ? '0xdab6980d14419f921559833a522ccccb957122c2' : ''
  );
  const [amount, setAmount] = useState(0);
  const [amountStr, setAmountStr] = useState('');
  const [rateLoading, setRateLoading] = useState(false);
  const [invalidAmountErr, setInvalidAmountErr] = useState('');

  const [validUntil, setValidUntil] = useState('');
  const [withdrawalFee, setWithdrawalFee] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  const changeTextDebounced = (text: string) => {
    if (isNaN(Number(text))) {
      setAmount(0);
      setInvalidAmountErr('invalid amount');
      return;
    }
    limitedDecimalInputs(text, setAmountStr);
    setFinalAmount(Number(text));
  };

  const changeTextDebouncer = useCallback(
    debounce(changeTextDebounced, 500),
    []
  );

  function RowData({ label, value, loading }: any) {
    return (
      <View style={styles.rowData}>
        <AppText color={THEME.COLORS.textGrey}>{label}</AppText>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={THEME.COLORS.secondaryYellow}
          />
        ) : (
          <AppText color={THEME.COLORS.textGrey}>{value}</AppText>
        )}
      </View>
    );
  }

  const onReview = async () => {
    props?.navigation?.navigate(ROUTE_NAMES.WITHDRAW_REVIEW, {
      address,
      coin,
      validUntil,
      withdrawalFee,
      amount,
      finalAmount,
    });
  };

  const estAmount = async (coin: any, amount: number) => {
    if (!amount) {
      setFinalAmount(0);
      setWithdrawalFee(0);
      setValidUntil('');
      setInvalidAmountErr('');
      return;
    }

    try {
      setRateLoading(true);
      const res = await estimatedDepositAmount({
        currency: coin.ticker,
        network: coin.network,
        amount,
      });

      setWithdrawalFee(res?.data?.withdrawalFee);
      setFinalAmount(amount - Number(res?.data?.withdrawalFee));
      setValidUntil(res?.data?.validUntil);
    } catch (e) {
      const error = getNormalizedError(e);
      if (error == 'not_valid_params') {
        setInvalidAmountErr('invalid amount');
      }
      setFinalAmount(0);
      setWithdrawalFee(0);
      setValidUntil('');
    } finally {
      setRateLoading(false);
    }
  };

  const onPaste = async () => {
    const clipboardContent = await Clipboard.getString();
    if (clipboardContent) {
      setAddress(clipboardContent);
    }
  };

  useEffect(() => {
    estAmount(coin, amount);
  }, [amount]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.mainContainer}>
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
            coin={coin}
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
                estAmount(coin, Number(text));
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
            keyboardType="decimal-pad"
            label={t('Recipient Address')}
            value={address}
            onChangeText={setAddress}
            showRightText
            rightText={t('Paste')}
            rightTextColor={THEME.COLORS.textGrey}
            onPressRightText={onPaste}
          />

          <View style={styles.amountCard}>
            <AppText style={{ marginVertical: THEME.MARGIN.LOW }} medium>
              {t('Summary')}
            </AppText>
            <RowData
              label={t('Withdrawal Fee')}
              value={
                withdrawalFee
                  ? `${withdrawalFee} ${coin.ticker.toUpperCase()}`
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
                    ? `${finalAmount} ${coin.ticker.toUpperCase()}`
                    : '--'}
                </AppText>
              )}
            </View>
          </View>

          <View style={{ flex: 1 }} />
          <PrimaryButton
            disabled={
              !finalAmount ||
              !address ||
              Boolean(amountStr > coin?.amount) ||
              Boolean(!amountStr) ||
              Boolean(finalAmount > coin?.amount)
            }
            buttonStyle={{ width: '100%' }}
            title={t('Review')}
            onPress={onReview}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default WithdrawScreen;
