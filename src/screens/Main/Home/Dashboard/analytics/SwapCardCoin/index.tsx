import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import { Currency } from '__generated__/graphql';
import { COLORS, FONTS, SIZES } from 'shared/constants/theme';
import AppText from 'shared/components/AppText';
import { RF } from 'shared/theme/responsive';
import CurrencySwitchButton from 'screens/Main/Home/Dashboard/components/CurrencySwitchButton';
import { THEME } from 'shared/theme';
import CoinSelectionModal from '../../../ExchangeCurrency/CoinSelectionModal';

function SwapCardCoin(props: any) {
  const [selectedCurrency, setSelectedCurrency] = useState<
    Currency | undefined
  >(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const toggleCurrencyModal = () => setModalVisible((prev) => !prev);

  const { title, setCoin } = props;

  const { t } = useTranslation(['all']);
  const chartWidth = useRef(new Animated.Value(0)).current;

  const onCurrencySelected = (coin: any) => {
    setSelectedCurrency(coin);
    setCoin(coin.legacyTicker);
    toggleCurrencyModal();
  };

  useEffect(() => {
    Animated.timing(chartWidth, {
      toValue: SIZES.width,
      duration: 8000,
      useNativeDriver: false,
    }).start();
  });

  return (
    <>
      <AppText h2 color={COLORS.white} style={styles.title}>
        {t(`${title}`)}
      </AppText>

      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#101010', '#101010']}
        style={styles.gradient}
      >
        <View style={styles.viewContainer} />
        <View style={styles.subContainer} />
        <View style={styles.switchBtnContainer}>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <View>
              <CurrencySwitchButton
                currency={selectedCurrency}
                onChangeCurrency={toggleCurrencyModal}
              />
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
              {/* {data.price == "-" ? data.price : "$" + data.price} */}
            </Text>
          </View>
        </View>
        <View style={styles.gradientContainer}>
          <LinearGradient
            colors={['#FFC128', '#FF9A01']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.depositContainer}
          />
          <View style={styles.viewStyle} />
        </View>
      </LinearGradient>

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
  depositContainer: {
    height: 0,
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
  gradient: {
    padding: 20,
    backgroundColor: '#101010',
    position: 'relative',
    borderRadius: THEME.RADIUS.BOX,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  viewContainer: {
    height: '100%',
    width: '100%',
    borderRadius: THEME.RADIUS.MIDBOX,
    position: 'absolute',
    zIndex: -1,
    opacity: 0.3,
  },
  subContainer: {
    height: '100%',
    width: '100%',
    borderRadius: THEME.RADIUS.MIDBOX,
    position: 'absolute',
    zIndex: -1,
    opacity: 0.1,
  },
  switchBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  gradientContainer: {
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

export default SwapCardCoin;
