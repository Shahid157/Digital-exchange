/* eslint-disable react/no-children-prop */
import React, { useState, useEffect, useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { VictoryPie } from 'victory-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { RootState } from 'shared/store';
import { setShowBalances } from 'shared/store/reducers/settingsReducer';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import { useDispatch, useSelector } from 'react-redux';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { formatAssetAmmount } from 'shared/services/helper.service';
import { useTranslation } from 'react-i18next';
import ROUTE_NAMES from 'routes/RouteNames';
import { CoinWithCurrency } from 'shared/types';
import { Coin } from '__generated__/graphql';
import PortfolioChartLabel from '../PortfolioChartLabel';
import AppText from '../AppText';
import ConfidentialText from '../ConfidentialText';
import { useWalletGlobalBalances } from '../../../screens/Main/Home/hooks/useWalletGlobalBalances';
import { COLORS } from '../../constants/theme';

const predefinedColors: Record<string, string> = {
  USDT: '#26A17B',
  BTC: '#f7931a',
  ETH: '#2196F3',
  BNB: '#5fd1d0',
  DAI: '#8ce65c',
  BUSD: '#F44336',
  // Add more coin names and their corresponding colors here
};

function PortfolioChart({ coins }: Coin[]) {
  const { colors } = useTheme();
  const [endAngle, setEndAngle] = useState(270);
  const { showBalances } = useSelector((state: RootState) => state.settings);
  const balance = useWalletGlobalBalances();
  const balanceStr = balance ? balance[0].toFixed(3) : 0;
  const dispatch = useDispatch();
  const toggleBalances = () => dispatch(setShowBalances(!showBalances));
  const { t } = useTranslation(['all']);
  const navigation = useNavigation();

  const categories = useMemo(() => {
    if (!coins || !balance || balance[0] <= 0) return [];

    const thresholdPercentage = 2;
    const thresholdBalance = 0.00001;

    const coinGroups: Record<string, { price: number; percentage: number }> =
      {};

    coins.forEach((coin: CoinWithCurrency) => {
      const price = coin.amount * coin.currency.price;
      const percentage = balance ? (price / balance[0]) * 100 : 0;

      const coinType = coin.currency.ticker;
      if (coinGroups[coinType]) {
        coinGroups[coinType].price += price;
        coinGroups[coinType].percentage += percentage;
      } else {
        coinGroups[coinType] = { price, percentage };
      }
    });

    const mergedCategories = Object.entries(coinGroups).map(
      ([coinType, coinGroup]) => ({
        name: coinType.toUpperCase(),
        price: coinGroup.price,
        percentageStr: `${coinGroup.percentage.toFixed(2)}%`,
        percentage:
          coinGroup.percentage < thresholdPercentage ? 0 : coinGroup.percentage,
        balance: `$${coinGroup.price.toFixed(3)}`,
        color: predefinedColors[coinType.toUpperCase()] || COLORS.primary,
      })
    );

    const totalBelowThreshold = mergedCategories.reduce(
      (total, category) =>
        category.percentage < thresholdPercentage
          ? total + category.price
          : total,
      0
    );

    if (totalBelowThreshold >= thresholdBalance) {
      mergedCategories.push({
        name: t('Others'),
        price: totalBelowThreshold,
        percentageStr: `${((totalBelowThreshold / balance[0]) * 100).toFixed(
          2
        )}%`,
        percentage: (totalBelowThreshold / balance[0]) * 100,
        balance: `$${totalBelowThreshold.toFixed(3)}`,
        color: THEME.COLORS.textGrey,
      });
    }

    return mergedCategories.filter((category) => category.price > 0);
  }, [coins, balance, t]);

  useEffect(() => {
    setTimeout(() => {
      setEndAngle(360);
    }, 100);
  }, []);

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: RF(20),
      }}
    >
      <VictoryPie
        animate={{
          duration: 2000,
        }}
        endAngle={endAngle}
        height={318}
        padAngle={2}
        cornerRadius={0}
        innerRadius={128}
        labelRadius={160}
        data={categories.map((it) => it.percentage)}
        labels={categories.map(
          (it: any) =>
            `{name: ${it.name}, percentage: ${it.percentage}, percentageStr: ${it.percentageStr}, color: ${it.color}}`
        )}
        labelComponent={<PortfolioChartLabel />}
        colorScale={categories.map((it) => it.color)}
        style={{
          data: {
            stroke: colors.card,
            strokeOpacity: 0,
            strokeWidth: 10,
          },
          labels: {
            fill: 'white',
            fontSize: 14,
            fontWeight: 'bold',
          },
        }}
      />
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          top: 125,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <AppText
            color={THEME.COLORS.white}
            style={{
              opacity: 0.6,
              marginRight: RF(10),
            }}
          >
            {t('Your Balance')}
          </AppText>
          <AnyIcon
            onPress={toggleBalances}
            type={Icons.Ionicons}
            name={showBalances ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color="white"
          />
        </View>
        <ConfidentialText
          style={{
            fontSize: THEME.FONTS.SIZE.XLARGE,
            fontFamily: THEME.FONTS.TYPE.BOLD,

            color: COLORS.white,
            marginVertical: 5,
          }}
          children={`$${balanceStr}`}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation?.navigate(ROUTE_NAMES.BLOCKED_FUNDS as never)}
      >
        <ConfidentialText
          style={{
            fontSize: THEME.FONTS.SIZE.XXXSMALL,
            fontFamily: THEME.FONTS.TYPE.MEDIUM,
            textDecorationLine: 'underline',
            color: COLORS.white,
            marginTop: THEME.MARGIN.VERYHIGH,
          }}
          children={`${t('Blocked Funds')}: $ ${formatAssetAmmount(
            balance[1]
          )}`}
        />
      </TouchableOpacity>
    </View>
  );
}

export default PortfolioChart;
