import React, { useRef } from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { GlobalStyleSheet } from 'shared/constants/styleSheet';
import { COLORS, FONTS } from 'shared/constants/theme';
import PrimaryButton from '../PrimaryButton';
import CreateCode from './createCode';

function AntiPhishing() {
  const { colors } = useTheme();
  const refRBSheet = useRef();

  return (
    <>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown
        height={240}
        openDuration={300}
        customStyles={{
          wrapper: {
            // backgroundColor: appTheme.modalBackLayer,
          },
          container: {
            backgroundColor: colors.background,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          },
          draggableIcon: {
            width: 90,
            backgroundColor: colors.borderColor,
          },
        }}
      >
        <CreateCode />
      </RBSheet>

      <View style={{ ...GlobalStyleSheet.modalHeader, paddingBottom: 10 }}>
        <Text style={{ ...FONTS.h6, color: colors.title }}>Anti Phishing</Text>
        <Text style={{ ...FONTS.font, color: COLORS.danger }}>Inactive</Text>
      </View>
      <View style={{ ...GlobalStyleSheet.modalBody, flex: 1 }}>
        <View style={{ marginBottom: 20, flex: 1 }}>
          <Text style={{ ...FONTS.font, color: colors.text }}>
            Easily identity between real notifications emails and phishing
            attempts by adding your own unique code.
          </Text>
        </View>
        <PrimaryButton
          onPress={() => {
            refRBSheet.current.open();
          }}
          title="Create Code"
        />
      </View>
    </>
  );
}

export default AntiPhishing;
