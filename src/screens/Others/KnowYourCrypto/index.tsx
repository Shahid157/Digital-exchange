import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES } from 'shared/constants/theme';
// @ts-ignore
import Ripple from 'react-native-material-ripple';
// @ts-ignore
import { useTheme } from '@react-navigation/native';
import { IMAGES } from 'assets/images';
import { COINS } from 'assets/images/coins';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AppHeader from 'shared/components/AppHeader';

import { GlobalStyleSheet } from 'shared/constants/styleSheet';
import { THEME } from 'shared/theme';
import BalanceChart from 'shared/components/BalanceChart';
import styles from './styles';

const EventDATA = [
  {
    pic: IMAGES.event1,
    desc: 'The transaction was made with what is possibly the largest transaction fee ever to  crypto. Miners keep on finding ways to use the excess power which would otherwise go wasted – this time shaking hands with of struggling. Miners keep on finding ways to use the excess power which would otherwise go wasted – this time shaking hands with operators of struggling. Miners keep on finding ways to use the excess power which would otherwise wasted – this time shaking hands with operators of struggling.',
  },
  {
    pic: IMAGES.event2,
    desc: 'The transaction was made with what is possibly the largest transaction fee ever to  crypto. Miners keep on finding ways to use the excess power which would otherwise go wasted – this time shaking hands with of struggling. Miners keep on finding ways to use the excess power which would otherwise go wasted – this time shaking hands with operators of struggling. Miners keep on finding ways to use the excess power which would otherwise wasted – this time shaking hands with operators of struggling.',
  },
  {
    pic: IMAGES.event3,
    desc: 'The transaction was made with what is possibly the largest transaction fee ever to  crypto. Miners keep on finding ways to use the excess power which would otherwise go wasted – this time shaking hands with of struggling. Miners keep on finding ways to use the excess power which would otherwise go wasted – this time shaking hands with operators of struggling. Miners keep on finding ways to use the excess power which would otherwise wasted – this time shaking hands with operators of struggling.',
  },
];

function KnowYourCrypto() {
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1,
      }}
    >
      <AppHeader title="Know Your Crypto!" leftIcon="back" />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >
        <BalanceChart header={false} />

        <View style={styles.container}>
          <View style={styles.subContainer}>
            <View>
              <Text
                style={{
                  ...FONTS.fontXs,
                  color: colors.text,
                  marginBottom: 5,
                }}
              >
                Price
              </Text>
              <Text style={{ ...FONTS.fontSm, color: colors.text }}>
                $42,485.92
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  ...FONTS.fontXs,
                  color: colors.text,
                  marginBottom: 5,
                }}
              >
                24h Change
              </Text>
              <Text style={{ ...FONTS.fontSm, color: COLORS.danger }}>
                1.11%
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  ...FONTS.fontXs,
                  color: colors.text,
                  marginBottom: 5,
                }}
              >
                24h Volume
              </Text>
              <Text style={{ ...FONTS.fontSm, color: colors.text }}>
                $68.58B
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text
                style={{
                  ...FONTS.fontXs,
                  color: colors.text,
                  marginBottom: 5,
                }}
              >
                Market Cap
              </Text>
              <Text style={{ ...FONTS.fontSm, color: colors.text }}>
                $549.84B
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[
            {
              backgroundColor: colors.card,
              borderRadius: THEME.RADIUS.BOX,
              padding: SIZES.padding,
              marginBottom: SIZES.margin,
              marginHorizontal: 10,
              ...GlobalStyleSheet.shadow,
            },
          ]}
        >
          <Text
            style={[
              FONTS.h6,
              { color: colors.text, marginBottom: SIZES.margin },
            ]}
          >
            About Coin
          </Text>
          <View
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: THEME.RADIUS.BOX,
              padding: 10,
              marginBottom: SIZES.margin,
            }}
          >
            <Image style={styles.imageStyle} source={COINS.BITCOIN} />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  ...FONTS.font,
                  ...FONTS.fontMedium,
                  color: colors.text,
                  marginBottom: 4,
                }}
              >
                Digital Cash
              </Text>
              <Text style={{ ...FONTS.fontXs, color: colors.text }}>
                1 BTC = 68.48 USD
              </Text>
            </View>
            <Ripple style={styles.rippleStyle}>
              <Text style={{ ...FONTS.font, color: COLORS.white }}>Trade</Text>
            </Ripple>
          </View>

          <Text style={{ ...FONTS.fontSm, color: colors.text }}>
            Dash is an open source cryptocurrency. It is an altcoin that was
            forked from the Bitcoin protocol. It is also a decentralized
            autonomous organization (DAO) run by a subset of its users, which
            are called “masternodes”. The currency permits transactions that can
            be untraceable.
          </Text>

          <Ripple style={styles.rippleCont}>
            <Text
              style={{
                ...FONTS.fontSm,
                color: COLORS.primary,
                marginRight: 2,
              }}
            >
              Show More
            </Text>
            <FeatherIcon color={COLORS.primary} size={18} name="chevron-down" />
          </Ripple>
        </View>
        <Text
          style={{
            ...FONTS.h6,
            color: colors.text,
            marginHorizontal: 10,
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          News & Events About Bitcoin
        </Text>

        {EventDATA.map((data, index) => (
          <View
            key={index}
            style={[
              {
                ...styles.eventCard,
                backgroundColor: colors.card,
                ...GlobalStyleSheet.shadow,
              },
            ]}
          >
            <View style={{ flexDirection: 'row' }}>
              <Image style={styles.fastImage} source={data.pic} />
              <View style={{ flex: 1, position: 'relative' }}>
                <Text
                  numberOfLines={3}
                  style={{ ...FONTS.font, color: colors.text }}
                >
                  {data.desc}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 9,
                    backgroundColor: colors.card,
                    paddingLeft: 5,
                  }}
                >
                  <Text style={{ ...FONTS.font, color: COLORS.primary }}>
                    Show More
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default KnowYourCrypto;
