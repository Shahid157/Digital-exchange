import { Coin } from '__generated__/graphql';
import React from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { SvgUri } from 'react-native-svg';
import AppText from 'shared/components/AppText';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { CoinType } from '../SendAssetsCoins/CoinAssetsList';

interface Props {
  index: number;
  data: CoinType;
  onPress: () => void;
}

function SwapAsset(props: Props) {
  return (
    <TouchableOpacity
      key={props?.index}
      onPress={props?.onPress}
      style={styles.container}
    >
      <View style={styles.left}>
        <SvgUri
          width={RF(30)}
          height={RF(30)}
          style={styles.icon}
          uri={props?.data?.image}
        />
        <View>
          <AppText medium h3 style={{ flex: 1 }}>
            {props?.data?.name.toUpperCase()}
          </AppText>
          <AppText color={THEME.COLORS.textGrey}>${props?.data?.price}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default SwapAsset;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: RF(12),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: RF(30),
    width: RF(30),
    borderRadius: THEME.RADIUS.OVAL,
    marginRight: RF(10),
  },
});
