import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import ROUTE_NAMES from 'routes/RouteNames';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import AppHeader from 'shared/components/AppHeader';
import AppText from 'shared/components/AppText';
import PrimaryButton from 'shared/components/PrimaryButton';
import {
  copyToClipboard,
  getNormalizedError,
} from 'shared/services/helper.service';
import { withdrawV2 } from 'shared/services/withdraw.services';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/store';
import AppLoader from 'shared/components/AppLoader';
import { SvgUri } from 'react-native-svg';
import NetworkTag from 'shared/components/NetworkTag';
import { useMfaOTPPatchMutation } from 'shared/store/slices/mfa/mfa-otp.api';
import { TransportTypes } from 'shared/store/slices/mfa/mfa-otp.types';
import { useWalletWithCoins } from '../../hooks/useWalletWithCoins';
import styles from './styles';
import { GenericNavigation } from '../../types';

function WithdrawReview(props: GenericNavigation) {
  const { user } = useSelector((state: RootState) => state.session);

  const walletWithCoins = useWalletWithCoins();
  const { amount, address, coin, withdrawalFee, finalAmount }: any =
    props?.route?.params;
  const { t } = useTranslation(['all']);
  const [patchOtp, patchOtpResult] = useMfaOTPPatchMutation();
  const isLoading = patchOtpResult?.isLoading;

  useEffect(() => {
    if (patchOtpResult.isSuccess) {
      // @ts-ignore
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
      if (message == 'Invalid code') {
        Toast.show({
          text1: t('Error', { ns: ['all'] }),
          text2: t('Invalid Code', { ns: ['all'] }),
          type: 'error',
        });
      } else {
        Toast.show({
          text1: t('Error', { ns: ['all'] }),
          text2: t('An error occurred while sending the code', { ns: ['all'] }),
          type: 'error',
        });
      }
    }
  }, [patchOtpResult]);

  function RowData({ label, value, loading }: any) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: THEME.MARGIN.LOW,
        }}
      >
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

  const withdrawAssets = async (otpId: string) => {
    try {
      const payload = {
        coinId: props?.route?.params?.coin?.currency?.legacyTicker,
        payoutAddress: address,
        amount,
        otps: [otpId],
        // transport: method
      };
      const res = await withdrawV2(walletWithCoins?.data?.id, payload);
      props?.navigation?.navigate(ROUTE_NAMES.WITHDRAW_STATUS, {
        trxDetails: res.data,
        address,
        withdrawalFee,
        amount,
        finalAmount,
        coin,
      });
    } catch (e) {
      const error = getNormalizedError(e);
      if (error === 'invalid_payout_address') {
        Toast.show({
          text2: t('invalid_address', { ns: ['all'] }),
          type: 'error',
        });
      } else {
        Toast.show({
          text2: error,
          type: 'error',
        });
      }
    }
  };

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
        address,
        withdrawalFee,
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
  return (
    <>
      {isLoading && <AppLoader isVisible />}
      <SafeAreaView style={styles.mainContainer}>
        <AppHeader leftIcon="back" title="Withdraw Review" />
        <View style={{ flex: 1, paddingHorizontal: RF(10) }}>
          <AppText style={{ marginTop: THEME.MARGIN.LOW }} h1 medium>
            {t('Please review your funds to withdraw from this wallet')}
          </AppText>
          <AppText
            color={THEME.COLORS.textGrey}
            style={{ marginVertical: THEME.MARGIN.NORMAL }}
          >
            {t(
              'Withdrawal process usually takes 5 minutes, however, it may exceed when processing large withdrawal amounts'
            )}
          </AppText>
          <View style={styles.container}>
            <View style={styles.amountInputContainer}>
              <AppText
                color={THEME.COLORS.textGrey}
                style={{ marginBottom: THEME.MARGIN.VERYLOW }}
              >
                {t('Amount')}
              </AppText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <AppText medium>{amount.toFixed(3)}</AppText>

                <View style={[styles.leftIconContainer]}>
                  <SvgUri
                    width={RF(20)}
                    height={RF(20)}
                    style={styles.image}
                    uri={coin?.image || coin?.icon || coin?.currency?.image}
                  />

                  <AppText style={{ marginRight: RF(5) }}>
                    {coin?.ticker?.toUpperCase()}
                  </AppText>
                  <NetworkTag network={coin?.network} />
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => copyToClipboard(address)}
              style={styles.inputContainer}
            >
              <View style={{ flex: 0.9 }}>
                <AppText
                  color={THEME.COLORS.textGrey}
                  style={{ marginBottom: THEME.MARGIN.VERYLOW }}
                >
                  {t('Recipient Address')}
                </AppText>
                <AppText medium>{address}</AppText>
              </View>
              <AnyIcon
                disabled
                type={Icons.Foundation}
                name="page-copy"
                size={25}
                color={THEME.COLORS.textGrey}
              />
            </TouchableOpacity>

            <View style={styles.amountCard}>
              <AppText style={{ marginVertical: THEME.MARGIN.LOW }} medium>
                Summary
              </AppText>
              <RowData
                label={t('Withdrawal Fee')}
                value={
                  withdrawalFee
                    ? `${withdrawalFee} ${coin?.ticker?.toUpperCase()}`
                    : '--'
                }
              />

              <View style={styles.finalAmountRow}>
                <AppText>{t('You will get')}</AppText>

                <AppText h3 semiBold color={THEME.COLORS.secondaryYellow}>
                  {finalAmount
                    ? `${finalAmount} ${coin?.ticker.toUpperCase()}`
                    : '--'}
                </AppText>
              </View>
            </View>

            <View style={{ flex: 1 }} />
            <PrimaryButton
              loading={isLoading}
              buttonStyle={{
                height: RF(50),
              }}
              title={t('Confirm Withdraw')}
              onPress={navigateToTransfer}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default WithdrawReview;
