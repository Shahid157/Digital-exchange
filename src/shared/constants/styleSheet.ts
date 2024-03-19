/* eslint-disable import/prefer-default-export */
import { THEME } from 'shared/theme';
import { FONTS } from './theme';

export const GlobalStyleSheet = {
  modalHeader: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalBody: {
    padding: 20,
  },
  formControl: {
    borderRadius: THEME.RADIUS.BOX,
    borderWidth: 1,
    height: 48,
    marginBottom: 15,
    justifyContent: 'center',
  },
  Input: {
    paddingHorizontal: 18,
    borderRadius: THEME.RADIUS.BOX,
    height: 48,
    ...FONTS.font,
  },
  modalFooter: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: -5,
    marginRight: -5,
  },
  col50: {
    width: '50%',
    paddingLeft: 5,
    paddingRight: 5,
  },
  col70: {
    width: '70%',
    paddingLeft: 5,
    paddingRight: 5,
  },
  col60: {
    width: '60%',
    paddingLeft: 5,
    paddingRight: 5,
  },
  col40: {
    width: '40%',
    paddingLeft: 5,
    paddingRight: 5,
  },
  col30: {
    width: '30%',
    paddingLeft: 5,
    paddingRight: 5,
  },
  col33: {
    width: '33.33%',
    paddingLeft: 5,
    paddingRight: 5,
  },
  gradient: [
    'rgba(255,255,255,.12)',
    'rgba(255,255,255,.18)',
    'rgba(255,255,255,.12)',
  ],
  shadowDark: {
    shadowColor: '#bea1f3',
    shadowOffset: {
      width: 0,
      height: 30,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 20,
  },
  container: {
    padding: 15,
  },
  card: {
    padding: 15,
    borderRadius: THEME.RADIUS.BOX,
    marginBottom: 15,
  },
  shadow: {
    shadowColor: 'rgba(0,0,0,.4)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  primaryShadow: {
    shadowColor: THEME.COLORS.secondaryYellow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
};
