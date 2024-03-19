import { StyleSheet } from 'react-native';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: THEME.PADDING.LOW,
    backgroundColor: 'black',
  },
  gaCode: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
    padding: RF(5),

    alignSelf: 'center',
    backgroundColor: THEME.COLORS.secondaryBackground,
    borderRadius: THEME.RADIUS.SMALLBOX,
  },
  numberBullet: { flexDirection: 'row', alignItems: 'center' },
  description: { alignSelf: 'center', width: '79%' },
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
});
export default styles;
