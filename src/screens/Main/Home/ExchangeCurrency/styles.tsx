import { StyleSheet } from 'react-native';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';

const styles = StyleSheet.create({
  container: { backgroundColor: 'black', flex: 1 },
  subContainer: { flex: 1, paddingHorizontal: RF(10) },
  subContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: RF(10),
  },
  textStyle: {
    marginVertical: THEME.MARGIN.LOW,
    textAlign: 'center',
    color: THEME.COLORS.textGrey,
  },
});
export default styles;
