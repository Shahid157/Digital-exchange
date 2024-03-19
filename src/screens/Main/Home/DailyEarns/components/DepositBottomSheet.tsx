import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { useBackHandler } from '@react-native-community/hooks';
import { THEME } from '../../../../../shared/theme';
import AppText from '../../../../../shared/components/AppText';
import Divider from '../../../../../shared/components/Dividers';
import { RF } from '../../../../../shared/theme/responsive';
import PrimaryButton from '../../../../../shared/components/PrimaryButton';
import RowData from './RowData';
import { formatAssetAmmount } from '../../../../../shared/services/helper.service';
import { estimateProfitAmount } from '../utils';
import PrimaryCheckboxV2 from '../../../../../shared/components/PrimaryCheckboxV2';
import { DepositBottomSheetTopProps } from '../../types';

export default function DepositBottomSheet(props: DepositBottomSheetTopProps) {
  const { open, setOpen, onDeposit, profit, coin, amount } = props;
  const { t } = useTranslation('all');
  const [index, setIndex] = useState(0);
  const [termsCheck, setTermsCheck] = useState(false);
  const depositSnapPoints = useMemo(() => [0.1, '55%'], []);

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
    const idx = open ? 1 : 0;
    setIndex(idx);
  }, [open]);

  useBackHandler(() => {
    if (open) {
      setOpen(false);
      return true;
    }
    return false;
  });

  return (
    <BottomSheet
      index={index}
      snapPoints={depositSnapPoints}
      onClose={() => setOpen(false)}
      enablePanDownToClose
      backgroundStyle={{
        backgroundColor: '#191C1B',
      }}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{
        backgroundColor: THEME.COLORS.inputGrey,
      }}
    >
      <View style={{ padding: THEME.PADDING.MID_LOW }}>
        <AppText h2 semiBold>
          {t('Deposit & Earn')}
        </AppText>

        <Divider />

        <View style={styles.amountCard}>
          <RowData label={t('Earning Delivery')} value={t('Daily')} />

          <RowData
            label={t('Reward percenge per day')}
            value={profit ? `${profit}%` : '-'}
          />

          <View style={styles.finalAmountRow}>
            <AppText>{t('You Will Earn')}</AppText>
            <AppText h3 semiBold color={THEME.COLORS.secondaryYellow}>
              {formatAssetAmmount(estimateProfitAmount(amount, profit || 0))}{' '}
              {coin?.ticker.toUpperCase()}
            </AppText>
          </View>

          <AppText
            h5
            color={THEME.COLORS.textGrey}
            style={{ marginTop: RF(5) }}
          >
            {t('Earnings will be transferred to your main wallet.')}
          </AppText>
        </View>

        <PrimaryCheckboxV2
          checked={termsCheck}
          setChecked={setTermsCheck}
          onCheckColor={THEME.COLORS.primary}
          textStyle={{ fontSize: THEME.FONTS.SIZE.XXXSMALL }}
          title={t('I have read and accept the Terms & Risk.')}
        />

        <PrimaryButton
          disabled={!termsCheck}
          onPress={onDeposit}
          title={t('Confirm Deposit')}
          buttonStyle={{ marginVertical: THEME.MARGIN.NORMAL }}
        />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  amountCard: {
    backgroundColor: '#181818',
    borderRadius: THEME.RADIUS.BOX,
    padding: RF(10),
    marginVertical: THEME.MARGIN.NORMAL,
  },
  finalAmountRow: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: THEME.PADDING.LOW,
    paddingVertical: THEME.PADDING.MID_LOW,
    borderRadius: THEME.RADIUS.SMALLBOX,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: THEME.MARGIN.LOW,
  },
});
