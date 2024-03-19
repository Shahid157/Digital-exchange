import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { Portal } from '@gorhom/portal';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { useBackHandler } from '@react-native-community/hooks';
import { THEME } from '../../../../shared/theme';
import AppText from '../../../../shared/components/AppText';
import AnyIcon, { Icons } from '../../../../shared/components/AnyIcon';
import PrimaryButton from '../../../../shared/components/PrimaryButton';
import { RF } from '../../../../shared/theme/responsive';
import styles from './styles';
import { KycRestrictionBottomSheetProps } from '../types';

export default function kycRestrictionBottomSheet(
  props: KycRestrictionBottomSheetProps
) {
  const { open, setOpen, onCompleteKyc } = props;
  const { t } = useTranslation(['all']);
  const [index, setIndex] = useState(0);
  const snapPoints = useMemo(() => [0.1, '40%'], []);

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

  useEffect(() => {
    setIndex(open ? 1 : 0);
  }, [open]);

  useBackHandler(() => {
    if (open) {
      setOpen(false);
      return true;
    }
    return false;
  });

  return (
    <Portal>
      <BottomSheet
        onClose={() => setOpen(false)}
        index={index}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: THEME.COLORS.secondaryBackground,
        }}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{
          backgroundColor: THEME.COLORS.inputGrey,
        }}
      >
        <View style={styles.kycContainer}>
          <AppText
            title
            color={THEME.COLORS.secondaryYellow}
            semiBold
            style={{
              alignSelf: 'center',
            }}
          >
            {t('KYC Not Verified')}
          </AppText>
          <AnyIcon
            type={Icons.MaterialIcons}
            size={100}
            color={THEME.COLORS.secondaryYellow}
            name="error"
            style={{ alignSelf: 'center' }}
          />
          <AppText medium style={styles.kycText}>
            {t(
              'Your KYC not Verified or completed, Please Complete your Verify and Try Again.'
            )}
          </AppText>
          <PrimaryButton
            title={t('Complete KYC')}
            onPress={onCompleteKyc}
            buttonStyle={{ marginTop: RF(10) }}
          />
        </View>
      </BottomSheet>
    </Portal>
  );
}
