import React, { useRef, useEffect, useState, useMemo } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Currency } from '__generated__/graphql';
import { COLORS, FONTS, SIZES } from 'shared/constants/theme';
import { RF } from 'shared/theme/responsive';
import { LineChart } from 'react-native-chart-kit';
import { THEME } from 'shared/theme';
import { getBalanceStats } from '../../../../../shared/services/tempAdmin.services';
import CurrencySwitchButton from './CurrencySwitchButton';
import { useAppSelector } from '../../../../../shared/hooks/redux';
import CoinSelectionModal from '../../ExchangeCurrency/CoinSelectionModal';

const MockData = [
  20, 30, 20, 60, 40, 70, 50, 60, 40, 65, 70, 45, 70, 60, 75, 80, 75, 70, 75,
  60, 40, 70, 65, 75, 60, 70, 45, 70, 50,
];

export interface DepositWithdrawStatCardProps {
  defaultCurrency?: string;
  dataSet: string;
  timeFrame: string;
  type: string;
}

function DepositWithdrawStatCard(props: any) {
  const { defaultCurrency, dataSet, timeFrame, type } = props;
  const { t } = useTranslation('all');
  const currencies = useAppSelector((state) => state.currencies.currencies);

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<
    Currency | undefined
  >(
    defaultCurrency
      ? currencies.find((c: Currency) => c.legacyTicker === defaultCurrency)
      : undefined
  );

  const chartWidth = useRef(new Animated.Value(0)).current;

  const data: number[] = useMemo(() => {
    if (!stats) return [];
    return stats.splits.map((split: any) => split.totalAmount);
  }, [stats]);

  const toggleCurrencyModal = () => setModalVisible((prev) => !prev);

  const getStatsForCurrency = async () => {
    if (!selectedCurrency) return;
    try {
      setLoading(true);
      const response = await getBalanceStats({
        legacyTicker: selectedCurrency?.legacyTicker,
        dataSet,
        timeFrame,
        type,
      });
      setStats(response.data[0]);
    } finally {
      setLoading(false);
    }
  };

  const onCurrencySelected = (coin: any) => {
    setSelectedCurrency(coin);
    toggleCurrencyModal();
  };

  useEffect(() => {
    Animated.timing(chartWidth, {
      toValue: SIZES.width,
      duration: 8000,
      useNativeDriver: false,
    }).start();
  });

  useEffect(() => {
    if (!selectedCurrency) return;
    getStatsForCurrency();
  }, [selectedCurrency, dataSet, timeFrame, type]);

  return (
    <>
      <View style={styles.card}>
        <View style={styles.container}>
          <CurrencySwitchButton
            currency={selectedCurrency}
            onChangeCurrency={toggleCurrencyModal}
          />

          <View style={{}}>
            <Text>
              {t('total')}: {stats?.totalAmount.toFixed(6)}
            </Text>
            <Text>
              {t('count')}: {stats?.totalCount}
            </Text>
            <Text>
              {t('total_avr')}: {stats?.totalAmountAvr.toFixed(6)}
            </Text>
            <Text>
              {t('count_avr')}: {stats?.totalCountAvr.toFixed(2)}
            </Text>
          </View>
        </View>

        <Animated.View
          style={{
            overflow: 'hidden',
            width: chartWidth,
            marginLeft: -50,
          }}
        >
          <LineChart
            data={{
              labels: [],
              datasets: [
                {
                  data: data?.length ? data : MockData,
                  color: (opacity = 1) => '#0CFFC0',
                },
              ],
            }}
            width={SIZES.width}
            height={70}
            withHorizontalLabels={false}
            transparent
            withVerticalLabels={false}
            yAxisInterval={1}
            chartConfig={{
              fillShadowGradientFrom: '#0CFFC0',
              fillShadowGradientFromOpacity: 1,
              fillShadowGradientTo: '#0A304B',
              fillShadowGradientToOpacity: 0.5,
              decimalPlaces: 2,
              color: (opacity = 1) => '#fff',
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForBackgroundLines: {
                strokeWidth: 0,
              },
              propsForDots: {
                r: '0',
                strokeWidth: '0',
              },
            }}
          />
        </Animated.View>
      </View>

      <CoinSelectionModal
        visible={modalVisible}
        toggleModal={toggleCurrencyModal}
        onSelectAsset={onCurrencySelected}
        setCloseModal={() => setModalVisible(false)}
        otherSelectedCoin={selectedCurrency}
      />
    </>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
  },
  depositContainer: {
    height: 38,
    borderRadius: THEME.RADIUS.MIDBOX,
    alignItems: 'center',
    justifyContent: 'center',
  },
  depositButton: {
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  depositButtonText: {
    ...FONTS.font,
    color: '#0B0B0B',
  },
  title: {
    marginTop: RF(10),
    marginLeft: 15,
    ...FONTS.fontMedium,
  },
  card: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    marginHorizontal: 8,
    backgroundColor: COLORS.marketCards,
    borderRadius: THEME.RADIUS.BOX,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
});

export default DepositWithdrawStatCard;
