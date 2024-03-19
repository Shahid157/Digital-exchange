/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { TextProps } from 'react-native';
import { useSelector } from 'react-redux';
import { SECRET_STRING } from 'shared/constants/AppConstants';
import { RootState } from 'shared/store';
import AppText from '../AppText';

interface Props extends TextProps {
  children: string | JSX.Element;
}

function ConfidentialText(props: Props) {
  const { showBalances } = useSelector((state: RootState) => state.settings);
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AppText {...props}>
      {showBalances ? props.children : `${SECRET_STRING}  `}
    </AppText>
  );
}

export default ConfidentialText;
