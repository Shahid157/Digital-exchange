import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { THEME } from '../../../../../shared/theme';
import AppText from '../../../../../shared/components/AppText';
import { RF } from '../../../../../shared/theme/responsive';
import { SwapStatsSummaryCardProps } from '../../types';

export default function SwapStatsSummaryCard(props: SwapStatsSummaryCardProps) {
  const { stats, loading } = props;

  function RowData({ label, value, loading }: any) {
    return (
      <View style={styles.row}>
        <AppText color={THEME.COLORS.textGrey}>{label}</AppText>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={THEME.COLORS.secondaryYellow}
          />
        ) : (
          <AppText color={THEME.COLORS.textGrey}>{value}</AppText>
        )}
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <AppText style={{ marginVertical: THEME.MARGIN.LOW }} medium>
        Summary
      </AppText>

      <RowData
        label="Total count"
        value={stats?.totalCount ? stats.totalCount : '--'}
        loading={loading}
      />

      <RowData
        label="Total amount"
        value={stats?.totalFromAmount ? stats.totalFromAmount : '--'}
        loading={loading}
      />

      <RowData
        label="Total amount AVR"
        value={
          stats?.totalFromAmountAvr ? stats.totalFromAmountAvr.toFixed(6) : '--'
        }
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: THEME.COLORS.secondaryBackground,
    borderRadius: THEME.RADIUS.BOX,
    padding: RF(10),
    marginVertical: THEME.MARGIN.NORMAL,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: THEME.MARGIN.LOW,
  },
});
