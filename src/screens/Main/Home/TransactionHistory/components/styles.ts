import { StyleSheet } from 'react-native';
import { THEME } from '../../../../../shared/theme';
import { RF } from '../../../../../shared/theme/responsive';

// eslint-disable-next-line import/prefer-default-export
export const styles = StyleSheet.create({
  bottomSheetContainer: {
    padding: THEME.PADDING.NORMAL,
  },
  totalContainer: {
    backgroundColor: '#262626',
    padding: 12,
    marginHorizontal: 12,
    borderRadius: THEME.RADIUS.BOX,
    zIndex: 9,
    position: 'relative',
  },
  container: {
    borderRadius: THEME.RADIUS.BOX,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
  },
  coinItem: {
    marginBottom: THEME.MARGIN.VERYLOW,
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinIcon: {
    height: RF(20),
    width: RF(20),
    borderRadius: THEME.RADIUS.OVAL,
  },
  coinName: {
    marginHorizontal: RF(3),
  },
});
