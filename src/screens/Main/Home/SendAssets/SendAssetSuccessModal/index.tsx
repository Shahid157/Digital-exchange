import { Portal } from '@gorhom/portal';
import React, { useCallback, useMemo } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import AppText from 'shared/components/AppText';
import { THEME } from 'shared/theme';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { SvgUri } from 'react-native-svg';
import GlobalRowData from 'shared/components/GlobalRowData';
import NetworkTag from 'shared/components/NetworkTag';
import { useTranslation } from 'react-i18next';
import { formatAssetAmmount } from 'shared/services/helper.service';
import { useBackHandler } from '@react-native-community/hooks';
import { GetImageForCoin } from 'assets/images/coins';
import FastImage from 'react-native-fast-image';
import { SendAssetSuccessModalProps } from '../../types';
import { HP, RF } from '../../../../../shared/theme/responsive';

function SendAssetSuccessModal(props: SendAssetSuccessModalProps) {
  const { index, setIndex } = props;
  const { t } = useTranslation(['all']);
  const snapPoints = useMemo(() => [0.1, HP(60)], []);
  const isLocal = props?.coin?.isLocal;

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        onPress={() => setIndex(0)}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    []
  );

  useBackHandler(() => {
    if (index) {
      setIndex(0);
      return true;
    }
    return Boolean(index);
  });

  return (
    <Portal>
      <BottomSheet
        index={index}
        snapPoints={snapPoints}
        enablePanDownToClose
        onClose={() => setIndex(0)}
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.modalContainer}
        handleIndicatorStyle={{
          width: 0,
        }}
      >
        <View style={{ paddingHorizontal: THEME.PADDING.MID_LOW }}>
          <ScrollView>
            <TouchableOpacity
              onPress={() => setIndex(0)}
              style={styles.closeButton}
            >
              <AnyIcon
                disabled
                name="close"
                type={Icons.AntDesign}
                size={20}
                color="white"
              />
            </TouchableOpacity>

            <View
              style={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: RF(14),
              }}
            >
              <AnyIcon
                style={{
                  justifyContent: 'center',
                  marginTop: 0,
                  marginBottom: 20,
                }}
                name="arrow-top-right"
                type={Icons.MaterialCommunityIcons}
                size={64}
                color="#FFC128"
              />
              <AppText h3 medium style={{ marginBottom: 25 }}>
                {t('Send Request Successful')}
              </AppText>
            </View>
            <View
              style={{
                backgroundColor: '#181818',
                padding: RF(12),
                borderRadius: THEME.RADIUS.NORMAL,
                marginTop: RF(14),
              }}
            >
              <View style={{ paddingVertical: RF(10) }}>
                <View>
                  <GlobalRowData
                    label={t('Status')}
                    value={t('completed')}
                    // loading={rateLoading}
                    colorValue={THEME.COLORS.secondaryYellow}
                  />
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#454444',
                    width: '100%',
                    height: 1,
                    marginVertical: 5,
                  }}
                />

                <View>
                  <GlobalRowData
                    label={t('Recipient')}
                    value={props.recipient}
                    // loading={rateLoading}
                  />
                  <GlobalRowData
                    label={t('Fees')}
                    value={t('No Fees')}
                    colorValue="#5AFF6B"
                  />
                </View>
              </View>
              <View
                style={{
                  backgroundColor: '#262626',
                  padding: 12,
                  borderRadius: THEME.RADIUS.SMOOTH,
                  zIndex: 9,
                  position: 'relative',
                }}
              >
                <AppText h4 color="#979797">
                  {t('You sent')}
                </AppText>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <AppText secondaryTitle semiBold style={{ marginTop: 5 }}>
                    {formatAssetAmmount(props?.sentAmount || 0)}
                  </AppText>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    {!isLocal && (
                      <SvgUri
                        width={RF(22)}
                        height={RF(22)}
                        style={styles.coinIcon}
                        uri={props?.coin?.image}
                      />
                    )}
                    {isLocal && (
                      <FastImage
                        source={GetImageForCoin(props?.coin?.ticker || '')}
                        style={styles.localCoin}
                        resizeMode="contain"
                      />
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: RF(4),
                      }}
                    >
                      <AppText
                        h3
                        medium
                        style={{ textTransform: 'uppercase', right: RF(2) }}
                      >
                        {props?.coin?.ticker || '--'}
                      </AppText>
                      <NetworkTag network={props?.coin?.network} />
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

export default SendAssetSuccessModal;

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: THEME.RADIUS.MEDIUM,
    backgroundColor: '#262626', // Overlay color with 50% opacity
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
  },
  localCoin: {
    width: RF(22),
    height: RF(22),
    marginRight: RF(10),
  },
});
