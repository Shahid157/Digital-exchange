import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AppText from '../../../../../shared/components/AppText';
import { THEME } from '../../../../../shared/theme';
import { RowDataProps } from '../../types';

export default function RowData(props: RowDataProps) {
  const { value, label, loading, colorValue } = props;

  return (
    <View style={styles.rowDataContainer}>
      <AppText color={THEME.COLORS.textGrey}>{label}</AppText>
      {loading ? (
        <ActivityIndicator size="small" color={THEME.COLORS.secondaryYellow} />
      ) : (
        <AppText
          ellipsizeMode="middle"
          numberOfLines={1}
          style={styles.text}
          color={colorValue || THEME.COLORS.textGrey}
        >
          {value}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rowDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: THEME.MARGIN.VERYLOW,
  },
  text: {
    width: '50%',
    textAlign: 'right',
  },
});
