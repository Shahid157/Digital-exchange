import { StyleSheet } from 'react-native';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: THEME.PADDING.LOW,
    backgroundColor: 'black',
  },
  numberBullet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  otpField: {
    padding: 0,
    paddingTop: 5,
    marginHorizontal: 0,
    backgroundColor: THEME.COLORS.secondaryBackground,
    borderColor: THEME.COLORS.textExtraLight,
    borderRadius: THEME.RADIUS.SMALLBOX,
    color: THEME.COLORS.secondaryYellow,
    fontSize: THEME.FONTS.SIZE.SMALL,
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
  },
  sendCodeLinkButton: {
    textDecorationLine: 'underline',
    textDecorationColor: THEME.COLORS.white,
  },
  otpInputViewStyle: {
    height: RF(90),
  },
  codeInputHighlightStyle: {
    borderColor: THEME.COLORS.secondaryYellow,
  },
  codeOtpSumitStyle: {
    marginVertical: THEME.MARGIN.NORMAL,
  },
  submitContainer: {
    paddingHorizontal: THEME.PADDING.LOW,
  },
});
export default styles;
