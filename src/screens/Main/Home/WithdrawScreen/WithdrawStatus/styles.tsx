import { StyleSheet } from 'react-native';

import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';

const styles = StyleSheet.create({
  mainContainer: { backgroundColor: 'black', flex: 1 },
  container: {
    paddingHorizontal: THEME.PADDING.LOW,
    flex: 1,
  },
  amountCard: {
    backgroundColor: THEME.COLORS.secondaryBackground,
    borderRadius: THEME.RADIUS.BOX,
    padding: RF(10),
    marginVertical: THEME.MARGIN.NORMAL,
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
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountRow: {
    backgroundColor: 'rgba(38, 38, 38, 1)',
    paddingHorizontal: THEME.PADDING.LOW,
    paddingVertical: THEME.PADDING.MID_LOW,
    borderRadius: THEME.RADIUS.BOX,
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
  rowData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: THEME.MARGIN.LOW,
  },
  fastImage: {
    marginTop: THEME.MARGIN.NORMAL,
    width: RF(100),
    height: RF(100),
    alignSelf: 'center',
  },
});
export default styles;
