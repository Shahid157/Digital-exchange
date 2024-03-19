import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch, useSelector } from 'react-redux';
import AppHeader from 'shared/components/AppHeader';
import AppLoader from 'shared/components/AppLoader';
import AppText from 'shared/components/AppText';
import PrimaryButton from 'shared/components/PrimaryButton';
import { sendAssetApi } from 'shared/services/wallet.services';
import { RootState } from 'shared/store';
import { emitRefreshWalletSubscription } from 'shared/store/slices/oneTimeEvents/oneTimeEvents.slice';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { GenericNavigation, MFAMethods } from '../../types';
import styles from './styles';

function ReviewRequestWithDrawStaking(props: GenericNavigation) {
  const { coin, transferAmount, recipient }: any = props?.route?.params;
  const { user } = useSelector((state: RootState) => state.session);
  const { t } = useTranslation(['all']);
  const [loading, setLoading] = useState(false);
  const [rateLoading, setRateLoading] = useState(false);
  const dispatch = useDispatch();

  const sendAssets = async (otp: string, method: MFAMethods) => {
    setLoading(true);
    try {
      const payload = {
        coinId: coin?.currency?.legacyTicker,
        amount: transferAmount,
        userReceive: recipient,
        code: otp,
        transport: method,
      };

      const responseTransfer = await sendAssetApi(payload);
      if (responseTransfer.status === 201) {
        Toast.show({
          text1: t('Successful', { ns: ['all'] }),
          text2: t(
            `${`${transferAmount} ${coin?.currency?.ticker}`} has been successfully transferred to ${recipient}`,
            { ns: ['all'] }
          ),
          type: 'success',
        });
        setLoading(false);
        dispatch(emitRefreshWalletSubscription);
        props?.navigation?.navigate('Home');
      } else {
        // Handle other status codes or error scenarios if necessary
        // You can show a different toast message for other cases
        Toast.show({
          text1: t('Error', { ns: ['all'] }),
          text2: t('Failed to transfer assets', { ns: ['all'] }),
          type: 'error',
        });
        setLoading(false);
      }
    } catch (error) {
      // Handle any errors that occurred during the API call or other async operations
      // For example, show an error toast message
      Toast.show({
        text1: t('Error', { ns: ['all'] }),
        text2: t('An error occurred while transferring assets', {
          ns: ['all'],
        }),
        type: 'error',
      });
      setLoading(false);
    }
  };

  const onOptEntered = (otp: string, method: MFAMethods) => {
    sendAssets(otp, method);
  };

  const navigateToTransfer = async () => {
    const emailMethod = user?.twoFactorAuthenticationMethods.find(
      (method: any) => method.type === 'email'
    );

    if (emailMethod) {
      props?.navigation?.navigate('OPTSwitcher', {
        coin,
        transferAmount,
        recipient,
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

  function RowData({ label, value, loading, colorValue }: any) {
    return (
      <View style={styles.rowDataContainer}>
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
      {loading && <AppLoader isVisible />}
      <SafeAreaView style={styles.mainContainer}>
        <AppHeader
          leftIcon="back"
          title={t('Review Your Request', { ns: ['all'] })}
        />
        <View style={{ padding: 10 }}>
          <View style={styles.coinBox}>
            <View style={styles.amountStyle}>
              <AppText h4 color="#979797">
                {t('Amount', { ns: ['all'] })}:
              </AppText>
            </View>

            <View style={styles.transferAmount}>
              <AppText h3>{transferAmount}</AppText>
              <View style={styles.svgContainer}>
                <SvgUri
                  width={RF(22)}
                  height={RF(22)}
                  style={styles.coinIcon}
                  uri={coin?.currency.image}
                />
                <View>
                  <View style={styles.currencyTicker}>
                    <AppText
                      h3
                      medium
                      style={{ textTransform: 'uppercase', marginTop: 4 }}
                    >
                      {coin.currency.ticker}
                    </AppText>
                    <AppText
                      style={{
                        backgroundColor:
                          coin.currency.network == 'eth'
                            ? '#00AAF3'
                            : coin.currency.network == 'bsc'
                            ? '#F3BE00'
                            : '',
                        height: 16,
                        paddingHorizontal: 4,
                        borderRadius: THEME.RADIUS.SMALLBOX,
                        marginLeft: 5,
                        color: '#262626',
                      }}
                      h5
                      medium
                    >
                      {coin.currency.network.toUpperCase()}
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
              {t('Summary', { ns: ['all'] })}
            </AppText>

            <RowData
              label={`${t('Recipient', { ns: ['all'] })}:`}
              value={recipient}
            />
            <RowData
              label={`${t('Fees', { ns: ['all'] })}:`}
              value={t('No Fees', { ns: ['all'] })}
              loading={rateLoading}
              colorValue="#5AFF6B"
            />

            <View style={styles.finalAmountRow}>
              <AppText>{t('You will send', { ns: ['all'] })}:</AppText>

              <AppText h3 semiBold color={THEME.COLORS.secondaryYellow}>
                {transferAmount}
              </AppText>
            </View>
          </View>
          <View style={{ flex: 1, marginTop: 100 }}>
            <PrimaryButton
              buttonStyle={{ width: '100%' }}
              title={t('Confirm', { ns: ['all'] })}
              onPress={navigateToTransfer}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default ReviewRequestWithDrawStaking;
