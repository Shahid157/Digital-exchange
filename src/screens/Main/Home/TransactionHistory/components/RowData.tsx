import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { THEME } from '../../../../../shared/theme';
import AppText from '../../../../../shared/components/AppText';

export interface Props {
  label: string;
  value: string;
  loading?: boolean;
  colorValue?: string;
}

export default function RowData(props: Props) {
  const { label, value, loading, colorValue } = props;

  return (
    <View style={styles.root}>
      <AppText color={THEME.COLORS.textGrey}>{label}</AppText>
      {loading ? (
        <ActivityIndicator size="small" color={THEME.COLORS.secondaryYellow} />
      ) : (
        <AppText
          ellipsizeMode="middle"
          numberOfLines={1}
          style={styles.value}
          color={colorValue || THEME.COLORS.textGrey}
        >
          {value}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: THEME.MARGIN.VERYLOW,
  },
  value: {
    width: '50%',
    textAlign: 'right',
  },
});
