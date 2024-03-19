import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import AppText from '../../../../../shared/components/AppText';
import { THEME } from '../../../../../shared/theme';
import RowData from './RowData';
import { RF } from '../../../../../shared/theme/responsive';
import { estimateProfitAmount } from '../utils';
import { COLORS } from '../../../../../shared/constants/theme';
import { formatAssetAmmount } from '../../../../../shared/services/helper.service';
import { SummaryCardProps } from '../../types';

export default function SummaryCard(props: SummaryCardProps) {
  const { amount, coin, staking } = props;
  const { t } = useTranslation('all');

  return (
    <View style={styles.amountCard}>
      <RowData
        label={t('Amount')}
        value={`${amount} ${coin?.ticker.toUpperCase()}`}
      />

      <RowData
        label={t('Price')}
        value={`1 ${coin?.ticker.toUpperCase()} = ${
          coin?.currency?.price || '-'
        }`}
      />

      <RowData
        label="APR"
        value={staking?.profit ? `${staking.profit * 12}%` : '-'}
      />

      <View style={styles.finalAmountRow}>
        <AppText>{t('Earn Monthly')}</AppText>
        <AppText h3 semiBold color={THEME.COLORS.secondaryYellow}>
          {formatAssetAmmount(
            estimateProfitAmount(amount, staking?.profit || 0)
          )}{' '}
          {coin?.ticker.toUpperCase()}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  amountCard: {
    backgroundColor: COLORS.marketHeader,
    borderRadius: THEME.RADIUS.BOX,
    padding: RF(10),
    marginVertical: THEME.MARGIN.LOW,
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
