import { StyleSheet } from 'react-native';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';

const styles = StyleSheet.create({
  containerCoinList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: THEME.PADDING.VERYLOW,
  },
  textContainer: { flexDirection: 'row', alignItems: 'center' },
  textStyle: {
    fontSize: THEME.FONTS.SIZE.XXXSMALL,
    fontFamily: THEME.FONTS.TYPE.REGULAR,
  },
  checkBoxStyle: { width: 20, height: 20, borderRadius: THEME.RADIUS.SMALLBOX },
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 0.55,
  },
  subContainer2: {
    paddingVertical: THEME.PADDING.LOW,
    flex: 0.4,
  },
  indicator: {
    borderRadius: THEME.RADIUS.OVAL,
    alignSelf: 'center',
    marginVertical: THEME.MARGIN.LOW,
    height: RF(5),
    backgroundColor: THEME.COLORS.iconGrey,
    width: '10%',
  },
  balanceCard: {
    borderRadius: THEME.RADIUS.BOX,
    backgroundColor: THEME.COLORS.secondaryBackground,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: RF(130),
  },
  balance: {
    marginRight: THEME.MARGIN.MID_LOW,
    marginVertical: THEME.MARGIN.MID_LOW,
    fontSize: RF(30),
  },
  txButtons: {
    marginVertical: THEME.MARGIN.MID_LOW,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dashboardButtons: {
    marginVertical: THEME.MARGIN.VERYLOW,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  kycContainer: {
    flex: 1,
    padding: THEME.PADDING.NORMAL,
    justifyContent: 'space-between',
  },
  kycText: {
    alignSelf: 'center',
    textAlign: 'center',
  },
});
export default styles;
