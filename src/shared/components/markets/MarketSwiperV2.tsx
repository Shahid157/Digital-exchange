/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { GetImageForCoin } from 'assets/images/coins';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import ROUTE_NAMES from 'routes/RouteNames';
import { Currency, CurrencyTimeline } from '__generated__/graphql';
import { THEME } from 'shared/theme';
import AppText from '../AppText';
import { RF } from '../../theme/responsive';
import { FONTS, SIZES, COLORS } from '../../constants/theme';
import {
  formatAssetAmmount,
  getNameForTicker,
} from '../../services/helper.service';
import { useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store';
import KycRestrictionBottomSheet from '../../../screens/Main/Home/components/KycRestrictionBottomSheet';

export interface MarketSwiperV2Props {
  selecetedCoin?: Currency;
  timeline?: CurrencyTimeline;
}

function MarketSwiperV2(props: MarketSwiperV2Props) {
  const { selecetedCoin, timeline } = props;
  const user = useAppSelector((state: RootState) => state.session.user);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const { navigate } = useNavigation();
  const { t } = useTranslation('all');

  const onPressCoin = (coin: Currency) => {
    if (user?.kycVerification?.status !== 'verified') {
      setBottomSheetOpen(true);
      return;
    }

    if (coin.isLocal) {
      // @ts-ignore
      navigate(ROUTE_NAMES.DEPOSIT_LOCAL_SCREEN, {
        coin,
      });
      return;
    }

    // @ts-ignore
    navigate(ROUTE_NAMES.DEPOSIT_SCREEN, {
      coin,
    });
  };

  if (!selecetedCoin) {
    return null;
  }

  return (
    <>
      <View style={styles.container1}>
        <View style={[styles.container3]}>
          <View style={styles.row}>
            <Image
              style={styles.icon}
              source={GetImageForCoin(selecetedCoin?.ticker)}
            />
            <View style={{ marginLeft: RF(10) }}>
              <AppText color="#979797" style={styles.name}>
                {getNameForTicker(selecetedCoin?.ticker)}
              </AppText>
              <AppText semiBold h2>
                {selecetedCoin?.ticker?.toUpperCase()}
              </AppText>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>
              {formatAssetAmmount(selecetedCoin?.price || 0)}
            </Text>
          </View>
        </View>
        <View style={styles.container2}>
          <TouchableOpacity
            onPress={() => onPressCoin(selecetedCoin)}
            style={styles.depositButton}
          >
            <AppText semiBold color="black">
              {t('Deposit')}
            </AppText>
          </TouchableOpacity>

          {timeline ? (
            <LineChart
              width={SIZES.width - 135}
              height={70}
              withHorizontalLabels={false}
              transparent
              withVerticalLabels={false}
              yAxisInterval={1}
              chartConfig={{
                strokeWidth: 0,
                backgroundGradientFromOpacity: 0,
                backgroundGradientToOpacity: 0,
                fillShadowGradientFrom: THEME.COLORS.primary,
                fillShadowGradientFromOpacity: 1,
                fillShadowGradientTo: THEME.COLORS.primary,
                fillShadowGradientToOpacity: 0.5,
                decimalPlaces: 2,
                color: () => 'rgb(255,255,255)',
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                propsForBackgroundLines: {
                  strokeWidth: 0,
                },
                style: {
                  borderRadius: 0,
                  paddingLeft: 0,
                },
                propsForDots: {
                  r: '0',
                  strokeWidth: '0',
                },
              }}
              data={{
                labels: ['', '', '', '', '', '', '', '', '', ''],
                datasets: [
                  {
                    data: timeline?.price,
                    color: () => THEME.COLORS.primary,
                  },
                ],
              }}
            />
          ) : (
            <AppText>{t('no_data_found')}</AppText>
          )}
        </View>
      </View>

      <KycRestrictionBottomSheet
        open={bottomSheetOpen}
        setOpen={setBottomSheetOpen}
        onCompleteKyc={() => {
          setBottomSheetOpen(false);
          // @ts-ignore
          navigate(ROUTE_NAMES.COMPLETE_KYC);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container1: {
    padding: RF(10),
    marginVertical: RF(5),
    shadowColor: THEME.COLORS.secondaryYellow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#101010',
    borderRadius: THEME.RADIUS.BOX,
  },
  appText: {
    marginVertical: RF(5),
  },
  swiper: {
    height: RF(140),
    width: '100%',
    alignSelf: 'center',
  },
  dotStyle: {
    backgroundColor: '#191C1B',
    height: 7,
    width: 15,
  },
  activeDotStyle: {
    backgroundColor: COLORS.primary,
    width: 20,
    height: 7,
  },
  row: {
    flexDirection: 'row',
  },

  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: 8,
  },
  name: {
    textTransform: 'uppercase',
  },
  priceText: {
    ...FONTS.h3,
    color: COLORS.white,
    marginTop: 10,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  container2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  depositButton: {
    borderRadius: THEME.RADIUS.BOX,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: RF(15),
    paddingVertical: RF(8),
    backgroundColor: THEME.COLORS.secondaryYellow,
  },
  chartContainer: {
    // overflow: "hidden",
  },
  container3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  icon: {
    height: RF(40),
    width: RF(40),
    borderRadius: THEME.RADIUS.OVAL,
    marginRight: RF(10),
    resizeMode: 'contain',
  },
});

export default MarketSwiperV2;
