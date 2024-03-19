import React, { ReactNode } from 'react';
import { Text, TextProps } from 'react-native';
import { THEME } from 'shared/theme';

interface Props extends TextProps {
  children: ReactNode;
  color?: string;
  bold?: boolean;
  regular?: boolean;
  medium?: boolean;
  semiBold?: boolean;
  light?: boolean;
  title?: boolean;
  secondaryTitle?: boolean;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
}

function AppText(props: Props) {
  const {
    children,
    color,
    bold,
    semiBold,
    regular,
    medium,
    light,
    title,
    secondaryTitle,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
  } = props;

  let fontFamily = THEME.FONTS.TYPE.REGULAR;

  if (bold) {
    fontFamily = THEME.FONTS.TYPE.BOLD;
  }
  if (light) {
    fontFamily = THEME.FONTS.TYPE.LIGHT;
  }
  if (semiBold) {
    fontFamily = THEME.FONTS.TYPE.SEMIBOLD;
  }
  if (medium) {
    fontFamily = THEME.FONTS.TYPE.MEDIUM;
  }
  if (regular) {
    fontFamily = THEME.FONTS.TYPE.REGULAR;
  }

  let fontSize = THEME.FONTS.SIZE.XXSMALL;

  if (title) {
    fontSize = THEME.FONTS.SIZE.XLARGE;
  }
  if (secondaryTitle) {
    fontSize = THEME.FONTS.SIZE.LARGE;
  }
  if (h1) {
    fontSize = THEME.FONTS.SIZE.MEDIUM;
  }
  if (h2) {
    fontSize = THEME.FONTS.SIZE.SMALL;
  }
  if (h3) {
    fontSize = THEME.FONTS.SIZE.XSMALL;
  }
  if (h4) {
    fontSize = THEME.FONTS.SIZE.XXSMALL;
  }
  if (h5) {
    fontSize = THEME.FONTS.SIZE.XXXSMALL;
  }
  if (h6) {
    fontSize = THEME.FONTS.SIZE.XXXXSMALL;
  }

  return (
    <Text
      {...props}
      style={[
        {
          fontFamily,
          fontSize,
          color: color || 'white',
        },
        props.style,
      ]}
    >
      {children}
    </Text>
  );
}

export default AppText;
