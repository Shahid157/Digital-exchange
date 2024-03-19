import React, { useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { View, StyleSheet } from 'react-native';
import { THEME } from 'shared/theme';
import AppText from 'shared/components/AppText';
import { useTranslation } from 'react-i18next';
import { RF } from 'shared/theme/responsive';
import FastImage from 'react-native-fast-image';
import { ICONS } from 'assets/images/icons';
import { useBackHandler } from '@react-native-community/hooks';
import { PasswordVerificationBottomSheetProps } from 'screens/Main/Profile/types';
import { useNavigation } from '@react-navigation/native';

const PasswordVerificationBottomSheet: React.FC<
  PasswordVerificationBottomSheetProps
> = ({ sheetIndex, setSheetIndex }) => {
  const navigation = useNavigation();
  const { t } = useTranslation(['all']);
  const snapPoints = useMemo(() => [0.1, '45%'], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        onPress={() => navigation?.goBack()}
        disappearsOnIndex={0}
        appearsOnIndex={1}
        opacity={0.9}
      />
    ),
    []
  );

  useBackHandler(() => {
    if (sheetIndex == 1) {
      navigation.goBack();
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
        backgroundColor: THEME.COLORS.iconGrey,
        borderRadius: THEME.RADIUS.ROUND,
      }}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ backgroundColor: THEME.COLORS.sheetGrey }}
    >
      <View style={{ padding: THEME.PADDING.NORMAL }}>
        <FastImage
          source={ICONS.SECURITY}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.imageStyle}
        />
        <AppText h1 style={styles.textStyle}>
          {t('Password Updated Successfully', { ns: ['all'] })}
        </AppText>
      </View>
    </BottomSheet>
  );
};

export default PasswordVerificationBottomSheet;

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: 'center',
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
  },
  imageStyle: {
    width: RF(170),
    height: RF(170),
    alignSelf: 'center',
  },
});
