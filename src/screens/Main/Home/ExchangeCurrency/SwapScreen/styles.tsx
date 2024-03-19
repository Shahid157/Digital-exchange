import { StyleSheet } from 'react-native';

import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';

const styles = StyleSheet.create({
  mainContainer: { backgroundColor: 'black', flex: 1 },

  amountCard: {
    backgroundColor: THEME.COLORS.secondaryBackground,
    borderRadius: THEME.RADIUS.BOX,
    padding: THEME.PADDING.NORMAL,
    margin: THEME.MARGIN.LOW,
    marginTop: THEME.MARGIN.NORMAL,
  },

  balance: { alignItems: 'flex-start', marginTop: RF(10) },

  finalAmountRow: {
    backgroundColor: '#191C1B',
    padding: THEME.PADDING.MID_LOW,
    borderRadius: THEME.RADIUS.BOX,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: THEME.MARGIN.LOW,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: THEME.PADDING.NORMAL,
    paddingVertical: THEME.PADDING.LOW,
    height: RF(70),

    marginBottom: THEME.PADDING.NORMAL,
    borderRadius: THEME.RADIUS.BOX,
    backgroundColor: THEME.COLORS.iconGrey,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailContainer: {
    borderRadius: THEME.RADIUS.BOX,
    backgroundColor: THEME.COLORS.iconGrey,
    padding: THEME.PADDING.LOW,
  },
  iconContainer: {
    height: RF(30),
    width: RF(30),
    borderRadius: THEME.RADIUS.SMALLBOX,
    backgroundColor: THEME.COLORS.secondaryBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: RF(10),
  },
  notiView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: THEME.RADIUS.BOX,
    padding: THEME.PADDING.NORMAL,
    marginVertical: THEME.PADDING.NORMAL,
    backgroundColor: 'black',
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
  bottomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: THEME.PADDING.NORMAL,
    borderBottomWidth: 0.5,
    borderColor: THEME.COLORS.textGrey,
  },
  footerButton1: {
    backgroundColor: 'black',

    width: '45%',
    marginLeft: THEME.MARGIN.NORMAL,
  },
  coinIcon: {
    height: RF(30),
    width: RF(30),
    borderRadius: THEME.RADIUS.NORMAL,
    marginRight: RF(10),
  },
  closeButton: {
    alignItems: 'flex-end',

    justifyContent: 'center',
    borderRadius: THEME.RADIUS.OVAL,
  },

  coinBox: {
    backgroundColor: '#262626',
    padding: 12,
    paddingBottom: 0,
    borderRadius: THEME.RADIUS.NORMAL,
    zIndex: 9,
    position: 'relative',
  },
});
export default styles;
