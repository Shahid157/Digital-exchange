import { StyleSheet } from 'react-native';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';

const styles = StyleSheet.create({
  codeInputFieldStyle: {
    padding: 0,
    paddingTop: 5,
    marginHorizontal: 0,
    backgroundColor: THEME.COLORS.secondaryBackground,
    borderColor: THEME.COLORS.textExtraLight,
    borderRadius: THEME.RADIUS.SMALLBOX,
    color: THEME.COLORS.primary,
    fontSize: THEME.FONTS.SIZE.SMALL,
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
  },
  image: {
    width: RF(89),
    height: RF(89),
    marginTop: RF(40),
    alignSelf: 'center',
  },
  fastImage: {
    width: RF(140),
    height: RF(140),
    alignSelf: 'center',
  },
  textStyle: { marginVertical: THEME.MARGIN.MID_LOW },
});
export default styles;
