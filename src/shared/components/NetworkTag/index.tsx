/* eslint-disable no-nested-ternary */
import React from 'react';
import { View } from 'react-native';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import AppText from '../AppText';

interface Props {
  network: string;
}
function NetworkTag({ network }: Props) {
  return (
    <View
      style={{
        height: RF(15),
        backgroundColor:
          network === 'eth'
            ? '#00AAF3'
            : network === 'bsc'
            ? '#F3BE00'
            : network === 'busd'
            ? THEME.COLORS.secondaryYellow
            : network === 'btc'
            ? THEME.COLORS.primary
            : network === 'usdt'
            ? '#26A17B'
            : THEME.COLORS.iconGrey,
        paddingHorizontal: RF(5),
        borderRadius: THEME.RADIUS.SMALLBOX,
        marginHorizontal: RF(4),
      }}
    >
      <AppText
        color={network === 'bsc' ? 'black' : THEME.COLORS.white}
        h5
        medium
      >
        {network?.toUpperCase()}
      </AppText>
    </View>
  );
}

export default NetworkTag;
