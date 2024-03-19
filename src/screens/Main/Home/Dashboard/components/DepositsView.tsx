import { COINS } from 'assets/images/coins';
import { useRef, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { SIZES } from 'shared/constants/theme';
import { THEME } from 'shared/theme';

const marketData = [
  {
    id: '1',
    title: 'Bitcoin',
    icon: COINS.BITCOIN,
    coinTitle: 'BTC',
    amount: '1,8098',
    change: '+47.23%',
    data: [
      20, 30, 20, 60, 40, 70, 50, 60, 40, 65, 70, 45, 70, 60, 75, 80, 75, 70,
      75, 60, 40, 70, 65, 75, 60, 70, 45, 70, 50,
    ],
  },
  {
    id: '2',
    title: 'Ethereum',
    icon: COINS.ETHEREUM,
    coinTitle: 'ETH',
    amount: '1,8098',
    change: '+47.23%',
    data: [
      20, 30, 20, 60, 40, 70, 50, 60, 40, 65, 70, 45, 70, 60, 75, 80, 75, 70,
      75, 60, 40, 70, 65, 75, 60, 70, 45, 70, 50,
    ],
  },
  {
    id: '3',
    title: 'Dash Coin',
    icon: COINS.DASH,
    coinTitle: 'DASH',
    amount: '1,8098',
    change: '+47.23%',
    data: [
      20, 30, 20, 60, 40, 70, 50, 60, 40, 65, 70, 45, 70, 60, 75, 80, 75, 70,
      75, 60, 40, 70, 65, 75, 60, 70, 45, 70, 50,
    ],
  },
  {
    id: '4',
    title: 'Ripple Coin',
    icon: COINS.XRP,
    coinTitle: 'XRP',
    amount: '1,8098',
    change: '+47.23%',
    data: [
      20, 30, 20, 60, 40, 70, 50, 60, 40, 65, 70, 45, 70, 60, 75, 80, 75, 70,
      75, 60, 40, 70, 65, 75, 60, 70, 45, 70, 50,
    ],
  },
];

export function DepositsView() {
  const chartWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(chartWidth, {
      toValue: SIZES.width,
      duration: 8000,
      useNativeDriver: false,
    }).start();
  });
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.viewStyle}>
          <Animated.View style={{ overflow: 'hidden', width: chartWidth }}>
            <LineChart
              data={{
                datasets: [
                  {
                    data: marketData[0].data,
                    color: (opacity = 1) => '#0CFFC0',
                  },
                ],
              }}
              width={300}
              height={70}
              withHorizontalLabels={false}
              transparent
              withVerticalLabels={false}
              yAxisInterval={1}
              chartConfig={{
                strokeWidth: 0,
                backgroundGradientFromOpacity: 0,
                backgroundGradientToOpacity: 0,
                fillShadowGradientFrom: '#0CFFC0',
                fillShadowGradientFromOpacity: 1,
                fillShadowGradientTo: '#0A304B',
                fillShadowGradientToOpacity: 0.5,
                decimalPlaces: 2,
                color: (opacity = 1) => 'rgb(255,255,255)',
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                propsForBackgroundLines: {
                  strokeWidth: 0,
                },
                style: {
                  paddingLeft: 0,
                },
                propsForDots: {
                  r: '0',
                  strokeWidth: '0',
                },
              }}
            />
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, height: '100%' },
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
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
  },
  viewStyle: {
    marginBottom: -20,
    marginRight: -20,
    marginTop: 20,
    overflow: 'hidden',
    flex: 1,
  },
});
