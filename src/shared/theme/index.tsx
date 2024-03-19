import { StyleSheet } from 'react-native';
import { store } from '../store';
import { RF } from './responsive';

export const THEME = {
  COLORS: {
    primary: 'rgba(255, 190, 1, 1)',
    lightGrayBackground: 'rgba(25, 28, 27, 1)',
    secondaryYellow: '#FFC128',
    iconGrey: '#191C1B',
    inputGrey: 'rgba(69, 68, 68, 1)',
    primaryBackground: '#000000',
    secondaryBackground: '#101010',
    offWhite: '#F4F4F4',
    sharpGreen: '#62BD00',
    textGrey: '#7E7E7E',
    accentWhite: '#E7ECEF',
    accentBlue: '#27A3E3',
    lightBlue: '#209EE2',
    textLight: '#928FA3',
    disabledTextLight: '#7f7e83',
    textExtraLight: 'rgba(146, 143, 163, 0.4)',
    errorRed: '#FF5C28',
    white: '#fff',
    lightGrey: '#7F819A',
    placeholderTextColor: '#36454F',
    mainLogoTitleColor: '#A0A0A0',
    alertLightBackground: '#535751',
    WHITE_TRANS: 'rgba(255,255,255,0.3)',
    PRIMARY_TRANS: 'rgba(255, 154, 1, 0.3)',
    BLACK_TRANS: 'rgba(0,0,0,0.3)',
    BLACK: '#000000',
    textDarkGrey: '#979797',
    coinTextGrey: '#262626',
    sheetGrey: '#454444',
  },
  FONTS: {
    SIZE: {
      XXLARGE: RF(32),
      XLARGE: RF(24),
      LARGE: RF(20),
      MEDIUM: RF(18),
      SMALL: RF(16),
      XSMALL: RF(14),
      XXSMALL: RF(12),
      XXXSMALL: RF(10),
      XXXXSMALL: RF(8),
    },
    TYPE: {
      LIGHT: 'Poppins-Light',
      REGULAR: 'Poppins-Regular',
      MEDIUM: 'Poppins-Medium',
      SEMIBOLD: 'Poppins-SemiBold',
      BOLD: 'Poppins-Bold',
      EXTRABOLD: 'Poppins-ExtraBold',
    },
  },
  MARGIN: {
    SUPERLOW: RF(2),
    VERYLOW: RF(4),
    LOW: RF(8),
    MID_LOW: RF(12),
    NORMAL: RF(16),
    HIGH: RF(24),
    VERYHIGH: RF(32),
    SUPERHIGH: RF(48),
    NOVAHIGH: RF(60),
    HYPERHIGH: RF(70),
  },
  PADDING: {
    SUPERLOW: RF(2),
    VERYLOW: RF(4),
    LOW: RF(8),
    MID_LOW: RF(12),
    NORMAL: RF(16),
    HIGH: RF(24),
    VERYHIGH: RF(32),
    SUPERHIGH: RF(48),
    NOVAHIGH: RF(60),
    HYPERHIGH: RF(70),
  },
  RADIUS: {
    BOX: RF(8),
    SMALLBOX: RF(4),
    MIDBOX: RF(6),
    OVAL: RF(24),
    OVALBOX: RF(20),
    ROUND: RF(30),
    HIGH: RF(40),
    NORMAL: RF(20),
    MEDIUM: RF(16),
    SMOOTH: RF(12),
    MAX: RF(300),
    MIN: RF(2),
    INTERMEDIATE: RF(80),
    ADVANCE: RF(200),
  },
};
export const GLOBAL_STYLE = StyleSheet.create({
  CENTER: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  MAIN: {
    flex: 1,
    padding: THEME.PADDING.LOW,
    backgroundColor: THEME.COLORS.primaryBackground,
  },
  ROW: {
    flexDirection: 'row',
  },
});
export const backgroundColorProperty = () => {
  const { darkMode } = store.getState().settings;
  if (darkMode) {
    return {
      backgroundColor: THEME.COLORS.primaryDarkBackground,
    };
  }
  return {
    backgroundColor: THEME.COLORS.primaryLightBackground,
  };
};

export const secondaryBackgroundColorProperty = () => {
  const { darkMode } = store.getState().settings;
  if (darkMode) {
    return {
      backgroundColor: THEME.COLORS.secondaryDarkBackground,
    };
  }
  return {
    backgroundColor: THEME.COLORS.secondaryLightBackground,
  };
};

export const biometryCircleButtonProperty = () => {
  const { darkMode } = store.getState().settings;
  if (darkMode) {
    return {
      backgroundColor: THEME.COLORS.biometryCircleButtonColor,
      color: THEME.COLORS.white,
    };
  }
  return {
    backgroundColor: THEME.COLORS.secondaryLightBackground,
    color: THEME.COLORS.white,
  };
};

export const pinCodeTitlesColor = () => {
  const { darkMode } = store.getState().settings;
  if (darkMode) {
    return THEME.COLORS.white;
  }
  return THEME.COLORS.biometryCircleButtonColor;
};

export const fontColorProperty = () => {
  const { darkMode } = store.getState().settings;

  if (darkMode) {
    return { color: THEME.COLORS.white };
  }
  return { color: THEME.COLORS.black };
};

export const fontColor = () => {
  const { darkMode } = store.getState().settings;
  if (darkMode) {
    return THEME.COLORS.white;
  }
  return THEME.COLORS.black;
};
