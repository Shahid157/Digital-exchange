/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import AppText from 'shared/components/AppText';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { Currency } from '../../../__generated__/graphql';
import { GetImageForCoin } from '../../../assets/images/coins';
import { getNameForTicker } from '../../services/helper.service';

interface Props {
  data: Currency;
  onPress: (currency: Currency) => void;
}

function CurrencyItem(props: Props) {
  return (
    <TouchableOpacity
      onPress={() => props.onPress(props.data)}
      style={styles.container}
    >
      <View style={styles.left}>
        <Image
          source={GetImageForCoin(props.data.ticker)}
          style={styles.icon}
        />

        <AppText medium style={{ marginRight: RF(5) }}>
          {getNameForTicker(props.data.ticker)} (
          {props.data.ticker.toUpperCase()})
        </AppText>
      </View>
    </TouchableOpacity>
  );
}
export default CurrencyItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: RF(10),
    paddingVertical: RF(10),

    borderRadius: THEME.RADIUS.BOX,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: RF(30),
    width: RF(30),
    borderRadius: THEME.RADIUS.OVAL,
    marginHorizontal: RF(10),
    resizeMode: 'contain',
  },
});
