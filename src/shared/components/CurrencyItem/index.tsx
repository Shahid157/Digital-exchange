import React from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { SvgUri } from 'react-native-svg';
import AppText from 'shared/components/AppText';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import FastImage from 'react-native-fast-image';
import { Currency } from '__generated__/graphql';
import NetworkTag from '../NetworkTag';

interface Props {
  index: number;
  data: Currency;
  onPress: () => void;
}

function CurrencyItem(props: Props) {
  return (
    <TouchableOpacity
      key={props?.index}
      onPress={props?.onPress}
      style={styles.container}
    >
      <View style={styles.left}>
        <FastImage
          source={props?.data.icon}
          style={styles.icon}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AppText medium h3 style={{ marginRight: RF(5) }}>
              {props?.data?.ticker.toUpperCase()}
            </AppText>
            <NetworkTag network={props?.data?.ticker} />
          </View>
          <AppText color={THEME.COLORS.textGrey}>{props?.data?.name}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default CurrencyItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLORS.iconGrey,
    flexDirection: 'row',
    alignItems: 'center',
    margin: RF(10),
    padding: RF(10),
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
  },
});
