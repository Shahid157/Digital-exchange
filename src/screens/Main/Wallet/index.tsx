import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from 'shared/constants/theme';
import CheckBox from '@react-native-community/checkbox';
import WidgetPieChart from 'shared/components/WidgetPieChart';
import WalletBalanceList from 'shared/components/wallet/walletBalanceList';
import { COINS } from 'assets/images/coins';

const BalanceList = [
  {
    id: '1',
    coin: COINS.BITCOIN,
    coinName: 'Bitcoin',
    amount: '$2,566.7',
    trade: '+4.6%',
    tag: 'BTC',
    data: [0, 40, 60, 40, 70, 40, 50, 80, 50, 45, 50, 30, 45],
    btc: '0,0000335',
  },
  {
    id: '2',
    coin: COINS.ETHEREUM,
    coinName: 'Ethereum',
    amount: '$8,456.87',
    trade: '+4.6%',
    tag: 'ETH',
    data: [0, 40, 60, 40, 70, 40, 50, 80, 50, 45, 50, 30, 45],
    btc: '0,0000335',
  },
  {
    id: '3',
    coin: COINS.DASH,
    coinName: 'Dash',
    amount: '$8,456.87',
    trade: '+4.6%',
    tag: 'DASH',
    data: [0, 40, 60, 40, 70, 40, 50, 80, 50, 45, 50, 30, 45],
    btc: '0,0000335',
  },
  {
    id: '4',
    coin: COINS.EMC,
    coinName: 'MER',
    amount: '$8,456.87',
    trade: '+4.6%',
    tag: 'MER',
    data: [0, 40, 60, 40, 70, 40, 50, 80, 50, 45, 50, 30, 45],
    btc: '0,0000335',
  },
  {
    id: '5',
    coin: COINS.NEM,
    coinName: 'NEM',
    amount: '$8,456.87',
    trade: '+4.6%',
    tag: 'NEM',
    data: [0, 40, 60, 40, 70, 40, 50, 80, 50, 45, 50, 30, 45],
    btc: '0,0000335',
  },
];

function WalletScreen(props: any) {
  const { colors } = useTheme();
  const theme = useTheme();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <WidgetPieChart />
        <View style={styles.walletContainer}>
          <Text style={{ ...FONTS.h6, color: colors.text }}>
            Wallet Balance
          </Text>
          <View style={styles.viewStyle}>
            <View
              style={[
                Platform.OS === 'ios' && {
                  transform: [
                    {
                      scale: 0.8,
                    },
                  ],
                  marginRight: 5,
                },
              ]}
            >
              <CheckBox
                tintColors={{ true: COLORS.primary, false: colors.text }}
                onCheckColor={COLORS.primary}
                onTintColor={COLORS.primary}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
              />
            </View>
            <Text style={{ ...FONTS.font, color: colors.text }}>
              Hide Balance
            </Text>
          </View>
        </View>
        <WalletBalanceList
          navigate={props?.navigation?.navigate}
          destination="Trade"
          data={BalanceList}
          theme={theme}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  walletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 12,
  },
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 12,
  },
});

export default WalletScreen;
