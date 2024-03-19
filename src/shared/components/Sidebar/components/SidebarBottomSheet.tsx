import React, { useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { View, StyleSheet } from 'react-native';
import { THEME } from 'shared/theme';
import AppText from 'shared/components/AppText';
import { useTranslation } from 'react-i18next';
import SecondaryButton from 'shared/components/SecondaryButton';
import PrimaryButton from 'shared/components/PrimaryButton';
import { useBackHandler } from '@react-native-community/hooks';

interface SidebarBottomSheetProps {
  handleLoading?: boolean;
  onCancel?: () => void;
  onLogout?: () => void;
  sheetIndex?: number;
  setSheetIndex: (sheetIndex: number) => void;
}

const SidebarBottomSheet: React.FC<SidebarBottomSheetProps> = ({
  handleLoading,
  onCancel,
  onLogout,
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
            onPress={onCancel}
            disabled={handleLoading}
            buttonStyle={styles.cancelButton}
            title="Cancel"
          />
          <PrimaryButton
            loading={handleLoading}
            onPress={onLogout}
            buttonStyle={styles.logoutBtn}
            title="Logout"
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default SidebarBottomSheet;

const styles = StyleSheet.create({
  logoutButton: {
    width: '80%',
    borderWidth: 1,
    borderColor: THEME.COLORS.secondaryYellow,
    backgroundColor: 'transparent',
    borderRadius: THEME.RADIUS.SMALLBOX,
    marginVertical: THEME.MARGIN.HIGH,
  },
  logoutModal: {
    backgroundColor: THEME.COLORS.secondaryBackground,
  },
  logoutButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: THEME.MARGIN.NORMAL,
  },
  cancelButton: {
    borderColor: THEME.COLORS.secondaryYellow,
    borderWidth: 1,
    backgroundColor: THEME.COLORS.BLACK_TRANS,
    width: '40%',
    marginHorizontal: THEME.MARGIN.LOW,
  },
  logoutBtn: {
    width: '80%',
    marginHorizontal: THEME.MARGIN.LOW,
  },
});
