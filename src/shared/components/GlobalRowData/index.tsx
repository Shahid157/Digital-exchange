/* eslint-disable react/require-default-props */
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import AppText from 'shared/components/AppText';
import { THEME } from 'shared/theme';

interface Props {
  label: string;
  value: string | number;
  loading?: boolean;
  colorValue?: string;
}
function GlobalRowData({ label, value, loading, colorValue }: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: THEME.MARGIN.VERYLOW,
        paddingHorizontal: THEME.PADDING.LOW,
      }}
    >
      <AppText color={THEME.COLORS.textGrey}>{label}</AppText>
      {loading ? (
        <ActivityIndicator size="small" color={THEME.COLORS.secondaryYellow} />
      ) : (
        <AppText
          style={{ fontFamily: THEME.FONTS.TYPE.SEMIBOLD }}
          color={colorValue || THEME.COLORS.textGrey}
        >
          {value || '--'}
        </AppText>
      )}
    </View>
  );
}

export default GlobalRowData;
