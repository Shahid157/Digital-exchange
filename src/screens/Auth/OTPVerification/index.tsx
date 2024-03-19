import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch, useSelector } from 'react-redux';
import ROUTE_NAMES from 'routes/RouteNames';
import AppHeader from 'shared/components/AppHeader';
import { getNormalizedError } from 'shared/services/helper.service';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AppText from '../../../shared/components/AppText';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import { COLORS } from '../../../shared/constants/theme';
import { GenericNavigation } from '../../../shared/models/types';
import { emailverifyApi, otpValidation } from '../../../shared/services/auth';
import { RootState } from '../../../shared/store';
import { setOtpSentTime } from '../../../shared/store/reducers/userReducer';
import { GLOBAL_STYLE, THEME } from '../../../shared/theme';
import { RF } from '../../../shared/theme/responsive';

function OTPVerification(props: GenericNavigation) {
  const email = props?.route?.params?.email;

  const { otpSentTime } = useSelector((state: RootState) => state.user);

  const [linkSent, setLinkSent] = useState(false);
  const { t } = useTranslation(['all']);
  const dispatch = useDispatch();

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState('59');

  const initialExpirationSeconds = 300;
  const [remainingSeconds, setRemainingSeconds] = useState(
    initialExpirationSeconds
  );
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval: any;

    if (timerActive) {
      interval = setInterval(() => {
        if (remainingSeconds > 0) {
          setRemainingSeconds((prevSeconds) => prevSeconds - 1);
        } else {
          setTimerActive(false); // Timer expired
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [remainingSeconds, timerActive]);

  const formatSeconds = (seconds) => (seconds < 10 ? `0${seconds}` : seconds);
  const expireEmailminutes = Math.floor(remainingSeconds / 60);
  const expireEmailseconds = formatSeconds(Math.floor(remainingSeconds % 60));
  // verify handler
  const onVerify = async () => {
    try {
      setLoading(true);

      const payload = {
        code: otp,
      };
      const res = await otpValidation(payload);
      setLoading(false);
      Toast.show({
        text1: t('Success', { ns: ['all'] }),
        text2: t('otpVerifiedSuccessfully', { ns: ['all'] }),
        type: 'success',
      });
      props?.navigation?.navigate(ROUTE_NAMES.RESET_PASSWORD, {
        otpId: res?.data?.id,
      });
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
  const onResend = async () => {
    try {
      setLoading(true);
      dispatch(setOtpSentTime(new Date()));
      setLinkSent(true);
      setRemainingSeconds(initialExpirationSeconds);
      setTimerActive(true);
      const payload = {
        email,
      };

      const response = await emailverifyApi(payload);
      if (response?.status === 201) {
        Toast.show({
          text1: t('Successful', { ns: ['all'] }),
          text2: t('Code resent successfully', { ns: ['all'] }),
          type: 'success',
        });
      } else {
        Toast.show({
          text1: t('Error', { ns: ['all'] }),
          text2: t('Failed to send code', { ns: ['all'] }),
          type: 'error',
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);

      Toast.show({
        text1: t('Error', { ns: ['all'] }),
        text2: t('An error occurred while sending the code', { ns: ['all'] }),
        type: 'error',
      });
    }
  };
  const VerificationResentText = () => {
    if (linkSent) {
      return `${t('Resend')}`;
    }
    return t('Resend');
  };

  useEffect(() => {
    let unsubscribe: any;

    if (otpSentTime) {
      unsubscribe = setInterval(() => {
        const difference = (
          Number(Date.now() - new Date(otpSentTime).getTime()) / 1000
        ).toFixed(0);
        setRemaining(String(60 - Number(difference)));

        if (60 - Number(difference) < 0) {
          dispatch(setOtpSentTime(null));
          setLinkSent(false);
        }
      }, 1000);
    }

    return () => clearInterval(unsubscribe);
  }, [otpSentTime]);
  useEffect(() => {
    dispatch(setOtpSentTime(new Date()));
    setLinkSent(true);
    setRemainingSeconds(initialExpirationSeconds);
    setTimerActive(true);
  }, [dispatch]);

  return (
    <View style={GLOBAL_STYLE.MAIN}>
      <AppHeader leftIcon="back" title={t('Email Verification')} />

      <Animatable.View
        style={{ paddingHorizontal: RF(10) }}
        animation="fadeInUp"
        duration={1000}
        delay={700}
      >
        <AppText
          h1
          medium
          color={THEME.COLORS.secondaryYellow}
          style={{ marginTop: THEME.MARGIN.LOW }}
        >
          {t('Enter The Code', { ns: ['all'] })}
        </AppText>
      </Animatable.View>
      <Animatable.View
        style={{ padding: RF(10) }}
        animation="fadeInUp"
        duration={1000}
        delay={700}
      >
        <AppText medium color={THEME.COLORS.textGrey}>
          {t("Enter the code you've received in this email:", {
            ns: ['all'],
          })}
        </AppText>
        <AppText medium>"{email}"</AppText>
      </Animatable.View>
      <Animatable.View
        style={{ paddingHorizontal: RF(10) }}
        animation="fadeInUp"
        duration={1000}
        delay={1000}
      >
        <OTPInputView
          pinCount={6}
          autoFocusOnLoad
          codeInputFieldStyle={styles.codeInputFieldStyle}
          codeInputHighlightStyle={{
            borderColor: THEME.COLORS.secondaryYellow,
          }}
          selectionColor={THEME.COLORS.lightGrey}
          onCodeChanged={setOtp}
          placeholderTextColor={THEME.COLORS.secondaryYellow}
          onCodeFilled={setOtp}
          secureTextEntry
          style={{
            height: RF(90),
          }}
        />
        <View style={styles.textContainer}>
          {timerActive ? (
            <AppText>
              {`${t('This code will expire in', {
                ns: ['all'],
              })} ${expireEmailminutes}:${expireEmailseconds}`}{' '}
            </AppText>
          ) : (
            <AppText>{t('Code expired', { ns: ['all'] })} </AppText>
          )}
          <TouchableOpacity onPress={onResend} disabled={linkSent}>
            <AppText
              style={{ color: linkSent ? '#191C1B' : THEME.COLORS.primary }}
            >
              {VerificationResentText()}
            </AppText>
          </TouchableOpacity>
        </View>

        <AppText
          style={{
            alignSelf: 'center',
            marginTop: RF(40),
            color: THEME.COLORS.textGrey,
          }}
        >
          {t("Can't find the code?", {
            ns: ['all'],
          })}
        </AppText>
        <AppText style={{ alignSelf: 'center', color: THEME.COLORS.textGrey }}>
          {t("Don't forget to check your spam folder")}
        </AppText>
      </Animatable.View>
      <View style={{ flex: 1 }} />
      <Animatable.View animation="fadeInUp" duration={1000} delay={1500}>
        <PrimaryButton
          disabled={Boolean(!(otp?.length == 6))}
          onPress={onVerify}
          loading={loading}
          title={t('Verify', { ns: ['all'] })}
          buttonStyle={{ marginBottom: THEME.MARGIN.VERYHIGH }}
        />
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  inputActive: {
    borderColor: COLORS.primary,
  },
  codeInputFieldStyle: {
    padding: 0,
    paddingTop: 5,
    marginHorizontal: 0,
    backgroundColor: THEME.COLORS.secondaryBackground,
    borderColor: THEME.COLORS.textExtraLight,
    borderRadius: THEME.RADIUS.SMALLBOX,
    color: THEME.COLORS.secondaryYellow,
    fontSize: THEME.FONTS.SIZE.SMALL,
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
  },
});

export default OTPVerification;
