import React, { forwardRef } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import NewIcon from 'react-native-vector-icons/Feather';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { COLORS } from 'shared/constants/theme';
import FastImage from 'react-native-fast-image';
import { COINS } from 'assets/images/coins';
import { SvgUri } from 'react-native-svg';
import { useTranslation } from 'react-i18next';
import AnyIcon, { Icons } from '../AnyIcon';
import AppText from '../AppText';

interface Props extends TextInputProps {
  inputStyle?: StyleProp<ViewStyle>;
  error?: string | undefined;
  textInputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  icon?: string;
  onPressIcon?: () => void;
  iconColor?: string;
  rightTextColor?: string;
  label?: string;
  iconType?: any;
  showRightText?: boolean;
  onPressRightText?: () => void;
  rightText?: string;
  onPress?: () => void;
  placeholder?: string;
  parentContainerStyle?: StyleProp<TextStyle>;
  name?: string;
}

function AddressInput(props: Props, ref: any) {
  const { t } = useTranslation(['all']);
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={props.parentContainerStyle}
      onPress={props.onPress && props.onPress}
    >
      <View style={[styles.mainContainer]}>
        {props.label && (
          <AppText style={[styles.label, props.labelStyle]}>
            {props.label}{' '}
          </AppText>
        )}
        <View style={[styles.container, props.inputStyle]}>
          <View
            style={{ flex: 1 }}
            pointerEvents={props.onPress ? 'none' : 'auto'}
          >
            <TextInput
              ref={ref}
              name={props.name}
              keyboardType="decimal-pad"
              cursorColor={THEME.COLORS.white}
              {...props}
              placeholder={
                props.placeholder ? props.placeholder : t('Enter Address')
              }
              placeholderTextColor={THEME.COLORS.textGrey}
              style={[
                styles.inputContainer,
                props.textInputStyle,
                { marginLeft: props?.leftIcon && 3 },
              ]}
            />
          </View>
          {props.icon ? (
            <AnyIcon
              onPress={props.onPressIcon}
              style={styles.icon}
              name={props.icon}
              type={props?.iconType}
              size={20}
              color={props.iconColor ? props.iconColor : THEME.COLORS.labelGrey}
            />
          ) : (
            <NewIcon
              onPress={props.onPressIcon}
              style={styles.icon} // @ts-ignore
              name={props.eye}
              size={20}
              color={THEME.COLORS.primary}
            />
          )}
          {props?.showRightText && (
            <TouchableOpacity
              style={{
                flex: 0.3,

                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={props?.onPressRightText}
            >
              <AppText
                semiBold
                color={
                  props?.rightTextColor
                    ? props?.rightTextColor
                    : THEME.COLORS.secondaryYellow
                }
              >
                {props?.rightText}
              </AppText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default forwardRef(AddressInput);

const styles = StyleSheet.create({
  mainContainer: {
    // alignItems: "center",
    width: '100%',
    alignSelf: 'center',

    marginVertical: THEME.MARGIN.LOW,
    paddingLeft: THEME.PADDING.LOW,
    backgroundColor: THEME.COLORS.secondaryBackground,
    borderRadius: THEME.RADIUS.BOX,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    shadowColor: THEME.COLORS.secondaryYellow,
  },

  container: {
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    height: RF(50),

    backgroundColor: THEME.COLORS.secondaryBackground,
    borderRadius: THEME.RADIUS.BOX,
  },
  image: {
    width: RF(25),
    height: RF(25),
    borderRadius: THEME.RADIUS.OVAL,
    marginRight: THEME.MARGIN.LOW,
    alignSelf: 'center',
  },
  errorView: {
    marginVertical: THEME.MARGIN.VERYLOW,
    marginLeft: THEME.MARGIN.LOW,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    color: 'white',
    height: '100%',

    fontFamily: THEME.FONTS.TYPE.REGULAR,
    fontSize: THEME.FONTS.SIZE.XSMALL,
    paddingLeft: THEME.PADDING.VERYLOW,
  },
  maxButton: {
    width: RF(52),
    height: '100%',
    borderRadius: THEME.RADIUS.SMALLBOX,
    overflow: 'hidden',
  },
  label: {
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
    color: THEME.COLORS.textGrey,

    marginTop: RF(10),
  },
  leftIconContainer: {
    flexDirection: 'row',
    marginRight: RF(5),
    paddingRight: RF(5),
    borderRightWidth: 1,
    borderColor: THEME.COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    // paddingHorizontal: THEME.SPACING.SPACING_8,
  },
});
