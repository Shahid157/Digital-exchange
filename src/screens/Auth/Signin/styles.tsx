import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from 'shared/constants/theme';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';

const styles = StyleSheet.create({
  mainLogo: {
    width: RF(150),
    height: RF(50),
    flex: 0.1,
    alignSelf: 'center',
  },
  inputActive: {
    borderColor: THEME.COLORS.primary,
  },
  langButton: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: THEME.RADIUS.MIN,
  },
  langContainer: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    top: 16,
    right: 16,
  },
  primaryButton: {
    width: 60,
    marginLeft: 10,
    alignSelf: 'center',
  },
  textContainer: {
    backgroundColor: THEME.COLORS.iconGrey,
    height: '95%',
    borderTopLeftRadius: THEME.RADIUS.OVAL,
    borderTopRightRadius: THEME.RADIUS.OVAL,
    marginTop: RF(40),
  },
  termsContainer: {
    paddingHorizontal: RF(14),
    borderBottomWidth: 1,
    padding: RF(10),
    borderColor: THEME.COLORS.textGrey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RF(8),
  },
});
export default styles;
