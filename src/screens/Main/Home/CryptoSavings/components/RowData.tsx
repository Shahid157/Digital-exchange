import { View, StyleSheet } from 'react-native';
import { THEME } from '../../../../../shared/theme';
import AppText from '../../../../../shared/components/AppText';
import { RowDataProps } from '../../types';

export default function RowData(props: RowDataProps) {
  const { value, label } = props;

  return (
    <View style={styles.container}>
      <AppText>{label}</AppText>
      <AppText>{value}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: THEME.MARGIN.LOW,
  },
});
