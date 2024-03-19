import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { COLORS, FONTS } from 'shared/constants/theme';
import { useTheme } from '@react-navigation/native';
import { IMAGES } from 'assets/images';
import { COINS } from 'assets/images/coins';
import { ICONS } from 'assets/images/icons';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from 'shared/components/AppHeader';
import { GlobalStyleSheet } from 'shared/constants/styleSheet';
import { THEME } from 'shared/theme';

const socialLink = [
  {
    icon: ICONS.FACEBOOK,
  },
  {
    icon: ICONS.WHATSAPP,
  },
  {
    icon: ICONS.INSTAGRAM,
  },
  {
    icon: ICONS.TWITTER,
  },
];

const tableData = [
  {
    num: '#1',
    split: '8%',
    referrals: '3',
    amount: '(0.01 BTC)',
  },
  {
    num: '#2',
    split: '6%',
    referrals: '13',
    amount: '(0.03 BTC)',
  },
  {
    num: '#3',
    split: '3%',
    referrals: '25',
    amount: '(0.02 BTC)',
  },
  {
    num: '#4',
    split: '2%',
    referrals: '37',
    amount: '(0.05 BTC)',
  },
  {
    num: '#5',
    split: '1%',
    referrals: '59',
    amount: '(0.04 BTC)',
  },
];

function Rewards() {
  const { colors } = useTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <AppHeader title="Rewards" leftIcon="back" />
      <ScrollView>
        <View style={{ paddingBottom: 30, paddingTop: 20 }}>
          <ImageBackground
            source={IMAGES.bg1}
            style={[
              {
                borderRadius: THEME.RADIUS.NORMAL,
                paddingHorizontal: 18,
                paddingVertical: 25,
                marginHorizontal: 15,
                borderWidth: 1,
                borderColor: colors.border,
                overflow: 'hidden',
                marginBottom: 20,
              },
            ]}
          >
            <Text
              style={{
                ...FONTS.font,
                ...FONTS.fontMedium,
                color: COLORS.white,
                marginBottom: 18,
              }}
            >
              Share your referral link and earn crypto when others trade
            </Text>
            <View>
              <Text
                style={{
                  ...FONTS.fontXs,
                  color: COLORS.primary,
                  marginBottom: 6,
                }}
              >
                Referral ID
              </Text>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[
                  'rgba(255,255,255,.05)',
                  'rgba(255,255,255,.1)',
                  'rgba(255,255,255,.05)',
                ]}
                style={{ ...GlobalStyleSheet.formControl }}
              >
                <TextInput
                  style={{ ...GlobalStyleSheet.Input, color: COLORS.white }}
                  value="AZ19ZGSH"
                />
                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    right: 18,
                    top: 12,
                  }}
                >
                  <TouchableOpacity>
                    <Image
                      style={{
                        height: 20,
                        width: 20,
                        resizeMode: 'contain',
                        tintColor: COLORS.primary,
                      }}
                      source={ICONS.COPY}
                    />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>

            <View>
              <Text
                style={{
                  ...FONTS.fontXs,
                  color: COLORS.primary,
                  marginBottom: 6,
                }}
              >
                Referral Link
              </Text>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[
                  'rgba(255,255,255,.05)',
                  'rgba(255,255,255,.1)',
                  'rgba(255,255,255,.05)',
                ]}
                style={{
                  borderColor: colors.border,
                  ...GlobalStyleSheet.formControl,
                }}
              >
                <TextInput
                  style={{ ...GlobalStyleSheet.Input, color: COLORS.white }}
                  value="0xbc6b1972ea764159a4cf1c03774"
                />
                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    right: 18,
                    top: 12,
                  }}
                >
                  <TouchableOpacity>
                    <Image
                      style={{
                        height: 20,
                        width: 20,
                        resizeMode: 'contain',
                        tintColor: COLORS.primary,
                      }}
                      source={ICONS.COPY}
                    />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              {socialLink.map((data, index) => (
                <Ripple
                  key={index}
                  style={[
                    {
                      ...styles.socialIcon,
                      backgroundColor: 'rgba(255,255,255,.1)',
                    },
                  ]}
                >
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: 'contain',
                    }}
                    source={data.icon}
                  />
                </Ripple>
              ))}
            </View>
          </ImageBackground>

          <View
            style={{
              ...GlobalStyleSheet.row,
              paddingHorizontal: 15,
              marginBottom: 35,
            }}
          >
            <View style={{ ...GlobalStyleSheet.col50 }}>
              <View
                style={{
                  borderRadius: THEME.RADIUS.BOX,
                  padding: 20,
                  backgroundColor: colors.card,
                  ...GlobalStyleSheet.shadow,
                }}
              >
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: THEME.RADIUS.BOX,
                    backgroundColor: COLORS.primaryLight,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 10,
                  }}
                >
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: 'contain',
                      tintColor: COLORS.primary,
                    }}
                    source={ICONS.CUSTOMER}
                  />
                </View>
                <Text style={{ ...FONTS.font, color: colors.text }}>
                  Your Community
                </Text>
                <Text
                  style={{
                    ...FONTS.h2,
                    color: COLORS.primary,
                    lineHeight: 37,
                  }}
                >
                  99
                </Text>
                <Text style={{ ...FONTS.fontSm, color: colors.text }}>
                  Referrals
                </Text>
              </View>
            </View>
            <View style={{ ...GlobalStyleSheet.col50 }}>
              <View
                style={{
                  borderRadius: THEME.RADIUS.BOX,
                  padding: 20,
                  position: 'relative',
                  backgroundColor: colors.card,
                  ...GlobalStyleSheet.shadow,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}
                >
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: THEME.RADIUS.BOX,
                      backgroundColor: COLORS.primaryLight,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      style={{
                        height: 22,
                        width: 22,
                        resizeMode: 'contain',
                        tintColor: COLORS.primary,
                      }}
                      source={ICONS.DOLLAR}
                    />
                  </View>
                </View>
                <Text style={{ ...FONTS.font, color: colors.text }}>
                  Lifetime Reward
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.h5,
                      ...FONTS.fontMedium,
                      lineHeight: 37,
                      color: colors.text,
                    }}
                  >
                    75.33
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    style={{
                      height: 16,
                      width: 16,
                      borderRadius: THEME.RADIUS.MEDIUM,
                      resizeMode: 'contain',
                      marginRight: 5,
                    }}
                    source={COINS.BITCOIN}
                  />
                  <Text style={{ ...FONTS.fontSm, color: colors.text }}>
                    0.015 BTC
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ marginHorizontal: 15, marginBottom: 20 }}>
            <View
              style={{
                alignItems: 'center',
                marginHorizontal: 6,
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  ...FONTS.h6,
                  ...FONTS.fontMedium,
                  color: colors.text,
                  textAlign: 'center',
                  marginBottom: 8,
                }}
              >
                Track your income with our unique five-tier referral system
              </Text>
              <Text
                style={{
                  ...FONTS.fontXs,
                  color: colors.text,
                  textAlign: 'center',
                }}
              >
                Crypto Money shares 20% of its trading fee profits from your
                direct and indirect referrals.
              </Text>
            </View>
            <View
              style={[
                {
                  backgroundColor: colors.card,
                  borderRadius: THEME.RADIUS.BOX,
                  flexDirection: 'row',
                  paddingVertical: 10,
                  ...GlobalStyleSheet.shadow,
                },
              ]}
            >
              <Text
                style={{
                  ...FONTS.font,
                  color: colors.text,
                  flexGrow: 150,
                  paddingHorizontal: 10,
                }}
              >
                #
              </Text>
              <Text
                style={{
                  ...FONTS.font,
                  color: colors.text,
                  flexGrow: 100,
                  paddingHorizontal: 10,
                }}
              >
                Reward Split
              </Text>
              <Text
                style={{
                  ...FONTS.font,
                  color: colors.text,
                  flexGrow: 100,
                  paddingHorizontal: 10,
                }}
              >
                Referrals
              </Text>
              <Text
                style={{
                  ...FONTS.font,
                  color: colors.text,
                  flexGrow: 100,
                  paddingHorizontal: 10,
                  textAlign: 'right',
                }}
              >
                Amount Earned
              </Text>
            </View>
            {tableData.map((data, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  paddingVertical: 8,
                }}
              >
                <Text
                  style={{
                    ...FONTS.font,
                    color: colors.text,
                    flexGrow: 100,
                    paddingHorizontal: 10,
                  }}
                >
                  {data.num}
                </Text>
                <Text
                  style={{
                    ...FONTS.font,
                    color: colors.text,
                    flexGrow: 150,
                    paddingHorizontal: 10,
                  }}
                >
                  {data.split}
                </Text>
                <Text
                  style={{
                    ...FONTS.font,
                    color: colors.text,
                    flexGrow: 100,
                    paddingHorizontal: 10,
                  }}
                >
                  {data.referrals}
                </Text>
                <Text
                  style={{
                    ...FONTS.font,
                    color: colors.text,
                    flexGrow: 100,
                    paddingHorizontal: 10,
                    textAlign: 'right',
                  }}
                >
                  {data.amount}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  socialIcon: {
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: THEME.RADIUS.BOX,
    marginHorizontal: 4,
  },
});

export default Rewards;
