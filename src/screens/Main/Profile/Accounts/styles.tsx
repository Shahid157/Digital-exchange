import { StyleSheet } from 'react-native';
import { withDecay } from 'react-native-reanimated';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';

const styles = StyleSheet.create({
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
  logoutModal: {
    backgroundColor: THEME.COLORS.secondaryBackground,
  },
  logoutButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: THEME.MARGIN.NORMAL,
  },
  cancelButton: {
    borderColor: THEME.COLORS.secondaryYellow,
    borderWidth: 1,
    backgroundColor: THEME.COLORS.BLACK_TRANS,

    width: '40%',

    marginHorizontal: THEME.MARGIN.LOW,
  },
  logoutBtn: {
    // flex: 0.5,
    width: '80%',
    // height: "100%",
    marginHorizontal: THEME.MARGIN.LOW,
  },
  bottomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: THEME.PADDING.NORMAL,
    borderBottomWidth: 0.5,
    borderColor: THEME.COLORS.textGrey,
  },
  button: {
    height: RF(60),
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: THEME.RADIUS.BOX,
    paddingLeft: THEME.PADDING.NORMAL,
    marginVertical: THEME.PADDING.LOW,
    backgroundColor: THEME.COLORS.iconGrey,
    shadowOpacity: 0,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: THEME.PADDING.LOW,
    backgroundColor: 'black',
    paddingBottom: RF(10),
    borderBottomWidth: RF(1.5),
  },
  profilePic: {
    // marginTop: RF(20),
    height: RF(120),
    width: RF(120),
    borderRadius: THEME.RADIUS.INTERMEDIATE,
    backgroundColor: THEME.COLORS.secondaryYellow,
  },
  profileLogoutButton: {
    marginTop: RF(50),
    display: 'flex',
    flexDirection: 'row',
    padding: RF(10),
    gap: RF(10),
    alignItems: 'center',
    backgroundColor: '#101010',
    borderRadius: THEME.RADIUS.BOX,
  },
  inputArea: {
    backgroundColor: '#181818',
    color: 'withe',
    padding: RF(15),
    borderRadius: THEME.RADIUS.BOX,
    marginTop: RF(10),
    marginBottom: RF(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profilePicContainer: {
    marginTop: RF(10),
    marginBottom: RF(20),
    overflowY: 'scroll',
    paddingBottom: RF(25),
    borderBottomColor: 'gray',
    borderBottomWidth: RF(1.5),
  },
  profileInputText: {
    padding: 0,
    fontWeight: 'bold',
    color: THEME.COLORS.white,
  },
  labelText: {
    color: '#979797',
  },
  editIcon: {
    height: RF(25),
    width: RF(25),
    position: 'absolute',
    backgroundColor: THEME.COLORS.iconGrey,
    borderRadius: THEME.RADIUS.ROUND,
    bottom: 5,
    right: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
