import React, { useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { View, StyleSheet } from 'react-native';
import { THEME } from 'shared/theme';
import AppText from 'shared/components/AppText';
import { useTranslation } from 'react-i18next';
import { RF } from 'shared/theme/responsive';
import FastImage from 'react-native-fast-image';
import { ICONS } from 'assets/images/icons';
import PrimaryButton from 'shared/components/PrimaryButton';
import { useBackHandler } from '@react-native-community/hooks';

interface AuthOTPBottomSheetProps {
  sheetIndex?: number;
  setSheetIndex: (sheetIndex: number) => void;
  loading?: boolean;
  onPress?: () => void;
  navigation?: any;
}

const AuthOTPBottomSheet: React.FC<AuthOTPBottomSheetProps> = ({
  onPress,
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
      <View style={{ padding: THEME.PADDING.NORMAL }}>
        <FastImage
          source={ICONS.GOOGLE_AUTHENTICATOR}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.imageStyle}
        />
        <AppText h2 style={styles.textStyle}>
          {t('Google Authenticator Linked Successfully!', { ns: ['all'] })}
        </AppText>
        <PrimaryButton
          onPress={onPress}
          small
          loading={loading}
          title={t('DONE', { ns: ['all'] })}
          buttonStyle={{ marginVertical: THEME.MARGIN.NORMAL }}
        />
      </View>
    </BottomSheet>
  );
};

export default AuthOTPBottomSheet;

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: 30,
  },
  imageStyle: {
    width: RF(150),
    height: RF(150),
    marginBottom: RF(15),
    alignSelf: 'center',
  },
});
