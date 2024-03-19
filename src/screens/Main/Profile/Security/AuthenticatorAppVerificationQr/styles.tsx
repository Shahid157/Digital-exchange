import { StyleSheet } from 'react-native';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: THEME.PADDING.LOW,
    backgroundColor: 'black',
  },
  gaCodeHd: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 25,
    marginBottom: 10,
  },
  gaCode: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    padding: RF(5),
    marginBottom: 30,
    alignSelf: 'center',
    backgroundColor: THEME.COLORS.secondaryBackground,
    borderRadius: THEME.RADIUS.SMALLBOX,
  },
});
export default styles;
