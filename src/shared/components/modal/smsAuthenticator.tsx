import React from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import { FONTS } from '../../constants/theme';

import PrimaryButton from '../PrimaryButton';

interface Props {
  enabled: boolean;
}
function SmsAuthenticator({ enabled }: Props) {
  const { colors } = useTheme();

  return (
    <>
      <View style={{ ...GlobalStyleSheet.modalHeader, paddingBottom: 5 }}>
        <Text style={{ ...FONTS.h6, color: colors.title }}>
          SMS Authenticator
        </Text>
      </View>
      <View style={{ ...GlobalStyleSheet.modalBody, flex: 1 }}>
        <View style={{ marginBottom: 20, flex: 1 }}>
          <Text style={{ ...FONTS.font, color: colors.text }}>
            Are you sure you want to {enabled === true ? 'enabled' : 'disabled'}{' '}
            SMS authenticator?
          </Text>
        </View>
        <View style={{ flexDirection: 'row', marginHorizontal: -5 }}>
          <View style={{ paddingHorizontal: 5, width: '50%' }}>
            <PrimaryButton title="Yes" />
          </View>
          <View style={{ paddingHorizontal: 5, width: '50%' }}>
            <PrimaryButton color="#f72b50" title="No" />
          </View>
        </View>
      </View>
    </>
  );
}

export default SmsAuthenticator;
