import { StyleSheet } from 'react-native';
import { THEME } from 'shared/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: THEME.PADDING.LOW,
    backgroundColor: 'black',
  },
  inputActive: {
    borderColor: THEME.COLORS.secondaryYellow,
  },
});
export default styles;
