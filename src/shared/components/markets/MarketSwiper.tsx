import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import { COINS } from 'assets/images/coins';
import { useTranslation } from 'react-i18next';
import { SvgUri } from 'react-native-svg';
import ROUTE_NAMES from 'routes/RouteNames';
import { Currency } from '__generated__/graphql';
import { THEME } from 'shared/theme';
import { RF } from '../../theme/responsive';
import AppText from '../AppText';
import { FONTS, SIZES, COLORS } from '../../constants/theme';

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

function MarketSwiper(props) {
  const { tokensList } = props;
  const { loading } = props;
  const { t } = useTranslation(['all']);
  const chartWidth = useRef(new Animated.Value(0)).current;
  const { navigate } = useNavigation();

  useEffect(() => {
    Animated.timing(chartWidth, {
      toValue: SIZES.width,
      duration: 8000,
      useNativeDriver: false,
    }).start();
  });

  const onPressCoin = (coin: Currency) => {
    navigate(ROUTE_NAMES.DEPOSIT_SCREEN, {
      coin,
    });
  };

  return (
    <>
      <AppText
        h2
        color={COLORS.white}
        style={{
          marginTop: RF(10),
          marginLeft: 15,
          ...FONTS.fontMedium,
        }}
      >
        {t('Featured')}
      </AppText>
      <Swiper
        showsButtons={false}
        style={{ height: 220 }}
        loop={false}
        dotStyle={{
          backgroundColor: '#191C1B',
          height: 7,
          width: 15,
        }}
        activeDotStyle={{
          backgroundColor: COLORS.primary,
          width: 20,
          height: 7,
        }}
      >
        {loading ? (
          <Text
            style={{
              textAlign: 'center',
            }}
          >
            {t('Loading', { ns: ['all'] })} ...
          </Text>
        ) : (
          tokensList.slice(0, 5).map((data, index) => (
            <LinearGradient
              key={index}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#101010', '#101010']}
              style={{
                padding: 20,
                backgroundColor: '#101010',
                position: 'relative',
                borderRadius: THEME.RADIUS.BOX,
                alignItems: 'center',
                marginHorizontal: 10,
              }}
            >
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  // backgroundColor: COLORS.primary,
                  borderRadius: THEME.RADIUS.MIDBOX,
                  // bottom: -8,
                  position: 'absolute',
                  zIndex: -1,
                  opacity: 0.3,
                }}
              />
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  // backgroundColor: COLORS.primary,
                  borderRadius: THEME.RADIUS.MIDBOX,
                  // bottom: -16,
                  position: 'absolute',
                  zIndex: -1,
                  opacity: 0.1,
                  // transform: [{ scaleX: 0.9 }]
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <SvgUri width={RF(36)} height={RF(36)} uri={data.image} />
                  <View>
                    <Text
                      style={{
                        ...FONTS.h5,
                        color: COLORS.white,
                        marginStart: 8,
                        // textTransform: "uppercase",
                        // marginBottom: 3
                      }}
                    >
                      {data.ticker.toUpperCase()}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginStart: 8,
                      }}
                    >
                      <Text
                        style={{
                          // ...FONTS.fontSm,
                          color: '#979797',
                          ...FONTS.fontMedium,
                          marginRight: 15,
                          textTransform: 'uppercase',
                        }}
                      >
                        {data.name}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.h3,
                      color: COLORS.white,
                      marginTop: 10,
                    }}
                  >
                    {data.price === '-' ? data.price : `$${data.price}`}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  width: '100%',
                }}
              >
                <LinearGradient
                  colors={['#FFC128', '#FF9A01']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.depositContainer}
                >
                  <TouchableOpacity
                    onPress={() => onPressCoin(data)}
                    style={styles.depositButton}
                  >
                    <Text style={styles.depositButtonText}>
                      {t('Deposit', { ns: ['all'] })}
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>

                <View
                  style={{
                    marginBottom: -20,
                    marginRight: -20,
                    marginTop: 20,
                    overflow: 'hidden',
                    flex: 1,
                  }}
                >
                  <Animated.View
                    style={{ overflow: 'hidden', width: chartWidth }}
                  >
                    <LineChart
                      data={{
                        datasets: [
                          {
                            data: marketData[0].data,
                            color: () => '#0CFFC0',
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
                        color: () => 'rgb(255,255,255)',
                        labelColor: (opacity = 1) =>
                          `rgba(0, 0, 0, ${opacity})`,
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
            </LinearGradient>
          ))
        )}
      </Swiper>
    </>
  );
}

const styles = StyleSheet.create({
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
});

export default MarketSwiper;
