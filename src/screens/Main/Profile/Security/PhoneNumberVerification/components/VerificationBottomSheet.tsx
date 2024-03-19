import React, { useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { View, StyleSheet } from 'react-native';
import { THEME } from 'shared/theme';
import AppText from 'shared/components/AppText';
import { useTranslation } from 'react-i18next';
import { RF } from 'shared/theme/responsive';
import FastImage from 'react-native-fast-image';
import { ICONS } from 'assets/images/icons';
import SecondaryButton from 'shared/components/SecondaryButton';
import { useBackHandler } from '@react-native-community/hooks';
import { VerificationBottomSheetProps } from 'screens/Main/Profile/types';

const VerificationBottomSheet: React.FC<VerificationBottomSheetProps> = ({
  onCancelPress,
  deleteSmsVerificationPress,
  sheetIndex,
  setSheetIndex,
}) => {
  const { t } = useTranslation(['all']);
  const snapPoints = useMemo(() => [0.1, '55%'], []);

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
      onClose={() => setSheetIndex(0)}
      index={sheetIndex}
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={{
        backgroundColor: THEME.COLORS.secondaryBackground,
      }}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ backgroundColor: THEME.COLORS.primary }}
    >
      <View
        style={{
          backgroundColor: THEME.COLORS.secondaryBackground,
          padding: 30,
        }}
      >
        <View style={stylesMain.imageContainer}>
          <FastImage
            source={ICONS.SHIELD}
            style={stylesMain.imageStyle}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <AppText
          h3
          color={THEME.COLORS.secondaryYellow}
          style={stylesMain.confirmationText}
        >
          {t('Are you sure you want to change SMS Verification?', {
            ns: ['all'],
          })}
        </AppText>
        <AppText h3 color={THEME.COLORS.white} style={stylesMain.textStyle}>
          {t(
            'Withdrawals and P2P transactions will be disabled for 24 hours after changing your  to ensure the safety of your assets',
            { ns: ['all'] }
          )}
        </AppText>
        <View style={stylesMain.buttonContainer}>
          <SecondaryButton
            onPress={onCancelPress}
            buttonStyle={stylesMain.cancelButton}
            title={t('Cancel', { ns: ['all'] })}
          />
          <SecondaryButton
            onPress={deleteSmsVerificationPress}
            buttonStyle={stylesMain.confirmButton}
            title={t('Confirm', { ns: ['all'] })}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default VerificationBottomSheet;

const stylesMain = StyleSheet.create({
  cancelButton: {
    backgroundColor: THEME.COLORS.secondaryBackground,
    width: '40%',
  },
  confirmButton: {
    width: '40%',
    marginLeft: THEME.MARGIN.LOW,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  textStyle: {
    letterSpacing: 1.5,
    lineHeight: 30,
    textAlign: 'justify',
    marginBottom: 10,
  },
  confirmationText: {
    letterSpacing: 2,
    lineHeight: 30,
    textAlign: 'justify',
    marginBottom: 10,
  },
  imageStyle: {
    height: RF(56),
    width: RF(77),
    marginRight: RF(10),
    marginBottom: RF(10),
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
