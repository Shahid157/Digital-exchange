import React, { useState } from 'react';

import { useTheme } from '@react-navigation/native';
import { IMAGES } from 'assets/images';
import { useTranslation } from 'react-i18next';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ROUTE_NAMES from 'routes/RouteNames';
import AppText from 'shared/components/AppText';
import PrimaryButton from 'shared/components/PrimaryButton';
import { GlobalStyleSheet } from 'shared/constants/styleSheet';
import { COLORS, FONTS, SIZES } from 'shared/constants/theme';
import { GenericNavigation } from 'shared/models/types';
import { changepasswordApi, emailverifyApi } from 'shared/services/auth';
import { getNormalizedError } from 'shared/services/helper.service';
import { THEME } from 'shared/theme';

function ChangePassword(props: GenericNavigation) {
  const theme = useTheme();
  const { colors } = useTheme();
  const [handlePassword2, setHandlePassword2] = useState(true);
  const [isFocused2, setisFocused2] = useState(false);
  const [isFocused3, setisFocused3] = useState(false);
  const [code, setCode] = useState('');
  const [newPassword, setNewPasswrod] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(['all']);
  const [linkSent, setLinkSent] = useState(false);
  const [remaining, setRemaining] = useState('59');

  const changepassword = async () => {
    try {
      setLoading(true);

      const payload = {
        code,
        newPassword,
      };
      const res = await changepasswordApi(payload);
      setLoading(false);
      Toast.show({
        text1: t('Success', { ns: ['all'] }),
        text2: t('Password Changed Successfully', { ns: ['all'] }),
        type: 'success',
      });
      props?.navigation?.navigate(ROUTE_NAMES.SIGN_IN);
    } catch (error) {
      setLoading(false);
      const err = getNormalizedError(error);
      Toast.show({
        text1: t('Failed', { ns: ['all'] }),
        text2: err,
        type: 'error',
      });
    }
  };

  const reSendCode = async () => {
    try {
      const payload = {
        email: props.route?.params?.email,
      };
      const response = await emailverifyApi(payload);
      if (response?.status === 201) {
        Toast.show({
          text1: t('Successful', { ns: ['all'] }),
          text2: t('Code sent successfully', { ns: ['all'] }),
          type: 'success',
        });
      } else {
        Toast.show({
          text1: t('Error', { ns: ['all'] }),
          text2: t('Failed to send code', { ns: ['all'] }),
          type: 'error',
        });
      }
    } catch (error) {
      Toast.show({
        text1: t('Error', { ns: ['all'] }),
        text2: t('An error occurred while sending the code', { ns: ['all'] }),
        type: 'error',
      });
    }
  };

  return (
    <View style={{ backgroundColor: COLORS.secondary, flex: 1 }}>
      <View style={styles.mainContainer}>
        <Image source={IMAGES.logoFullWhite} style={styles.logoImage} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Animatable.View
          animation="fadeInUpBig"
          duration={1000}
          style={{ paddingTop: 140, flex: 1 }}
        >
          {!theme.dark && <View style={styles.themeContainer} />}
          <View
            style={{
              ...styles.container,
              backgroundColor: colors.background,
              position: 'relative',
            }}
          >
            {theme.dark && (
              <LinearGradient
                colors={['rgba(22,23,36,.7)', 'rgba(22,23,36,0)']}
                style={styles.themeDarkGradient}
              />
            )}
            <View style={styles.themeDarkContainer}>
              <View style={styles.animatableContainer}>
                <Animatable.Text
                  animation="fadeInUp"
                  duration={1000}
                  delay={700}
                  style={{ ...FONTS.h3, color: colors.text }}
                >
                  {t('Create new password', { ns: ['all'] })}
                </Animatable.Text>
                <Animatable.Text
                  animation="fadeInUp"
                  duration={1000}
                  delay={700}
                  style={{ ...FONTS.font, color: colors.text }}
                >
                  {t('Enter your details below', { ns: ['all'] })}
                </Animatable.Text>
              </View>
              <View style={{ flex: 1 }}>
                <Animatable.View
                  animation="fadeInUp"
                  duration={1000}
                  delay={1200}
                  style={styles.inputGroup}
                >
                  <Text
                    style={{
                      ...FONTS.fontSm,
                      color: colors.text,
                      marginBottom: 6,
                    }}
                  >
                    {t('Enter code', { ns: ['all'] })}
                  </Text>
                  <View
                    style={{
                      ...GlobalStyleSheet.shadow,
                      backgroundColor: colors.card,
                      borderRadius: THEME.RADIUS.BOX,
                    }}
                  >
                    <View style={styles.inputIcon}>
                      <FeatherIcon
                        name="lock"
                        color={COLORS.primary}
                        size={18}
                      />
                    </View>
                    <TextInput
                      onFocus={() => setisFocused2(true)}
                      onBlur={() => setisFocused2(false)}
                      style={[
                        styles.input,
                        { color: colors.text, backgroundColor: colors.card },
                        isFocused2 ? styles.inputActive : null,
                      ]}
                      placeholderTextColor={colors.text}
                      placeholder={t('Please enter code', { ns: ['all'] })}
                      keyboardType="number-pad"
                      onChangeText={(value) => setCode(value)}
                      value={code}
                    />
                  </View>
                  <View style={styles.linkSentContainer}>
                    <>
                      {linkSent ? (
                        <AppText>
                          {t('Resend Code in', { ns: ['all'] })} 00:
                          {+remaining < 60 && +remaining > -1
                            ? `0${remaining}`.slice(-2)
                            : '59'}
                        </AppText>
                      ) : (
                        <TouchableOpacity onPress={() => reSendCode()}>
                          <AppText
                            style={styles.resendCode}
                            color={THEME.COLORS.secondaryYellow}
                          >
                            {t('Resend Code', { ns: ['all'] })}
                          </AppText>
                        </TouchableOpacity>
                      )}
                    </>
                  </View>
                </Animatable.View>

                <Animatable.View
                  animation="fadeInUp"
                  duration={1000}
                  delay={1400}
                  style={styles.inputGroup}
                >
                  <Text
                    style={{
                      ...FONTS.fontSm,
                      color: colors.text,
                      marginBottom: 6,
                    }}
                  >
                    {t('Confirm password', { ns: ['all'] })}
                  </Text>
                  <View
                    style={{
                      ...GlobalStyleSheet.shadow,
                      backgroundColor: colors.card,
                      borderRadius: THEME.RADIUS.BOX,
                      marginBottom: 10,
                    }}
                  >
                    <View style={styles.inputIcon}>
                      <FeatherIcon
                        name="lock"
                        color={COLORS.primary}
                        size={18}
                      />
                    </View>
                    <TextInput
                      onFocus={() => setisFocused3(true)}
                      onBlur={() => setisFocused3(false)}
                      style={[
                        styles.input,
                        { color: colors.text, backgroundColor: colors.card },
                        isFocused3 ? styles.inputActive : null,
                      ]}
                      placeholderTextColor={colors.text}
                      placeholder={t('Confirm new password', { ns: ['all'] })}
                      secureTextEntry={handlePassword2}
                      onChangeText={(value) => setNewPasswrod(value)}
                      value={newPassword}
                    />
                    {handlePassword2 ? (
                      <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setHandlePassword2(false)}
                      >
                        <FeatherIcon
                          name="eye"
                          color={COLORS.primary}
                          size={18}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setHandlePassword2(true)}
                      >
                        <FeatherIcon
                          name="eye-off"
                          color={COLORS.primary}
                          size={18}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </Animatable.View>

                <Animatable.View
                  animation="fadeInUp"
                  duration={1000}
                  delay={1500}
                >
                  <PrimaryButton
                    onPress={changepassword}
                    loading={loading}
                    title={t('Continue', { ns: ['all'] })}
                  />
                </Animatable.View>
              </View>
              <View style={styles.backToContainer}>
                <Text
                  style={{
                    ...FONTS.font,
                    marginRight: 5,
                    color: colors.text,
                  }}
                >
                  {t('Back to', { ns: ['all'] })}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation?.navigate(ROUTE_NAMES.SIGN_IN)}
                >
                  <Text style={{ ...FONTS.font, color: COLORS.primary }}>
                    {t('sign_in', { ns: ['all'] })}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animatable.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 140,
    backgroundColor: COLORS.secondary,
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    borderTopLeftRadius: SIZES.radius_lg,
    borderTopRightRadius: SIZES.radius_lg,
    overflow: 'hidden',
    marginTop: -16,
  },
  inputGroup: {
    position: 'relative',
    marginBottom: 15,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: 'transparent',
    fontSize: SIZES.font,
    borderRadius: THEME.RADIUS.BOX,
    paddingLeft: 50,
  },
  inputActive: {
    borderColor: COLORS.primary,
  },
  inputIcon: {
    position: 'absolute',
    left: 17,
    top: 15,
    tintColor: COLORS.primary,
    height: 18,
    width: 18,
    resizeMode: 'contain',
    zIndex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 180,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  themeContainer: {
    height: 30,
    backgroundColor: 'rgba(255,255,255,.2)',
    left: 20,
    right: 20,
    position: 'absolute',
    top: 114,
    borderRadius: THEME.RADIUS.HIGH,
  },
  themeDarkGradient: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  themeDarkContainer: {
    paddingHorizontal: SIZES.padding,
    paddingTop: 20,
    flex: 1,
  },
  animatableContainer: {
    alignItems: 'center',
    paddingTop: 15,
    marginBottom: 30,
  },
  linkSentContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 2,
  },
  resendCode: {
    textDecorationLine: 'underline',
    textDecorationColor: THEME.COLORS.secondaryYellow,
  },
  backToContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
  },
});

export default ChangePassword;
function dispatch(arg0: { payload: any; type: 'user/setOtpSentTime' }) {
  throw new Error('Function not implemented.');
}
