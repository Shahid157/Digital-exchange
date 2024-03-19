import { StyleSheet } from 'react-native';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: RF(14),
    borderBottomWidth: 1,
    padding: RF(10),
    borderColor: THEME.COLORS.textGrey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RF(8),
  },
  mainLogo: {
    width: RF(177),
    height: RF(173),
  },
  subContainer1: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer2: {
    flex: 0.5,
    paddingHorizontal: THEME.PADDING.MID_LOW,
    justifyContent: 'space-between',
  },
  langButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: THEME.RADIUS.MIN,
  },
  langContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    paddingTop: 23,
    paddingRight: 16,
  },
  langText: {
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    fontFamily: THEME.FONTS.TYPE.SEMIBOLD,
  },
  flexStyle: {
    backgroundColor: THEME.COLORS.iconGrey,
    height: '95%',
    borderTopLeftRadius: THEME.RADIUS.OVAL,
    borderTopRightRadius: THEME.RADIUS.OVAL,
    marginTop: RF(40),
  },
  checkBox: { width: 20, height: 20, borderRadius: THEME.RADIUS.SMALLBOX },
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RF(-20),
  },
});

export default styles;
