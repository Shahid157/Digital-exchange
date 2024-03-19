import React from 'react';
import { Text, TextInput, View } from 'react-native';

import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from 'shared/constants/styleSheet';
import { FONTS } from 'shared/constants/theme';
import PrimaryButton from '../PrimaryButton';

function CreateCode() {
  const { colors } = useTheme();

  return (
    <>
      <View style={{ ...GlobalStyleSheet.modalHeader, paddingBottom: 10 }}>
        <Text style={{ ...FONTS.h6, color: colors.title }}>Creat Code</Text>
      </View>
      <View style={{ ...GlobalStyleSheet.modalBody, flex: 1 }}>
        <View style={{ marginBottom: 10 }}>
          <View
            style={{
              backgroundColor: colors.card,
              ...GlobalStyleSheet.formControl,
              ...GlobalStyleSheet.shadow,
            }}
          >
            <TextInput
              style={{ ...GlobalStyleSheet.Input, color: colors.title }}
              placeholder="Creat Code"
              placeholderTextColor={colors.text}
            />
          </View>
        </View>
        <PrimaryButton title="Save" />
      </View>
    </>
  );
}

export default CreateCode;
