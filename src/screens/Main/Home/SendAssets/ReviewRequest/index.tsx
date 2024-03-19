import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { useDispatch } from 'react-redux';
import AppHeader from 'shared/components/AppHeader';
import AppLoader from 'shared/components/AppLoader';
import AppText from 'shared/components/AppText';
import PrimaryButton from 'shared/components/PrimaryButton';
import { sendAssetV2Api } from 'shared/services/wallet.services';
import { emitRefreshWalletSubscription } from 'shared/store/slices/oneTimeEvents/oneTimeEvents.slice';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import ROUTE_NAMES from 'routes/RouteNames';
import { useMfaOTPPatchMutation } from 'shared/store/slices/mfa/mfa-otp.api';
import FastImage from 'react-native-fast-image';
import { GetImageForCoin } from 'assets/images/coins';
import { TransportTypes } from 'shared/store/slices/mfa/mfa-otp.types';
import { toast } from '../../../../../shared/services/helper.service';
import SendAssetSuccessModal from '../SendAssetSuccessModal';
import styles from './styles';
import { GenericNavigation, MFAMethods } from '../../types';

function ReviewRequest(props: GenericNavigation) {
  const { coin, transferAmount, recipient }: any = props?.route?.params;
  const { t } = useTranslation(['all']);
  const dispatch = useDispatch();
  const [modalIndex, setModalIndex] = useState(0);
  const [patchOtp, patchOtpResult] = useMfaOTPPatchMutation();
  const isLoading = patchOtpResult?.isLoading;
  const { isLocal } = coin.currency;

  useEffect(() => {
    if (patchOtpResult.isSuccess) {
      // @ts-ignore
      const otpId = patchOtpResult?.data?.id;
      toast(t('Success'), t('otpVerifiedSuccessfully'), 'success');
      sendAssetApi(otpId);
    }
    if (patchOtpResult.isError) {
      // @ts-ignore
      const message = patchOtpResult?.error?.data?.message;
      if (message == 'code not found' || 'Invalid code') {
        toast(t('Error'), t('Invalid Code'), 'error');
      } else if (message == 'user receiver does not exists') {
        toast(t('Error'), t('userDoesNotExist'), 'error');
      } else {
        toast(
          t('Error'),
          t('An error occurred while transferring assets'),
          'error'
        );
      }
    }
  }, [patchOtpResult]);

  const sendAssetApi = async (otpId: string) => {
    await sendAssetV2Api({
      coinId: coin?.currency?.legacyTicker,
      amount: transferAmount,
      userReceive: recipient,
      otps: [otpId],
    });
    dispatch(emitRefreshWalletSubscription());
    setModalIndex(1);
  };

  const onOptEntered = (otp: string, method: TransportTypes) => {
    const payload = {
      transport: method,
      code: otp,
    };
    patchOtp(payload);
  };

  const navigateToTransfer = async () => {
    props?.navigation?.navigate(ROUTE_NAMES.OPT_SWITCHER, {
      onOptEntered,
    });
  };

  function RowData({ label, value, loading, colorValue }: any) {
    return (
      <View style={styles.rowCont}>
        <AppText color={THEME.COLORS.textGrey}>{label}</AppText>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={THEME.COLORS.secondaryYellow}
          />
        ) : (
          <AppText color={colorValue || THEME.COLORS.textGrey}>{value}</AppText>
        )}
      </View>
    );
  }

  return (
    <>
      {isLoading && <AppLoader isVisible />}
      <SafeAreaView style={styles.mainContainer}>
        <AppHeader leftIcon="back" title={t('Review Your Request')} />
        <View style={{ padding: 10 }}>
          <View style={styles.coinBox}>
            <View style={styles.amountCont}>
              <AppText h4 color="#979797">
                {t('Amount')}:
              </AppText>
            </View>

            <View style={styles.amountCont}>
              <AppText h3>{transferAmount}</AppText>
              <View style={styles.svgCont}>
                {!isLocal && (
                  <SvgUri
                    width={RF(22)}
                    height={RF(22)}
                    style={styles.coinIcon}
                    uri={coin?.currency.image}
                  />
                )}
                {isLocal && (
                  <FastImage
                    source={GetImageForCoin(coin?.currency?.ticker || '')}
                    style={styles.localCoin}
                    resizeMode="contain"
                  />
                )}
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <AppText
                      h3
                      medium
                      style={{ textTransform: 'uppercase', marginTop: 4 }}
                    >
                      {coin.currency.ticker}
                    </AppText>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.amountCard}>
            <AppText style={{ marginVertical: THEME.MARGIN.VERYLOW }} medium>
              {t('Summary')}
            </AppText>

            <RowData label={`${t('Recipient')}:`} value={recipient} />

            <RowData
              label={`${t('Fees')}:`}
              value={t('No Fees')}
              colorValue="#5AFF6B"
            />

            <View style={styles.finalAmountRow}>
              <AppText>{t('You will send')}:</AppText>

              <AppText h3 semiBold color={THEME.COLORS.secondaryYellow}>
                {transferAmount}
              </AppText>
            </View>
          </View>
        </View>

        <View
          style={{
            marginBottom: THEME.MARGIN.LOW,
            paddingHorizontal: THEME.PADDING.LOW,
          }}
        >
          <PrimaryButton
            buttonStyle={{ width: '100%' }}
            title={t('Confirm')}
            onPress={navigateToTransfer}
          />
        </View>

        <SendAssetSuccessModal
          coin={coin?.currency}
          recipient={recipient}
          sentAmount={transferAmount || 0}
          index={modalIndex}
          setIndex={(index: number) => {
            setModalIndex(index);
            // if modal is seting index 0, indicates that is closing it, so, navigate to home
            if (!index) {
              props?.navigation?.navigate(ROUTE_NAMES.HOME);
            }
          }}
        />
      </SafeAreaView>
    </>
  );
}

export default ReviewRequest;
