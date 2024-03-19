import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from 'shared/constants/theme';
import { THEME } from 'shared/theme';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: 20,
    marginBottom: 10,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageStyle: {
    marginRight: 10,
    height: 35,
    width: 35,
    borderRadius: THEME.RADIUS.ROUND,
  },
  rippleStyle: {
    backgroundColor: COLORS.primary,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: THEME.RADIUS.MIDBOX,
    paddingHorizontal: 10,
  },
  rippleCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.margin,
  },
  fastImage: {
    height: 70,
    width: 100,
    borderRadius: THEME.RADIUS.BOX,
    marginRight: 15,
  },
  eventCard: {
    marginHorizontal: 10,
    padding: 12,
    borderRadius: THEME.RADIUS.BOX,
    marginBottom: 10,
  },
});
export default styles;
