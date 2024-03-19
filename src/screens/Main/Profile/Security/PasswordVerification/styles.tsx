import { StyleSheet } from 'react-native';
import { THEME } from 'shared/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: THEME.PADDING.LOW,
    backgroundColor: 'black',
  },
  inputInActive: {
    borderColor: 'transparent',
  },
  input: {
    borderWidth: 1,
    borderColor: THEME.COLORS.secondaryYellow,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: -10,
  },
});
export default styles;
