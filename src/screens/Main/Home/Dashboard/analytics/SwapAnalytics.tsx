import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import AppHeader from 'shared/components/AppHeader';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'shared/hooks/redux';
import { getBalanceSwaps } from '../../../../../shared/services/tempAdmin.services';
import { Currency } from '../../../../../__generated__/graphql';
import SwapCoinsSelectionCard from '../components/SwapCoinsSelectionCard';
import SwapStatsSummaryCard from '../components/SwapStatsSummaryCard';

export enum RoutesNamesEnum {
  DEPOSIT = 'Deposit',
  WITHDRAWAL = 'Withdraw',
}

export const Tabs = [RoutesNamesEnum.DEPOSIT, RoutesNamesEnum.WITHDRAWAL];

const defaultFromLegacyTicker = 'usdtbsc';
const defaultToLegacyTicker = 'daibsc';

function SwapAnalytics() {
  const { colors } = useTheme();
  const currencies = useAppSelector((state) => state.currencies.currencies);
  const { t } = useTranslation(['all']);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataSet, setDataSet] = useState('1w');
  const [timeFrame, setTimeFrame] = useState('12h');

  const [coin1, setCoin1] = useState<Currency | undefined>(
    currencies.find((it) => it.legacyTicker === defaultFromLegacyTicker)
  );
  const [coin2, setCoin2] = useState<Currency | undefined>(
    currencies.find((it) => it.legacyTicker === defaultToLegacyTicker)
  );

  const fetchSwaps = async () => {
    if (!coin1 || !coin2) return;
    try {
      setLoading(true);
      const response = await getBalanceSwaps({
        dataSet,
        timeFrame,
        fromLegacyTicker: coin1.legacyTicker,
        toLegacyTicker: coin2.legacyTicker,
      });
      setData(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSwaps();
  }, [coin1, coin2, dataSet, timeFrame]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader leftIcon="back" title={t('Swaps Analytics')} />

      <SwapCoinsSelectionCard
        from={coin1}
        to={coin2}
        dataSet={dataSet}
        timeFrame={timeFrame}
        setFrom={setCoin1}
        setTo={setCoin2}
        setDataSet={setDataSet}
        setTimeFrame={setTimeFrame}
        stats={data}
      />

      <SwapStatsSummaryCard stats={data} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});

export default SwapAnalytics;
