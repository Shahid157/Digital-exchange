import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from 'shared/constants/theme';
import AppHeader from 'shared/components/AppHeader';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native-gesture-handler';
import { useAppSelector } from 'shared/hooks/redux';
import { GlobalStyleSheet } from 'shared/constants/styleSheet';
import { AnalyticsTabs } from 'screens/Main/Home/Dashboard/analytics/AnalyticsTabs';
import BalanceStatItem from 'screens/Main/Home/Dashboard/components/BalanceStatItem';
import { getBalanceStats } from '../../../../../shared/services/tempAdmin.services';
import PrimaryCheckbox from '../../../../../shared/components/PrimaryCheckbox';
import { THEME } from '../../../../../shared/theme';
import DepositWithdrawStatCard from '../components/DepositWithdrawStatCard';
import AppText from '../../../../../shared/components/AppText';
import IntervalSelect from '../components/InvervalSelect';
import { RF } from '../../../../../shared/theme/responsive';

export enum RoutesNamesEnum {
  DEPOSIT = 'Deposit',
  WITHDRAWAL = 'Withdraw',
}

export const Tabs = [RoutesNamesEnum.DEPOSIT, RoutesNamesEnum.WITHDRAWAL];

const DatasetValues = [
  '1h',
  '2h',
  '4h',
  '6h',
  '11h',
  '1d',
  '3d',
  '1w',
  '15d',
  '30d',
];

const TimeFrameValues = ['1h', '2h', '4h', '6h', '12h'];

function AnalyticsView() {
  const { colors } = useTheme();
  const currencies = useAppSelector((state) => state.currencies.currencies);

  const { t } = useTranslation(['all']);
  const [activeTab, setActiveTab] = useState(RoutesNamesEnum.DEPOSIT);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataSet, setDataSet] = useState('1w');
  const [timeFrame, setTimeFrame] = useState('12h');
  const [hideZeroStats, setHideZeroStats] = useState(true);

  const dataWithCurrency = useMemo(
    () =>
      data.map((item: any) => ({
        ...item,
        currencyData: currencies.find(
          (it) => it.legacyTicker === item.currency
        ),
      })),
    [data, currencies]
  );

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getBalanceStats({
        dataSet,
        timeFrame,
        type: activeTab,
      });
      setData(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [activeTab, timeFrame, activeTab]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={dataWithCurrency.filter(
          (it) => !hideZeroStats || it.totalAmount > 0
        )}
        refreshing={loading}
        keyExtractor={(item) => item.legacyTicker}
        renderItem={({ item }) => (
          <BalanceStatItem
            dataFrame={timeFrame}
            dataSet={dataSet}
            key={item.ticker}
            data={item}
          />
        )}
        ListHeaderComponent={
          <>
            <AppHeader leftIcon="back" title={t('Statistics')} />

            <AppText h2 color={COLORS.white} style={styles.title}>
              {t('Analytics')}
            </AppText>

            <DepositWithdrawStatCard
              defaultCurrency="usdtbsc"
              dataSet={dataSet}
              timeFrame={timeFrame}
              type={activeTab}
            />

            <View style={styles.rowFlex}>
              <View>
                <AnalyticsTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </View>

              <View style={styles.rowFlex}>
                <IntervalSelect
                  interval={dataSet}
                  intervals={DatasetValues}
                  onIntervalChange={setDataSet}
                />

                <IntervalSelect
                  interval={timeFrame}
                  intervals={TimeFrameValues}
                  onIntervalChange={setTimeFrame}
                />
              </View>
            </View>

            <View style={styles.itemsContainer}>
              <Text style={styles.tableHeaderName}>{t('Name')}</Text>
              <Text style={styles.tableHeaderPrice}>{t('Price')}</Text>
            </View>

            <PrimaryCheckbox
              checked={hideZeroStats}
              setChecked={setHideZeroStats}
              onCheckColor={THEME.COLORS.primary}
              title={t('Hide 0 movements')}
            />
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: RF(10),
    marginLeft: 15,
    ...FONTS.fontMedium,
  },
  rowFlex: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingText: {
    textAlign: 'center',
  },
  itemsContainer: {
    ...GlobalStyleSheet.shadow,
    backgroundColor: COLORS.marketHeader,
    borderRadius: THEME.RADIUS.BOX,
    flexDirection: 'row',
    height: 40,
    paddingLeft: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  tableHeaderName: {
    color: COLORS.warning,
    width: '70%',
  },
  tableHeaderPrice: {
    color: COLORS.warning,
    width: '30%',
    paddingLeft: 15,
  },
});

export default AnalyticsView;
