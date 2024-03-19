import { StyleSheet } from 'react-native';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: THEME.PADDING.LOW,
    backgroundColor: 'black',
  },
  inputActive: {
    borderColor: THEME.COLORS.secondaryYellow,
  },
  inputInActive: {
    borderColor: THEME.COLORS.iconGrey,
  },
  phoneInput: {
    alignSelf: 'center',
    width: '100%',
    color: THEME.COLORS.white,
    fontFamily: THEME.FONTS.TYPE.REGULAR,
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    backgroundColor: THEME?.COLORS.BLACK_TRANS,
  },

  bottomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: THEME.PADDING.NORMAL,
    borderBottomWidth: 0.5,
    borderColor: THEME.COLORS.textGrey,
    marginBottom: '8%',
  },
});
export default styles;
