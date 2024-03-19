/* eslint-disable react/require-default-props */
import React, { useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { THEME } from 'shared/theme';
import { useTranslation } from 'react-i18next';
import { RF } from 'shared/theme/responsive';
import { useBackHandler } from '@react-native-community/hooks';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS } from 'shared/constants/theme';
import AppText from 'shared/components/AppText';
import GlobalRowData from 'shared/components/GlobalRowData';
import NetworkTag from 'shared/components/NetworkTag';
import { Portal } from '@gorhom/portal';
import moment from 'moment';
import { Transaction } from '../../../../../../../__generated__/graphql';
import { GetImageForCoin } from '../../../../../../../assets/images/coins';

interface SwapSuccessBottomSheetProps {
  successDetails: Transaction;
  sheetIndex?: number;
  setSheetIndex: (sheetIndex: number) => void;
  fromAmount?: number;
  fromCoin?: string;
  network: string;
  onClose: () => void;
  toAmount?: number;
  toCoin?: string;
  coinNetwork: string;
}

function SwapSuccessBottomSheet({
  successDetails,
  sheetIndex,
  fromAmount,
  onClose,
  fromCoin,
  network,
  toAmount,
  toCoin,
  coinNetwork,
}: SwapSuccessBottomSheetProps) {
  const { t } = useTranslation(['all']);
  const snapPoints = useMemo(() => [0.1, '80%'], []);
  const payload = successDetails?.payload;
  const fee = payload?.exchangeInfo?.fee || payload?.fee;

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        onPress={onClose}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    []
  );

  useBackHandler(() => {
    if (sheetIndex == 1) {
      onClose();
      return true;
    }
    return false;
  });

  return (
    <Portal>
      <BottomSheet
        onAnimate={(fromIndex: number, toIndex: number) => {
          if (toIndex == 0 && fromIndex == 1) {
            onClose();
          }
        }}
        index={sheetIndex}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.modalContainer}
        handleIndicatorStyle={{
          width: 0,
          height: 0,
        }}
      >
        <View style={{ padding: THEME.PADDING.LOW }}>
          <ScrollView>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <AnyIcon
                disabled
                name="close"
                type={Icons.AntDesign}
                size={20}
                color="white"
              />
            </TouchableOpacity>

            <View style={styles.viewContainer}>
              <AnyIcon
                disabled
                style={styles.iconStyle}
                name="swap-horizontal"
                type={Icons.MaterialCommunityIcons}
                size={64}
                color={COLORS.success}
              />
              <AppText h3 medium style={{ marginBottom: 25 }}>
                {t('Swap Request Successful')}
              </AppText>
            </View>
            <View style={styles.viewStyle}>
              <View
                style={{
                  marginBottom: 20,
                }}
              >
                <View>
                  <GlobalRowData
                    label={t('Status')}
                    value={t(successDetails?.status)}
                    colorValue="#FFCF54"
                  />

                  <GlobalRowData
                    label="Trx ID"
                    value={`#${successDetails?.id}`}
                  />
                  <GlobalRowData
                    label={t('Time Initiated')}
                    value={moment(successDetails?.createdAt).format(
                      'DD/MM/YYYY, HH:mm:SS'
                    )}
                  />
                </View>
                <View style={styles.subContainer} />

                <View>
                  <GlobalRowData
                    label={t('Fees')}
                    value={`${fee} ${fromCoin?.toUpperCase()}`}
                    colorValue="#FFCF54"
                  />
                </View>
              </View>

              <View style={styles.subContainer1}>
                <AppText h4 color="#979797">
                  {t('You swapped')}
                </AppText>
                <View style={styles.amountView}>
                  <AppText secondaryTitle semiBold style={{ marginTop: 5 }}>
                    {fromAmount}
                  </AppText>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      style={styles.coinIcon}
                      source={GetImageForCoin(fromCoin || '')}
                    />

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
                        {fromCoin}
                      </AppText>
                      <NetworkTag network={network} />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.swapContainer}>
                <View style={styles.swapContainerSub}>
                  <AnyIcon
                    style={styles.swapIcon}
                    name="swap"
                    type={Icons.Entypo}
                    size={16}
                    color={COLORS.dark}
                  />
                </View>
              </View>
              <View style={styles.swapAmountContainer}>
                <AppText h4 color="#979797">
                  {t('You swapped')}
                </AppText>
                <View style={styles.swapAmount}>
                  <AppText secondaryTitle semiBold style={{ marginTop: 5 }}>
                    {toAmount}
                  </AppText>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      style={styles.coinIcon}
                      source={GetImageForCoin(toCoin || '')}
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
                          style={{ textTransform: 'uppercase', marginTop: 4 }}
                        >
                          {toCoin}
                        </AppText>
                        <NetworkTag network={coinNetwork} />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </BottomSheet>
    </Portal>
  );
}

export default SwapSuccessBottomSheet;

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: THEME.RADIUS.MEDIUM,
    backgroundColor: '#262626', // Overlay color with 50% opacity,
  },
  coinIcon: {
    height: RF(30),
    width: RF(30),
    borderRadius: THEME.RADIUS.NORMAL,
    marginRight: RF(10),
  },
  closeButton: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderRadius: THEME.RADIUS.OVAL,
    marginRight: RF(10),
  },
  viewContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: RF(24),
  },
  viewStyle: {
    backgroundColor: '#181818',
    padding: 12,
    borderRadius: THEME.RADIUS.NORMAL,
  },
  subContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#454444',
    width: '100%',
    height: 1,
    marginVertical: 5,
  },
  subContainer1: {
    backgroundColor: '#262626',
    padding: 12,
    borderRadius: THEME.RADIUS.SMOOTH,
    zIndex: 9,
    position: 'relative',
  },
  amountView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  swapContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    position: 'relative',
  },
  swapContainerSub: {
    width: 24,
    height: 24,
    borderRadius: THEME.RADIUS.ROUND,
    padding: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#979797',
    marginTop: -5,
    marginBottom: -10,
  },
  swapIcon: {
    transform: [{ scaleX: -1 }, { rotate: '90deg' }],
    justifyContent: 'center',
    marginTop: 0,
  },
  swapAmountContainer: {
    backgroundColor: '#262626',
    padding: 12,
    borderRadius: THEME.RADIUS.NORMAL,
    zIndex: 9,
    position: 'relative',
  },
  swapAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
