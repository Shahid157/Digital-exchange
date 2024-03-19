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
import AnyIcon, { Icons } from '../AnyIcon';
import AppText from '../AppText';

interface Props extends TextInputProps {
  inputStyle?: StyleProp<ViewStyle>;
  error?: string | undefined;
  textInputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  icon?: string;
  onPressIcon?: () => void;
  eye?: string;
  iconColor?: string;
  label?: string;
  leftIcon?: string;
  leftIconType?: any;
  leftIconColor?: string;
  iconType?: any;
  onPressLeftIcon?: () => void;
  showRightText?: boolean;
  onPressRightText?: () => void;
  rightText?: string;
  onPress?: () => void;
  requiredSign?: boolean;
  parentContainerStyle?: StyleProp<TextStyle>;
  name?: string;
  required?: boolean;
}

function UsernameInput(props: Props, ref: React.RefObject<TextInput>) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={props.parentContainerStyle}
      onPress={props.onPress && props.onPress}
    >
      {props.label && (
        <AppText style={[styles.label, props.labelStyle]}>
          {props.label}{' '}
          {props?.required && <AppText children="*" color="red" />}
        </AppText>
      )}
      <View style={[styles.container, props.inputStyle]}>
        {props.leftIcon && (
          <View style={styles.leftIconContainer}>
            <AnyIcon
              type={props?.leftIconType}
              name={props?.leftIcon}
              size={18}
              color={props?.leftIconColor ? props?.leftIconColor : 'grey'}
              style={{ alignSelf: 'center' }}
              onPress={props.onPressLeftIcon}
            />
          </View>
        )}
        <View
          style={{ flex: 1 }}
          pointerEvents={props.onPress ? 'none' : 'auto'}
        >
          <TextInput
            ref={ref}
            name={props.name}
            {...props}
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
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: THEME.PADDING.MID_LOW,
            }}
            onPress={props?.onPressRightText}
          >
            <AppText style={styles.rightText}>{props?.rightText}</AppText>
          </TouchableOpacity>
        )}
      </View>
      {props?.error && <FormikError error={props?.error} />}
    </TouchableOpacity>
  );
}
interface errorProps {
  error: string;
  errorStyle: StyleProp<ViewStyle>;
}
export function FormikError({ error = '', errorStyle = {} }) {
  return (
    <View style={[styles.errorView, errorStyle]}>
      <AnyIcon
        disabled
        type={Icons.MaterialIcons}
        name="error"
        size={14}
        color="#E63946"
        style={{ marginRight: 4 }}
      />
      <AppText h5 medium color="#E63946">
        {error}
      </AppText>
    </View>
  );
}
export default forwardRef(UsernameInput);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    height: RF(50),
    borderWidth: 1,
    backgroundColor: THEME.COLORS.secondaryBackground,
    borderRadius: THEME.RADIUS.BOX,
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
    fontSize: THEME.FONTS.SIZE.XXSMALL,
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

    marginTop: RF(5),
  },
  leftIconContainer: {
    marginRight: RF(5),
    // backgroundColor: "red",
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    // paddingHorizontal: THEME.SPACING.SPACING_8,
  },
  rightText: {
    color: THEME.COLORS.white,
    fontFamily: THEME.FONTS.TYPE.SEMIBOLD,
    textDecorationColor: THEME.COLORS.white,
    textDecorationLine: 'underline',
    fontSize: RF(14),
  },
});
