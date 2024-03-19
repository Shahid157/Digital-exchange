import { View, StyleSheet } from 'react-native';
import AppText from '../../../../../shared/components/AppText';
import { THEME } from '../../../../../shared/theme';
import { VerticalDataProps } from '../../types';

export default function VerticalData(props: VerticalDataProps) {
  const { value, label } = props;

  return (
    <View style={[styles.container, props.style]}>
      <AppText color={THEME.COLORS.textGrey}>{label}</AppText>
      <AppText style={styles.value} color={THEME.COLORS.white}>
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  value: {
    justifyContent: 'flex-start',
    fontSize: THEME.FONTS.SIZE.MEDIUM,
  },
});
