import React from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from 'shared/constants/styleSheet';
import { FONTS } from 'shared/constants/theme';
import PrimaryButton from '../PrimaryButton';

function LinkAuthenticator() {
  const { colors } = useTheme();

  return (
    <>
      <View style={{ ...GlobalStyleSheet.modalHeader, paddingBottom: 5 }}>
        <Text style={{ ...FONTS.h6, color: colors.title }}>
          Link your Authenticator
        </Text>
      </View>
      <View style={{ ...GlobalStyleSheet.modalBody, flex: 1 }}>
        <View style={{ marginBottom: 20, flex: 1 }}>
          <Text style={{ ...FONTS.font, color: colors.text }}>
            Please download and install Google Authenticator. Than, tap "Link"
            to link your Crypto Money account.
          </Text>
        </View>
        <PrimaryButton title="Link" />
      </View>
    </>
  );
}

export default LinkAuthenticator;
