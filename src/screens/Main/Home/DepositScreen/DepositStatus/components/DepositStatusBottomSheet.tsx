import React, { useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { View, StyleSheet } from 'react-native';
import { THEME } from 'shared/theme';
import AppText from 'shared/components/AppText';
import { useTranslation } from 'react-i18next';
import { useBackHandler } from '@react-native-community/hooks';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import SecondaryButton from 'shared/components/SecondaryButton';
import PrimaryButton from 'shared/components/PrimaryButton';
import { DepositStatusBottomSheetProps } from 'screens/Main/Home/types';

const DepositStatusBottomSheet: React.FC<DepositStatusBottomSheetProps> = ({
  sheetIndex,
  setSheetIndex,
  onClose,
}) => {
  const { t } = useTranslation(['all']);
  const snapPoints = useMemo(() => [0.1, '30%'], []);

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
      handleIndicatorStyle={{ backgroundColor: THEME.COLORS.iconGrey }}
    >
      <View style={{ padding: THEME.PADDING.NORMAL }}>
        <AnyIcon
          style={{ alignSelf: 'flex-end' }}
          onPress={() => setSheetIndex(0)}
          type={Icons.Entypo}
          name="cross"
          size={25}
          color={THEME.COLORS.textGrey}
        />

        <AppText
          h1
          semiBold
          style={{ alignSelf: 'center' }}
          color={THEME.COLORS.secondaryYellow}
        >
          {t('Are You Sure?')}
        </AppText>
        <AppText
          h3
          style={{ marginVertical: THEME.MARGIN.LOW, alignSelf: 'center' }}
        >
          {t('Do you want to close this screen')}
        </AppText>
        <View style={styles.buttonContainer}>
          <SecondaryButton
            small
            buttonStyle={styles.button}
            textStyle={{
              color: THEME.COLORS.secondaryYellow,
            }}
            title={t('Cancel')}
            onPress={() => setSheetIndex(0)}
          />
          <PrimaryButton
            title={t('Close')}
            onPress={onClose}
            buttonStyle={{
              width: '85%',
              marginTop: 0,
              marginBottom: 2,
            }}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default DepositStatusBottomSheet;

const styles = StyleSheet.create({
  button: {
    width: '40%',
    shadowOpacity: 0,
    marginHorizontal: THEME.MARGIN.MID_LOW,
    backgroundColor: 'black',
    borderWidth: 1,
    marginBottom: 0,
    borderColor: THEME.COLORS.secondaryYellow,
  },
  buttonContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: THEME.MARGIN.MID_LOW,
  },
});
