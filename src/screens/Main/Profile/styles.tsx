import { StyleSheet } from 'react-native';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';

const styles = StyleSheet.create({
  mainContainer: {
    padding: THEME.PADDING.LOW,
    backgroundColor: THEME.COLORS.primaryBackground,
  },
  profilePic: {
    height: RF(70),
    width: RF(70),
    borderRadius: THEME.RADIUS.INTERMEDIATE,
    backgroundColor: THEME.COLORS.secondaryYellow,
  },
  showProfilePic: {
    height: RF(300),
    width: RF(300),
    borderRadius: THEME.RADIUS.MAX,
    alignSelf: 'center',
    backgroundColor: THEME.COLORS.secondaryYellow,
  },

  editIcon: {
    height: RF(25),
    width: RF(25),
    position: 'absolute',
    backgroundColor: THEME.COLORS.iconGrey,
    borderRadius: THEME.RADIUS.ROUND,
    bottom: -7,
    right: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    flexDirection: 'row',
    marginVertical: RF(5),
  },

  logoutButton: {
    borderWidth: 1,
    borderColor: THEME.COLORS.secondaryYellow,
    backgroundColor: 'transparent',
    borderRadius: THEME.RADIUS.SMALLBOX,
    marginVertical: THEME.MARGIN.HIGH,
  },
  sheetBtn: {
    position: 'absolute',
    padding: RF(10),
    right: 10,
  },
});
export default styles;
