import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { GlobalStyleSheet } from 'shared/constants/styleSheet';
import { COLORS, FONTS } from 'shared/constants/theme';
import PrimaryButton from '../PrimaryButton';

function AccountModal() {
  const { colors } = useTheme();

  return (
    <>
      <View style={{ ...GlobalStyleSheet.modalHeader, paddingBottom: 10 }}>
        <Text style={{ ...FONTS.h6, color: colors.title }}>Account ID</Text>
      </View>
      <View style={{ ...GlobalStyleSheet.modalBody, flex: 1 }}>
        <View style={{ marginBottom: 10 }}>
          <Text
            style={{ ...FONTS.font, color: COLORS.primary, marginBottom: 5 }}
          >
            Account ID
          </Text>
          <TextInput
            editable={false}
            style={[
              {
                ...GlobalStyleSheet.Input,
                color: colors.title,
                paddingHorizontal: 20,
                backgroundColor: colors.card,
                ...GlobalStyleSheet.shadow,
                marginBottom: 10,
              },
            ]}
            placeholderTextColor={colors.text}
            value="123456626388"
          />
        </View>
        <PrimaryButton title="Copy" />
      </View>
    </>
  );
}

export default AccountModal;
