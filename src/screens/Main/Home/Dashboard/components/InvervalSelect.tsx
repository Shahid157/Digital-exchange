import React from 'react';
import { StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { THEME } from 'shared/theme';
import { COLORS } from '../../../../../shared/constants/theme';
import { IntervalSelectProps } from '../../types';

export default function IntervalSelect(props: IntervalSelectProps) {
  const { interval, intervals, onIntervalChange } = props;

  return (
    <SelectDropdown
      data={intervals}
      defaultValue={interval}
      buttonStyle={styles.buttonStyle}
      buttonTextStyle={styles.textButtonStyle}
      rowTextStyle={styles.rowTextStyle}
      selectedRowStyle={styles.selectedRowStyle}
      rowStyle={styles.rowStye}
      onSelect={onIntervalChange}
    />
  );
}

const styles = StyleSheet.create({
  selectedRowStyle: {
    backgroundColor: COLORS.darkBackground,
  },
  rowStye: {
    backgroundColor: COLORS.darkBackground,
  },
  rowTextStyle: {
    color: COLORS.primary,
  },
  textButtonStyle: {
    color: COLORS.primary,
  },
  buttonStyle: {
    height: 30,
    width: 80,
    borderRadius: THEME.RADIUS.MEDIUM,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.darkBackground,
  },
});
