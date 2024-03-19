import React, { useRef } from 'react';
import { Text, TextInput, View } from 'react-native';

import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/store';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import PrimaryButton from '../PrimaryButton';
import EmailOTP from './emailOtp';

function NewEmailModal() {
  const { colors } = useTheme();
  const theme = useTheme();
  const refRBSheet = useRef();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  return (
    <>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown
        height={100}
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
        {theme.dark && (
          <LinearGradient
            colors={['rgba(22,23,36,.7)', 'rgba(22,23,36,0)']}
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
            }}
          />
        )}
        <EmailOTP />
      </RBSheet>

      <View style={{ ...GlobalStyleSheet.modalHeader, paddingBottom: 10 }}>
        <Text style={{ ...FONTS.h6, color: colors.title }}>Email 2FA</Text>
      </View>
      <View style={{ ...GlobalStyleSheet.modalBody, flex: 1 }}>
        <View>
          <Text
            style={{ ...FONTS.font, color: COLORS.primary, marginBottom: 5 }}
          >
            Email
          </Text>
          <View
            style={{
              backgroundColor: colors.card,
              ...GlobalStyleSheet.formControl,
              ...GlobalStyleSheet.shadow,
            }}
          >
            <TextInput
              editable={false}
              style={[
                {
                  ...GlobalStyleSheet.Input,
                  color: colors.title,
                  paddingHorizontal: 20,
                  backgroundColor: colors.card,
                },
              ]}
              placeholderTextColor={colors.text}
              value={userInfo?.email}
            />
          </View>
        </View>
        <PrimaryButton
          // onPress={() => {refRBSheet.current.open()}}
          title="Verify"
        />
      </View>
    </>
  );
}

export default NewEmailModal;
