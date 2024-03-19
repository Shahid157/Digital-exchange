/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  View,
  TextStyle,
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { RF } from '../../theme/responsive';
import { GLOBAL_STYLE, THEME } from '../../theme';

interface Props extends TouchableOpacityProps {
  title: string;
  image?: string;
  iconStyle?: any;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: string;
  loading?: boolean;
  small?: boolean;
  disabled?: boolean;
  disabledMessage?: string;
  rightIcon?: string;
  colorImage?: string;
}

function PrimaryButton(props: Props) {
  return (
    <TouchableOpacity
      {...props}
      disabled={props.loading || props.disabled}
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
        style={[
          props.small ? styles.smallContainer : styles.container,
          props.buttonStyle,
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {props.icon && (
            <Icon name={props.icon} style={[styles.icon, props.iconStyle]} />
          )}

          {props.image && (
            <FastImage
              source={props.image}
              style={styles.image}
              tintColor="dark"
              // resizeMode={FastImage.resizeMode.contain}/
            />
          )}
          {props.loading ? (
            <ActivityIndicator
              color={
                props.disabled ? THEME.COLORS.lightGrey : THEME.COLORS.white
              }
            />
          ) : (
            <>
              <Text style={[styles.buttonText, props.textStyle]}>
                {props.title}
              </Text>
              {props.rightIcon && (
                <Feather name={props.rightIcon} style={styles.rightIcon} />
              )}
            </>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RF(40),
    alignSelf: 'center',
    borderRadius: THEME.RADIUS.BOX,
    ...GLOBAL_STYLE.CENTER,
    marginBottom: THEME.MARGIN.NORMAL,
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  smallContainer: {
    width: '60%',
    height: RF(40),
    alignSelf: 'center',
    borderRadius: THEME.RADIUS.BOX,
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
  image: {
    width: RF(15),
    height: RF(15),
    marginRight: THEME.MARGIN.LOW,
    alignSelf: 'center',
  },
  icon: {
    fontSize: 20,
    color: THEME.COLORS.primaryBackground,
    marginRight: THEME.MARGIN.LOW,
  },
  rightIcon: {
    fontSize: 25,
    alignSelf: 'center',
    color: THEME.COLORS.primaryBackground,
  },
  buttonText: {
    color: THEME.COLORS.primaryBackground,
    fontFamily: THEME.FONTS.TYPE.SEMIBOLD,
    fontSize: THEME.FONTS.SIZE.XSMALL,
  },
});
