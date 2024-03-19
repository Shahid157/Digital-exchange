import React from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import moment from 'moment';
import AppHeader from 'shared/components/AppHeader';
import AppText from 'shared/components/AppText';
import Divider from 'shared/components/Dividers';
import PrimaryButton from 'shared/components/PrimaryButton';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import FastImage from 'react-native-fast-image';
import { ICONS } from 'assets/images/icons';
import { SvgUri } from 'react-native-svg';
import ROUTE_NAMES from 'routes/RouteNames';
import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { emitRefreshWalletSubscription } from 'shared/store/slices/oneTimeEvents/oneTimeEvents.slice';
import { useBackHandler } from '@react-native-community/hooks';
import styles from './styles';
import { GenericNavigation } from '../../types';

function WithdrawStatus(props: GenericNavigation) {
  const { address, withdrawalFee, finalAmount, coin, trxDetails }: any =
    props?.route?.params;
  const { t } = useTranslation(['all']);
  const dispatch = useDispatch();

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
        <AppText medium color={THEME.COLORS.textGrey}>
          {label}
        </AppText>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={THEME.COLORS.secondaryYellow}
          />
        ) : (
          <AppText
            medium
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{ width: '40%', textAlign: 'right' }}
            color={
              label == 'Status'
                ? THEME.COLORS.secondaryYellow
                : THEME.COLORS.lightGrey
            }
          >
            {value}
          </AppText>
        )}
      </View>
    );
  }
  const onClose = async () => {
    dispatch(emitRefreshWalletSubscription);
    props?.navigation?.navigate(ROUTE_NAMES.HOME);
  };

  useBackHandler(() => {
    onClose();
    return true;
  });

  return (
    <ScrollView>
      <SafeAreaView style={styles.mainContainer}>
        <AppHeader leftIcon="back" title="Withdraw" leftIconPress={onClose} />

        <View style={styles.container}>
          <FastImage
            source={ICONS.WITHDRAW}
            style={{
              marginTop: THEME.MARGIN.NORMAL,
              width: RF(100),
              height: RF(100),
              alignSelf: 'center',
            }}
            resizeMode={FastImage.resizeMode.contain}
            tintColor={THEME.COLORS.secondaryYellow}
          />
          <AppText
            style={{ textAlign: 'center', marginTop: THEME.MARGIN.NORMAL }}
            h3
            semiBold
          >
            {t('Withdrawal Request Successful')}
          </AppText>
          <View style={styles.amountCard}>
            <RowData
              label={t('Status')}
              value={trxDetails?.status ? trxDetails.status : '--'}
            />
            <RowData
              label="Trx ID"
              value={
                trxDetails?.payload?.payoutHash
                  ? trxDetails?.payload?.payoutHash
                  : '--'
              }
            />
            <RowData
              label={t('Time Initiated')}
              value={
                trxDetails?.payload?.requestedAt
                  ? moment(trxDetails?.payload?.requestedAt).format(
                      'MM/DD/YYYY, HH:MM:SS'
                    )
                  : '--'
              }
            />
            <Divider />
            <RowData
              label={t('Network')}
              value={coin?.network ? coin?.network.toUpperCase() : '--'}
            />
            <RowData label={t('Wallet Address')} value={address || '--'} />
            <RowData
              label={t('Withdrawal Fee')}
              value={withdrawalFee || '--'}
            />

            <View style={styles.amountRow}>
              <AppText
                style={{ marginBottom: THEME.MARGIN.LOW }}
                semiBold
                color={THEME.COLORS.lightGrey}
              >
                {t('Amount')}
              </AppText>

              <View style={styles.subRow}>
                <AppText h1 semiBold>
                  {finalAmount ? `${finalAmount.toFixed(2)}` : '--'}
                </AppText>
                <View style={styles.icon}>
                  <SvgUri
                    width={RF(20)}
                    height={RF(20)}
                    style={{ marginRight: THEME.MARGIN.LOW }}
                    uri={coin?.image}
                  />
                  <AppText semiBold>
                    {coin?.ticker.toUpperCase()
                      ? coin?.ticker.toUpperCase()
                      : '--'}
                  </AppText>
                </View>
              </View>
            </View>
          </View>

          <PrimaryButton title={t('Close')} onPress={onClose} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default WithdrawStatus;
