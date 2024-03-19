import { StyleSheet } from 'react-native';

import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';

const styles = StyleSheet.create({
  mainContainer: { backgroundColor: 'black', flex: 1 },
  container: {
    paddingVertical: THEME.PADDING.MID_LOW,
    padding: 10,
    flex: 1,
  },
  amountStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transferAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currencyTicker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  svgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  amountCard: {
    backgroundColor: THEME.COLORS.secondaryBackground,
    borderRadius: THEME.RADIUS.BOX,
    padding: RF(10),

    marginVertical: THEME.MARGIN.VERYLOW,
  },
  finalAmountRow: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: THEME.PADDING.LOW,
    paddingVertical: THEME.PADDING.MID_LOW,
    borderRadius: THEME.RADIUS.SMALLBOX,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Overlay color with 50% opacity
  },
  modal: {
    width: '96%', // Occupies 80% of the screen width
    height: '60%', // Occupies 50% of the screen height
    backgroundColor: '#262626', // Modal background color
    borderRadius: THEME.RADIUS.MEDIUM,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5, // Elevation for Android shadow
  },
  flatList: {
    flex: 1,
    flexDirection: 'row',
  },
  coinBox: {
    backgroundColor: '#262626',
    padding: 12,
    paddingBottom: 0,
    borderRadius: THEME.RADIUS.NORMAL,
    zIndex: 9,
    position: 'relative',
  },
  rowDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: THEME.MARGIN.VERYLOW,
  },
});
export default styles;
