import React, { useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { THEME } from 'shared/theme';
import { useTranslation } from 'react-i18next';
import { RF } from 'shared/theme/responsive';
import { useBackHandler } from '@react-native-community/hooks';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import AppText from 'shared/components/AppText';
import { SvgUri } from 'react-native-svg';
import NetworkTag from 'shared/components/NetworkTag';
import Divider from 'shared/components/Dividers';
import moment from 'moment';
import { formatAssetAmmount } from 'shared/services/helper.service';
import { SwapHistoryBottomSheetProps } from 'screens/Main/Home/types';

const SwapHistoryBottomSheet: React.FC<SwapHistoryBottomSheetProps> = ({
  sheetIndex,
  setSheetIndex,
  onClose,
  fromCoin,
  toCoin,
  txDetails,
  getStatusTranslation,
  coin,
  imageLoading,
  handleImageLoaded,
}) => {
  const { t } = useTranslation(['all']);
  const snapPoints = useMemo(() => [0.1, '55%'], []);

  function RowData({ label, value, loading, colorValue }: any) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: THEME.MARGIN.VERYLOW,
        }}
      >
        <AppText color={THEME.COLORS.textGrey}>{label}</AppText>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={THEME.COLORS.secondaryYellow}
          />
        ) : (
          <AppText
            ellipsizeMode="middle"
            numberOfLines={1}
            style={{
              width: '50%',
              textAlign: 'right',
            }}
            color={colorValue || THEME.COLORS.textGrey}
          >
            {value}
          </AppText>
        )}
      </View>
    );
  }

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    []
  );

  useBackHandler(() => {
    if (sheetIndex == 1) {
      setSheetIndex(0);
      return true;
    }
    return false;
  });

  return (
    <BottomSheet
      onClose={onClose}
      index={sheetIndex}
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={{
        backgroundColor: '#181818',
      }}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{
        backgroundColor: THEME.COLORS.inputGrey,
      }}
    >
      <View style={styles.bottomSheetContainer}>
        <AppText h3 medium>
          {t('Transaction Details', { ns: ['all'] })}
        </AppText>
        <Divider />

        <RowData
          label={t('Status', { ns: ['all'] })}
          value={getStatusTranslation}
          colorValue={
            txDetails?.status == 'Rejected'
              ? THEME.COLORS.errorRed
              : txDetails?.status == 'Completed'
                ? THEME.COLORS.sharpGreen
                : THEME.COLORS.secondaryYellow
          }
        />

        <RowData
          label="Trx ID"
          value={
            txDetails?.type == 'Deposit'
              ? txDetails?.payload?.payinHash
              : txDetails?.type == 'Swap'
                ? txDetails?.payload?.id
                : txDetails?.type == 'Transfer'
                  ? txDetails?.id
                  : txDetails?.payload?.payoutHash
          }
        />

        {txDetails?.type == 'Swap' && (
          <>
            <RowData
              label={t('From Address', { ns: ['all'] })}
              value={txDetails?.payload?.from}
            />
            <RowData
              label={t('To Address', { ns: ['all'] })}
              value={txDetails?.payload?.to}
            />
          </>
        )}
        <RowData
          label={t('Time Initiated', { ns: ['all'] })}
          value={moment(txDetails?.createdAt).format('DD/MM/YYYY, HH:MM a')}
        />
        <RowData
          label={t('Time Completed', { ns: ['all'] })}
          value={moment(txDetails?.updatedAt).format('DD/MM/YYYY, HH:MM a')}
        />

        <Divider />
        {!(txDetails?.type === 'Swap') && (
          <RowData
            label={t('Address', { ns: ['all'] })}
            value={
              txDetails?.type == 'Deposit'
                ? txDetails?.payload?.payinAddress
                : txDetails?.type == 'Transfer'
                  ? txDetails?.movements[1]?.wallet
                  : txDetails?.payload?.payoutAddress
            }
          />
        )}
        {!(txDetails?.type === 'Deposit' || 'Swap' || 'Transfer') && (
          <RowData
            label={t('Withdrawal Fee', { ns: ['all'] })}
            value={`${txDetails?.payload?.fee} ${coin?.ticker?.toUpperCase()}`}
          />
        )}
      </View>

      <View style={styles.totalContainer}>
        {txDetails?.type == 'Swap' ? (
          <View style={[styles.container]}>
            <View style={[styles.subContainer, { alignItems: 'flex-start' }]}>
              <View style={styles.coinItem}>
                {imageLoading && (
                  <ActivityIndicator
                    size={30}
                    color={THEME.COLORS.secondaryYellow}
                    style={styles.loader}
                  />
                )}

                <SvgUri
                  width={RF(20)}
                  height={RF(20)}
                  style={styles.coinIcon}
                  uri={fromCoin?.currency?.image}
                  onLoad={handleImageLoaded}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <AppText medium style={[styles.coinName]}>
                    {fromCoin?.ticker?.toUpperCase()}
                  </AppText>
                  <NetworkTag network={fromCoin?.network} />
                </View>
              </View>
              <AppText
                style={{ textAlign: 'center' }}
                semiBold
                color={THEME.COLORS.white}
              >
                {formatAssetAmmount(txDetails?.payload?.fromAmount)}{' '}
              </AppText>
            </View>
            <View style={styles.subContainer}>
              <AnyIcon
                type={Icons.AntDesign}
                name="arrowright"
                size={20}
                color={THEME.COLORS.secondaryYellow}
              />
            </View>
            <View style={[styles.subContainer, { alignItems: 'flex-end' }]}>
              <View style={styles.coinItem}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <AppText medium style={[styles.coinName]}>
                    {toCoin?.ticker?.toUpperCase()}
                  </AppText>
                  <NetworkTag network={toCoin?.network} />
                </View>
                {imageLoading && (
                  <ActivityIndicator
                    size={30}
                    color={THEME.COLORS.secondaryYellow}
                    style={styles.loader}
                  />
                )}

                <SvgUri
                  width={RF(20)}
                  height={RF(20)}
                  style={styles.coinIcon}
                  uri={toCoin?.currency?.image}
                  onLoad={handleImageLoaded}
                />
              </View>
              <AppText
                style={{ textAlign: 'center' }}
                semiBold
                color={THEME.COLORS.white}
              >
                {formatAssetAmmount(txDetails?.payload?.toAmount)}{' '}
              </AppText>
            </View>
          </View>
        ) : txDetails?.type == 'Transfer' ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <SvgUri
                width={RF(22)}
                height={RF(22)}
                uri={coin?.currency?.image}
              />

              <AppText
                h3
                medium
                style={{
                  textTransform: 'uppercase',
                  marginHorizontal: RF(10),
                }}
              >
                {coin?.ticker}
              </AppText>

              <NetworkTag network={coin?.network} />
            </View>
            <AppText
              h3
              medium
              style={{
                textTransform: 'uppercase',
                marginHorizontal: RF(10),
              }}
            >
              {formatAssetAmmount(txDetails?.movements[0].amount)}
            </AppText>
          </View>
        ) : (
          <>
            <AppText h4 color="#979797">
              {t('You received', { ns: ['all'] })}
            </AppText>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <AppText secondaryTitle semiBold style={{ marginTop: 5 }}>
                {txDetails?.type == 'Deposit'
                  ? formatAssetAmmount(txDetails?.payload?.expectedAmountTo)
                  : formatAssetAmmount(txDetails?.payload?.amount)}
              </AppText>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <SvgUri
                  width={RF(22)}
                  height={RF(22)}
                  uri={coin?.currency?.image}
                />

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
                      style={{
                        textTransform: 'uppercase',
                        marginHorizontal: RF(10),
                      }}
                    >
                      {coin?.ticker}
                    </AppText>

                    <NetworkTag network={coin?.network} />
                  </View>
                </View>
              </View>
            </View>
          </>
        )}
      </View>
    </BottomSheet>
  );
};

export default SwapHistoryBottomSheet;

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    marginVertical: THEME.MARGIN.LOW,
  },
  bottomSheetContainer: { padding: THEME.PADDING.NORMAL },
  totalContainer: {
    backgroundColor: '#262626',
    padding: 12,
    marginHorizontal: 12,
    borderRadius: THEME.RADIUS.BOX,
    zIndex: 9,
    position: 'relative',
  },
  container: {
    borderRadius: THEME.RADIUS.BOX,
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
  },
  loader: {
    marginRight: RF(10),
  },
  coinName: {
    marginHorizontal: RF(3),
  },
  coinItem: {
    marginBottom: THEME.MARGIN.VERYLOW,
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinIcon: {
    height: RF(20),
    width: RF(20),
    borderRadius: THEME.RADIUS.OVAL,
  },
  noRecord: { alignSelf: 'center', marginVertical: RF(10) },
});
