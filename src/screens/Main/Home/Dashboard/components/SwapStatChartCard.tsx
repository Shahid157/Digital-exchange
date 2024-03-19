import React, { useRef, useEffect, useMemo } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { SIZES } from 'shared/constants/theme';
import { LineChart } from 'react-native-chart-kit';
import { SwapStatChartCardProps } from '../../types';

const MockData = [
  20, 30, 20, 60, 40, 70, 50, 60, 40, 65, 70, 45, 70, 60, 75, 80, 75, 70, 75,
  60, 40, 70, 65, 75, 60, 70, 45, 70, 50,
];

function SwapStatChartCard(props: SwapStatChartCardProps) {
  const { stats } = props;

  const chartWidth = useRef(new Animated.Value(0)).current;

  const data: number[] = useMemo(() => {
    if (!stats) return [];
    return stats.splits.map((split: any) => split.totalToAmount);
  }, [stats]);

  useEffect(() => {
    Animated.timing(chartWidth, {
      toValue: SIZES.width,
      duration: 8000,
      useNativeDriver: false,
    }).start();
  });

  return (
    <View style={styles.root}>
      <Animated.View
        style={{
          overflow: 'hidden',
          width: chartWidth,
          marginLeft: -60,
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
  );
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 8,
  },
});

export default SwapStatChartCard;
