import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import AppText from '../AppText';

interface Props {
  percentage: number;
  progressBarStyle: StyleProp<ViewStyle>;
  showPercentage: number | undefined;
}

function ProgressBar({ percentage, progressBarStyle, showPercentage }: Props) {
  return (
    <View style={[styles.mainContainer, progressBarStyle]}>
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${percentage >= 100 ? 100 : percentage}%` },
          ]}
        />
      </View>
      {showPercentage && (
        <AppText style={styles.progressText}>
          {percentage >= 100 ? 'Completed' : `${percentage}%`}
        </AppText>
      )}
    </View>
  );
}
export default ProgressBar;
const styles = StyleSheet.create({
  // Progress Bar
  mainContainer: {
    // flexDirection: 'row',
    alignSelf: 'center',
    width: '100%',
  },
  progressContainer: {
    height: RF(5),
    width: '100%',
    backgroundColor: THEME.COLORS.secondaryBackground,

    justifyContent: 'center',
    borderRadius: THEME.RADIUS.OVAL,
    paddingHorizontal: THEME.PADDING.SUPERLOW,
  },
  progressBar: {
    height: RF(5),

    backgroundColor: THEME.COLORS.primary,

    borderRadius: THEME.RADIUS.OVAL,
  },
  progressText: {
    color: THEME.COLORS.primary,
    fontSize: THEME.FONTS.SIZE.SMALL,
    fontFamily: THEME.FONTS.TYPE.SEMIBOLD,
    marginLeft: THEME.MARGIN.VERYLOW,
    alignSelf: 'center',
  },
});
