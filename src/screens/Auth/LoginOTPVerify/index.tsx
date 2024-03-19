import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useSelector } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import { ICONS } from '../../../assets/images/icons';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import { GLOBAL_STYLE, THEME } from '../../../shared/theme';
import AppText from '../../../shared/components/AppText';
import {
  getNormalizedError,
  toast,
} from '../../../shared/services/helper.service';
import { GenericNavigation } from '../../../shared/models/types';
import { RootState } from '../../../shared/store';
import { RF } from '../../../shared/theme/responsive';
import { COLORS } from '../../../shared/constants/theme';
import { setOtpSentTime } from '../../../shared/store/reducers/userReducer';
import styles from './styles';
import { loginWithCredentials } from '../../../shared/store/slices/session/session.slice';
import { useAppDispatch } from '../../../shared/hooks/redux';

function LoginOTPVerify(props: GenericNavigation) {
  const usernameOrEmail = props?.route?.params?.usernameOrEmail;
  const password = props?.route?.params?.password;
  const email = props?.route?.params?.email;

  const { otpSentTime } = useSelector((state: RootState) => state.user);
  const { loginStatus } = useSelector((state: RootState) => state.session);

  const [linkSent, setLinkSent] = useState(false);
  const { t } = useTranslation(['all']);
  const dispatch = useAppDispatch();
  const initialExpirationSeconds = 300;
  const [remainingSeconds, setRemainingSeconds] = useState(
    initialExpirationSeconds
  );
  const [timerActive, setTimerActive] = useState(false);
  const [otp, setOTP] = useState('');
  const loading = loginStatus === 'loading';

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

  const formatSeconds = (seconds: number) =>
    seconds < 10 ? `0${seconds}` : seconds;

  const expireEmailminutes = Math.floor(remainingSeconds / 60);
  const expireEmailseconds = formatSeconds(Math.floor(remainingSeconds % 60));

  useEffect(() => {
    let unsubscribe: any;

    if (otpSentTime) {
      unsubscribe = setInterval(() => {
        const difference = (
          Number(Date.now() - new Date(otpSentTime).getTime()) / 1000
        ).toFixed(0);
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

  // verify handler
  const handleVerify = async () => {
    try {
      await dispatch(
        loginWithCredentials({
          password,
          usernameOrEmail,
          newIpVerificationCode: otp,
        })
      ).unwrap();

      Toast.show({
        text1: t('Successful'),
        text2: t('LoggedIn Successfully'),
        type: 'success',
      });
    } catch (error: any) {
      if (error.statusCode === 403) {
        Toast.show({
          text1: t('Successful'),
          text2: t('OTP Sent to Your Email'),
          type: 'success',
        });
      } else {
        Toast.show({
          text1: t('Failed'),
          text2: getNormalizedError(error),
          type: 'error',
        });
      }
    }
  };

  const onResend = async () => {
    try {
      dispatch(setOtpSentTime(new Date()));
      setLinkSent(true);
      setRemainingSeconds(initialExpirationSeconds); // Reset timer to 5 minutes
      setTimerActive(true); // Start the timer

      await dispatch(
        loginWithCredentials({
          password,
          usernameOrEmail,
        })
      ).unwrap();
    } catch (error: any) {
      if (error.message === 'ip is not in white list') {
        toast(t('Successful'), t('OTP Sent to Your Email'), 'success');
      } else {
        Toast.show({
          text1: t('Failed'),
          text2: getNormalizedError(error),
          type: 'error',
        });
      }
    }
  };

  return (
    <View style={GLOBAL_STYLE.MAIN}>
      <FastImage
        source={ICONS.APP_LOGO}
        resizeMode={FastImage.resizeMode.contain}
        style={styles.fastImage}
      />

      <Animatable.View animation="fadeInUp" duration={1000} delay={700}>
        <FastImage
          source={ICONS.AUTHORIZE}
          resizeMode={FastImage.resizeMode.contain}
          tintColor={THEME.COLORS.secondaryYellow}
          style={styles.image}
        />
        <AppText secondaryTitle medium style={styles.textStyle}>
          {t('Authorize this Login')}
        </AppText>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" duration={1000} delay={700}>
        <AppText medium color={THEME.COLORS.textGrey}>
          {t("Enter the code you've received in:")}
        </AppText>
        <AppText medium>"{email}"</AppText>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" duration={1000} delay={1000}>
        <OTPInputView
          pinCount={6}
          autoFocusOnLoad
          codeInputFieldStyle={styles.codeInputFieldStyle}
          codeInputHighlightStyle={{
            borderColor: THEME.COLORS.primary,
          }}
          selectionColor={THEME.COLORS.lightGrey}
          onCodeChanged={setOTP}
          placeholderTextColor={COLORS.primary}
          style={{
            height: RF(90),
          }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {timerActive ? (
            <AppText>
              {`${t('This code will expire in', {
                ns: ['all'],
              })} ${expireEmailminutes}:${expireEmailseconds}`}{' '}
            </AppText>
          ) : (
            <AppText>{t('Code expired')} </AppText>
          )}
          {linkSent ? (
            <AppText style={{ color: '#191C1B' }}>{t('Resend')}</AppText>
          ) : (
            <TouchableOpacity onPress={onResend}>
              <AppText color={THEME.COLORS.primary}>{t('Resend')}</AppText>
            </TouchableOpacity>
          )}
        </View>
        <AppText
          style={{
            alignSelf: 'center',
            marginTop: RF(20),
            color: THEME.COLORS.textGrey,
          }}
        >
          {t("Can't find the code?")}
        </AppText>
        <AppText style={{ alignSelf: 'center', color: THEME.COLORS.textGrey }}>
          {t("Don't forget to check your spam folder")}
        </AppText>
      </Animatable.View>
      <View style={{ flex: 1 }} />
      <Animatable.View animation="fadeInUp" duration={1000} delay={1500}>
        <PrimaryButton
          disabled={Boolean(!(otp?.length == 6))}
          onPress={handleVerify}
          loading={loading}
          title={t('Verify')}
          buttonStyle={{ marginBottom: THEME.MARGIN.VERYHIGH }}
        />
      </Animatable.View>
    </View>
  );
}

export default LoginOTPVerify;
