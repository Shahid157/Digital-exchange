/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
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
import AnyIcon from '../AnyIcon';
import AppText from '../AppText';
import { CoinType } from '../SendAssetsCoins/CoinAssetsList';

interface Props extends TextInputProps {
  coin: CoinType;
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
  leftIconType?: string;
  leftIconColor?: string;
  iconType?: string;
  onPressLeftIcon?: () => void;
  showRightText?: boolean;
  onPressRightText?: () => void;
  rightText?: string;
  onPress?: () => void;
  hideDivider?: boolean;
  hideChevron?: boolean;
  parentContainerStyle?: StyleProp<TextStyle>;
  name?: string;
  required?: boolean;
  coinDisable?: boolean;
}

function SwapCoinInput(props: Props, ref: React.RefObject<TextInput>) {
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
            {props?.required && <AppText children="*" color="red" />}
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
              placeholder="0.00"
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
              color={props.iconColor ? props.iconColor : THEME.COLORS.inputGrey}
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
                flex: 0.14,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={props?.onPressRightText}
            >
              <AppText h4 semiBold color={THEME.COLORS.secondaryYellow}>
                {props?.rightText}
              </AppText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default forwardRef(SwapCoinInput);

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#262626',
  },

  container: {
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    height: RF(40),
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
  },
});
