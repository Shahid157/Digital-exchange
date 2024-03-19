import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { RF } from 'shared/theme/responsive';
import { GLOBAL_STYLE, THEME } from '../../theme';
import AnyIcon from '../AnyIcon';

interface Props extends TouchableOpacityProps {
  title: string;
  image: string;
  buttonStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
  icon: string;
  loading: boolean;
  small: boolean;
  disabled: boolean;
  disabledMessage: string;
  leftIcon: string;
  leftIconColor: string;
  leftIconType: string;
  rightIcon: string;
  rightIconColor: string;
  rightIconType: string;
  colorImage: string;
  loaderColor: string;
}

function SecondaryButton(props: Props) {
  const {
    title,
    image,
    buttonStyle,
    textStyle,
    loading,
    small,
    disabled,
    disabledMessage,
    leftIcon,
    leftIconType,
    rightIcon,
    rightIconColor,
    rightIconType,
    colorImage,
    loaderColor,
  } = props;
  const titleColorProp = () => {
    if (disabledMessage && disabled) {
      return { color: THEME.COLORS.textLight };
    }
    return { color: 'white' };
  };

  const shadowColorProp = {
    shadowColor:
      disabledMessage && disabled
        ? THEME.COLORS.textLight
        : THEME.COLORS.secondaryYellow,
  };

  const buttonBackgroundColor = () => {
    if (disabled) {
      return { backgroundColor: THEME.COLORS.textLight };
    }
    return { backgroundColor: THEME.COLORS.secondaryYellow };
  };
  return (
    <TouchableOpacity
      {...props}
      style={[
        shadowColorProp,
        buttonBackgroundColor(),
        small ? styles.smallContainer : styles.container,
        buttonStyle,
      ]}
      disabled={loading || disabled}
      activeOpacity={0.7}
    >
      <View style={styles.iconView}>
        {leftIcon && (
          <AnyIcon
            type={leftIconType}
            name={leftIcon}
            size={25}
            color={props?.leftIconColor}
            style={styles.icon}
          />
        )}
        {image && (
          <FastImage
            source={image}
            style={styles.image}
            tintColor={colorImage}
            // resizeMode={FastImage.resizeMode.contain}/
          />
        )}
        {loading ? (
          <ActivityIndicator
            color={
              disabled ? THEME.COLORS.white : loaderColor || THEME.COLORS.BLACK
            }
          />
        ) : (
          <>
            <Text
              {...props}
              disabled
              style={[
                styles.buttonText,
                titleColorProp(),
                textStyle,
                {
                  marginRight: props?.rightIcon && THEME.MARGIN.SUPERLOW,
                  color: THEME.COLORS.white,
                },
              ]}
            >
              {title}
            </Text>
            {rightIcon && (
              <AnyIcon
                disabled
                type={rightIconType}
                name={rightIcon}
                color={rightIconColor || 'white'}
                style={styles.rightIcon}
                size={small ? 12 : 25}
              />
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default SecondaryButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RF(40),
    alignSelf: 'center',
    borderRadius: THEME.RADIUS.BOX,
    ...GLOBAL_STYLE.CENTER,
    flexDirection: 'row',
  },
  iconView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallContainer: {
    width: '60%',
    height: RF(40),
    alignSelf: 'center',
    borderRadius: THEME.RADIUS.BOX,
    ...GLOBAL_STYLE.CENTER,
    marginBottom: THEME.MARGIN.NORMAL,
    flexDirection: 'row',
  },
  image: {
    width: RF(15),
    height: RF(15),
    marginRight: THEME.MARGIN.LOW,
    alignSelf: 'center',
  },
  icon: {
    marginRight: THEME.MARGIN.LOW,
  },
  rightIcon: {
    marginLeft: THEME.MARGIN.VERYLOW,

    alignSelf: 'center',
  },
  buttonText: {
    alignSelf: 'center',
    fontFamily: THEME.FONTS.TYPE.SEMIBOLD,
    fontSize: THEME.FONTS.SIZE.XSMALL,
    color: THEME.COLORS.white,
  },
});
