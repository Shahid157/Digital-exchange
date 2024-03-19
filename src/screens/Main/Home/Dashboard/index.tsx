import { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import AppHeader from 'shared/components/AppHeader';
import ROUTE_NAMES from 'routes/RouteNames';
import { axiosInstance } from 'shared/services/axiosInstance';
import { GlobalStyleSheet } from 'shared/constants/styleSheet';
import { COLORS } from 'shared/constants/theme';
import { useAppSelector } from 'shared/hooks/redux';
import { cardsAnalytics } from 'shared/constants/AppConstants';
import DashboardButtons from 'shared/components/DashboardButtons';
import { THEME } from 'shared/theme';
import { useTranslation } from 'react-i18next';
import { Currency } from '../../../../__generated__/graphql';
import PrimaryCheckbox from '../../../../shared/components/PrimaryCheckbox';
import { BalanceRow } from './components/BalanceRow';

export enum DashboardTabsEnum {
  DEPOSITS = 'Deposits',
  WITHDRAWALS = 'Withdrawals',
  SWAPS = 'Swaps',
  ANALYTICS = 'Analitycs',
}

export type BalanceDataType = {
  legacyTicker: string;
  pool: number;
  db: number;
  currency?: Currency;
};

export function AdminDashboard() {
  const { colors } = useTheme();
  const { t } = useTranslation('all');
  const navigation = useNavigation();
  const currencies = useAppSelector((state) => state.currencies.currencies);

  const [data, setData] = useState<BalanceDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [hideZeroDifferences, setHideZeroDifferences] = useState(true);

  const balancesWithCurrency = useMemo(
    () =>
      data.map((item) => ({
        ...item,
        currency: currencies.find((i) => i.legacyTicker === item.legacyTicker),
      })),
    [data, currencies]
  );

  const fetchBalances = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/temp/admin/balances/totals');
      setData(res.data);
    } catch (e) {
      Toast.show({
        text1: t('Error'),
        text2: t('Error getting balances'),
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalances();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={balancesWithCurrency.filter(
          (i) => !hideZeroDifferences || i.pool !== i.db
        )}
        refreshing={loading}
        onRefresh={fetchBalances}
        style={styles.internalContainer}
        keyExtractor={(item) => item.legacyTicker}
        renderItem={({ item }) => <BalanceRow data={item} />}
        ListHeaderComponent={
          <>
            <AppHeader leftIcon="back" title={t(ROUTE_NAMES.ADMIN_DASHBOARD)} />

            <View style={styles.dashboardButtons}>
              {cardsAnalytics.map((i: any, j: any) => (
                <DashboardButtons
                  key={j}
                  iconName={i.iconName}
                  title={t(i.title)}
                  description={t(i.description)}
                  onPress={() => navigation.navigate(i.screen as never)}
                />
              ))}
            </View>

            <View style={styles.itemsContainer}>
              <Text style={styles.tableHeaderName}>{t('Name')}</Text>
              <Text style={styles.tableHeaderPrice}>{t('Balance')}</Text>
            </View>

            <PrimaryCheckbox
              checked={hideZeroDifferences}
              setChecked={setHideZeroDifferences}
              onCheckColor={THEME.COLORS.primary}
              title={t('Hide zero differences')}
            />
          </>
        }
        ListEmptyComponent={
          <View style={styles.loading}>
            <Text>{t('Loading assets')}...</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
  },
  internalContainer: {},
  itemsContainer: {
    ...GlobalStyleSheet.shadow,
    backgroundColor: COLORS.marketHeader,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'space-between',
    flex: 1,
  },
  loading: {
    width: '100%',
    alignItems: 'center',
  },
  dashboardButtons: {
    marginVertical: THEME.MARGIN.LOW,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tableHeaderName: {
    color: COLORS.warning,
  },
  tableHeaderPrice: {
    color: COLORS.warning,
  },
});
