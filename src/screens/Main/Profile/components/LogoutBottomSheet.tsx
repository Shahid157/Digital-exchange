import React, { useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { View, StyleSheet } from 'react-native';
import { THEME } from 'shared/theme';
import AppText from 'shared/components/AppText';
import { useTranslation } from 'react-i18next';
import SecondaryButton from 'shared/components/SecondaryButton';
import PrimaryButton from 'shared/components/PrimaryButton';
import { useBackHandler } from '@react-native-community/hooks';
import { LogoutBottomSheetProps } from '../types';

const LogoutBottomSheet: React.FC<LogoutBottomSheetProps> = ({
  handleLoading,
  onPress,
  onCancelPress,
  sheetIndex,
  setSheetIndex,
}) => {
  const { t } = useTranslation(['all']);
  const snapPoints = useMemo(() => [0.1, '22%'], []);

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
      index={sheetIndex}
      onClose={() => setSheetIndex(0)}
      backdropComponent={renderBackdrop}
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={[styles.logoutModal]}
      handleIndicatorStyle={{
        backgroundColor: THEME.COLORS.inputGrey,
      }}
    >
      <View style={{ margin: THEME.MARGIN.LOW }}>
        <AppText semiBold h4 color={THEME.COLORS.white}>
          {t('Are You Sure You want to logout?', { ns: ['all'] })}
        </AppText>
        <View style={styles.logoutButtons}>
          <SecondaryButton
            onPress={onCancelPress}
            disabled={handleLoading}
            buttonStyle={styles.cancelButton}
            title={t('Cancel', { ns: ['all'] })}
          />
          <PrimaryButton
            loading={handleLoading}
            onPress={onPress}
            buttonStyle={styles.logoutBtn}
            title={t('Logout', { ns: ['all'] })}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default LogoutBottomSheet;

const styles = StyleSheet.create({
  logoutButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: THEME.MARGIN.LOW,
  },
  logoutModal: {
    backgroundColor: THEME.COLORS.secondaryBackground,
  },
  cancelButton: {
    borderColor: THEME.COLORS.secondaryYellow,
    borderWidth: 1,
    backgroundColor: THEME.COLORS.BLACK_TRANS,
    width: '40%',
    marginHorizontal: THEME.MARGIN.LOW,
  },
  logoutBtn: {
    marginVertical: THEME.MARGIN.NORMAL,
    width: '80%',
    marginHorizontal: THEME.MARGIN.LOW,
  },
});
