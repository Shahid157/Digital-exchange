/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GLOBAL_STYLE, THEME } from '../../theme';

import { RF } from '../../theme/responsive';
import AnyIcon, { Icons } from '../AnyIcon';

interface Props extends TouchableOpacityProps {
  title: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  disabled?: boolean;
  rightIcon?: string;
}

function OnboardingButton(props: Props) {
  return (
    <TouchableOpacity
      {...props}
      disabled={props.loading || props?.disabled}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={
          props?.disabled
            ? [THEME.COLORS.disabledTextLight, THEME.COLORS.disabledTextLight]
            : ['rgba(255, 193, 40, 1)', 'rgba(255, 193, 40, 1)']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.container, props.buttonStyle]}
      >
        <Text style={[styles.buttonText, props.textStyle]}>{props.title}</Text>

        <AnyIcon
          type={Icons.AntDesign}
          name="arrowright"
          style={styles.rightIcon}
          color={THEME.COLORS.primaryBackground}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default OnboardingButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RF(50),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: THEME.RADIUS.BOX,
    justifyContent: 'space-between',
    marginBottom: THEME.MARGIN.NORMAL,
    paddingHorizontal: THEME.PADDING.NORMAL,
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    // backgroundColor: THEME.COLORS.primary
  },
  smallContainer: {
    width: '60%',
    height: RF(40),
    alignSelf: 'center',
    borderRadius: THEME.RADIUS.SMALLBOX,
    ...GLOBAL_STYLE.CENTER,
    marginBottom: THEME.MARGIN.NORMAL,
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  icon: {
    fontSize: 20,
    color: THEME.COLORS.white,
    marginRight: THEME.MARGIN.LOW,
  },
  rightIcon: {
    fontSize: 25,
    alignSelf: 'center',
  },
  buttonText: {
    color: THEME.COLORS.primaryBackground,
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
    fontSize: THEME.FONTS.SIZE.XSMALL,
  },
});
