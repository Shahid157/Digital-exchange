/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewProps } from 'react-native';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';

interface Props {
  dashed?: boolean;
  color?: string;
  dividerStyle?: StyleProp<ViewProps>;
}

const defaultProps: Props = {
  dashed: false,
  color: THEME.COLORS.textGrey,
  dividerStyle: undefined,
};

function Divider(props: Props = defaultProps) {
  return (
    <>
      {Platform.OS === 'ios' ? (
        <View style={[styles.iOSContainer, props?.dividerStyle]}>
          <View
            style={[
              styles.line,
              {
                borderStyle: props.dashed ? 'dashed' : 'solid',
                borderColor: props.color ? props.color : THEME.COLORS.textGrey,
              },
            ]}
          >
            <View style={{ height: 2 }} />
          </View>
        </View>
      ) : (
        <View
          {...props}
          style={[
            styles.androidLine,
            {
              borderColor: props.color ? props.color : THEME.COLORS.textGrey,
              borderStyle: props.dashed ? 'dashed' : 'solid',
            },
            props?.dividerStyle,
          ]}
        />
      )}
    </>
  );
}

export default Divider;

const styles = StyleSheet.create({
  iOSContainer: {
    overflow: 'hidden',
    marginVertical: RF(15),
  },
  line: {
    borderWidth: 1,
    margin: -2,
    marginTop: 0,
  },
  androidLine: {
    borderBottomWidth: 1,

    marginTop: 15,
    marginBottom: 15,
  },
});
