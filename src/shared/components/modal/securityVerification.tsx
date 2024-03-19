import React from 'react';
import { Text, TextInput, View } from 'react-native';

import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from 'shared/constants/styleSheet';
import { FONTS } from 'shared/constants/theme';
import PrimaryButton from '../PrimaryButton';

function SecurityVerification() {
  const { colors } = useTheme();

  return (
    <>
      <View style={{ ...GlobalStyleSheet.modalHeader }}>
        <Text style={{ ...FONTS.h5, color: colors.text }}>
          Security Verification
        </Text>
      </View>
      <View style={{ ...GlobalStyleSheet.modalBody, flex: 1 }}>
        <View style={{ alignItems: 'flex-end', marginBottom: 8 }}>
          <Text style={{ ...FONTS.fontXs, color: colors.text }}>
            Didn't get the code?
          </Text>
        </View>
        <View
          style={{
            backgroundColor: colors.card,
            ...GlobalStyleSheet.formControl,
            ...GlobalStyleSheet.shadow,
          }}
        >
          <TextInput
            style={{ ...GlobalStyleSheet.Input, color: colors.text }}
            placeholder="Enter OTP"
            placeholderTextColor={colors.text}
          />
        </View>

        <PrimaryButton title="Verify" />
      </View>
    </>
  );
}

export default SecurityVerification;
