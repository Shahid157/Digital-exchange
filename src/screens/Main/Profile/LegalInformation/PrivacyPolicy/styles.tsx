import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from 'shared/constants/theme';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: RF(10),
    backgroundColor: THEME.COLORS.primaryBackground,
  },
  mainLogo: {
    width: RF(150),
    height: RF(150),
  },
  upper: {
    flex: 0.4,

    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: RF(10),
  },

  lower: {
    flex: 0.7,
    borderRadius: THEME.RADIUS.BOX,
    backgroundColor: THEME.COLORS.secondaryBackground,
    padding: THEME.PADDING.LOW,
    marginVertical: THEME.PADDING.LOW,
  },
  textContainer: {
    backgroundColor: THEME.COLORS.iconGrey,
    borderTopLeftRadius: THEME.RADIUS.OVAL,
    borderTopRightRadius: THEME.RADIUS.OVAL,
    marginTop: RF(40),
  },
  termsContainer: {
    paddingHorizontal: RF(14),

    padding: RF(10),
    borderColor: THEME.COLORS.textGrey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RF(8),
  },
});
export default styles;
