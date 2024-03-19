import React, { useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { View, StyleSheet } from 'react-native';
import { THEME } from 'shared/theme';
import AppText from 'shared/components/AppText';
import { useTranslation } from 'react-i18next';
import { RF } from 'shared/theme/responsive';
import PrimaryButton from 'shared/components/PrimaryButton';
import FastImage from 'react-native-fast-image';
import { ICONS } from 'assets/images/icons';
import { useBackHandler } from '@react-native-community/hooks';
import { OTPBottomSheetProps } from 'screens/Main/Profile/types';

const OTPBottomSheet: React.FC<OTPBottomSheetProps> = ({
  onBottomSheetClose,
  loading,
  sheetIndex,
  setSheetIndex,
  navigation,
}) => {
  const { t } = useTranslation(['all']);
  const snapPoints = useMemo(() => [0.1, '45%'], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
        onPress={() => {
          setSheetIndex(0);
          navigation?.goBack();
        }}
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
      index={sheetIndex}
      onClose={() => setSheetIndex(0)}
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={{
        backgroundColor: THEME.COLORS.secondaryBackground,
      }}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ backgroundColor: THEME.COLORS.primary }}
    >
      <View style={{ padding: THEME.PADDING.NORMAL }}>
        <FastImage
          source={ICONS.SUCCESS}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.imageStyle}
        />
        <AppText h2 semiBold style={styles.textStyle}>
          {t('Phone Linked Successfully!', { ns: ['all'] })}
        </AppText>
        <PrimaryButton
          onPress={onBottomSheetClose}
          small
          loading={loading}
          title={t('DONE', { ns: ['all'] })}
          buttonStyle={{ marginVertical: THEME.MARGIN.NORMAL }}
        />
      </View>
    </BottomSheet>
  );
};

export default OTPBottomSheet;

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  imageStyle: {
    width: RF(150),
    height: RF(150),
    marginBottom: RF(15),
    alignSelf: 'center',
  },
});
