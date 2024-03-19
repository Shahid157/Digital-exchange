import React, { useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import { GlobalStyleSheet } from 'shared/constants/styleSheet';
import { COLORS, FONTS } from 'shared/constants/theme';

import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { twoFaSmsApi, twoFaSmsPatchApi } from 'shared/services/auth';
import { THEME } from 'shared/theme';
import SecurityOTP from './securityOtp';
import PrimaryButton from '../PrimaryButton';

function ContactModal() {
  const { colors } = useTheme();
  const theme = useTheme();
  const refRBSheet = useRef();

  const [smsOtp, setSmsOtp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);

  const hanldleSmsVerify = async () => {
    try {
      setLoadingVerify(true);
      const payload = {
        phone: `+${phoneNumber}`,
        code,
      };
      const responseVerify = await twoFaSmsPatchApi(payload);
      if (responseVerify.status === 200 || responseVerify.status === 201) {
        setSmsOtp(false);
      }
    } catch (error) {
      // Handle the error here
      // Perform any necessary error handling actions
    }
  };

  const hanldleSubmit = async () => {
    setLoading(true);
    const payload = {
      phone: `+${phoneNumber}`,
    };

    try {
      const response = await twoFaSmsApi(payload);
      Toast.show({
        text1: 'Successful',
        text2: 'Code Sent Successfully',
        type: 'success',
        position: 'top',
      });
      if (response.status === 200 || response.status === 201) {
        setSmsOtp(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      Toast.show({
        text1: 'Error',
        text2: 'An error occurred. Please try again.',
        type: 'error',
      });
    }
  };

  return (
    <>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown
        height={270}
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
        <SecurityOTP />
      </RBSheet>

      <View style={{ ...GlobalStyleSheet.modalHeader, paddingBottom: 10 }}>
        <Text style={{ ...FONTS.h6, color: colors.title }}>
          SMS Verification
        </Text>
      </View>
      {smsOtp ? (
        <View style={{ ...GlobalStyleSheet.modalBody, flex: 1 }}>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{ ...FONTS.font, color: COLORS.primary, marginBottom: 8 }}
            >
              Enter Code
            </Text>
            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: THEME.RADIUS.BOX,
                ...GlobalStyleSheet.shadow,
              }}
            >
              <View>
                <TextInput
                  style={{ ...GlobalStyleSheet.Input, color: colors.text }}
                  // defaultValue="564466552"
                  placeholder="Code"
                  onChangeText={(value) => setCode(value)}
                  placeholderTextColor={colors.text}
                />
              </View>
            </View>
          </View>
          <PrimaryButton
            onPress={hanldleSmsVerify}
            loading={loadingVerify}
            title="Verify"
          />
        </View>
      ) : (
        <View style={{ ...GlobalStyleSheet.modalBody, flex: 1 }}>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{ ...FONTS.font, color: COLORS.primary, marginBottom: 8 }}
            >
              Enter Phone Number
            </Text>
            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: THEME.RADIUS.BOX,
                ...GlobalStyleSheet.shadow,
              }}
            >
              <Animatable.View
                animation="fadeInUp"
                duration={1000}
                // delay={1000}
              >
                <TextInput
                  style={{ ...GlobalStyleSheet.Input, color: colors.text }}
                  // defaultValue="564466552"
                  placeholder="Phone Number"
                  onChangeText={(value) => setPhoneNumber(value)}
                  placeholderTextColor={colors.text}
                />
              </Animatable.View>
            </View>
          </View>
          <PrimaryButton
            onPress={hanldleSubmit}
            loading={loading}
            title="Continue"
          />
        </View>
      )}
    </>
  );
}

export default ContactModal;
