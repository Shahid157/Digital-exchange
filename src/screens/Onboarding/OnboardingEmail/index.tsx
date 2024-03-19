import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { ICONS } from 'assets/images/icons';
import { Formik } from 'formik';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import AppInput from 'shared/components/AppInput';
import AppText from 'shared/components/AppText';
import OnboardingButton from 'shared/components/OnboardingButton';
import ProgressBar from 'shared/components/ProgressBar';
import { COLORS } from 'shared/constants/theme';
import { GenericNavigation } from 'shared/models/types';
import { getNormalizedError } from 'shared/services/helper.service';
import * as Animatable from 'react-native-animatable';
import { RootState } from 'shared/store';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import ROUTE_NAMES from 'routes/RouteNames';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Icons } from 'shared/components/AnyIcon';
import { useTranslation } from 'react-i18next';
import { setUser } from 'shared/store/slices/userSignUp/userSignUp.Slice';
import * as Yup from 'yup';
import { emailRegex } from 'shared/validations/authValidations';

const usernameRegex = /^[a-zA-Z0-9]+([_.-][a-zA-Z0-9]+)*[a-zA-Z0-9]{1,18}$/;

function OnboardingEmail(props: GenericNavigation) {
  const [loading, setLoading] = useState(false);
  const firstName = props?.route?.params?.firstName;
  const lastName = props?.route?.params?.lastName;
  const dob = props?.route?.params?.dob;
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.userSignUp);

  const [isFocused, setisFocused] = useState(false);
  const [isFocused1, setisFocused1] = useState(false);
  const { t } = useTranslation(['all']);

  const initialValues = {
    email: __DEV__ ? user?.email : user?.email,
    username: __DEV__ ? user?.userName : user?.userName,
  };
  const usernameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  const handleData = async (values: any) => {
    try {
      setLoading(true);

      dispatch(
        setUser({
          email: values.email.toLowerCase(),
          userName: values.username.toLowerCase(),
        })
      );
      props?.navigation?.navigate(ROUTE_NAMES.ONBOARDING_PASSWORD, {
        email: values.email.toLowerCase(),
        username: values.username.toLowerCase(),
        firstName,
        lastName,
        dob,
      });
      setLoading(false);
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

  const loginVSS = Yup.object().shape({
    username: Yup.string()
      .matches(usernameRegex, t('invalid_username_characters'))
      .required(t('enterUsername')),
    email: Yup.string()
      .matches(emailRegex, t('invalidEmail'))
      .email(t('validEmail'))
      .required(t('enterEmail')),
  });

  return (
    <View style={styles.container}>
      <FastImage
        source={ICONS.APP_LOGO}
        style={styles.fastImage}
        resizeMode={FastImage.resizeMode.contain}
      />
      <ProgressBar
        progressBarStyle={{ margin: THEME.MARGIN.NORMAL }}
        percentage={50}
      />
      <AppText medium h1>
        {t('Enter your Email Address', { ns: ['all'] })}
      </AppText>
      <AppText
        style={{ marginVertical: THEME.MARGIN.MID_LOW }}
        medium
        color={THEME.COLORS.textGrey}
      >
        {t("We'll send important notifications on this address", {
          ns: ['all'],
        })}
      </AppText>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleData(values)}
        validationSchema={loginVSS}
      >
        {({ errors, touched, handleChange, handleSubmit, values }: any) => (
          <>
            <Animatable.View
              style={{
                marginBottom: THEME.MARGIN.NORMAL,
              }}
              animation="fadeInUp"
              duration={1000}
            >
              <AppInput
                ref={emailRef}
                onFocus={() => setisFocused1(true)}
                onBlur={() => setisFocused1(false)}
                inputStyle={isFocused1 ? styles.inputActive : null}
                label={t('Email', { ns: ['all'] })}
                autoCapitalize="none"
                placeholder={t('Enter Email', { ns: ['all'] })}
                leftIconType={Icons.Feather}
                leftIconColor={THEME.COLORS.primary}
                onChangeText={handleChange('email')}
                value={values.email}
                error={errors.email && touched.email && errors.email}
                inputMode="email"
                onSubmitEditing={() => usernameRef.current?.focus()}
              />
              <AppInput
                ref={usernameRef}
                onFocus={() => setisFocused(true)}
                onBlur={() => setisFocused(false)}
                inputStyle={isFocused ? styles.inputActive : null}
                label={t('username', { ns: ['all'] })}
                autoCapitalize="none"
                placeholder={t('enter_username', { ns: ['all'] })}
                leftIconType={Icons.Feather}
                leftIconColor={THEME.COLORS.primary}
                onChangeText={(text) => {
                  if (text) handleChange('username')(text);
                }}
                value={values.username}
                error={errors.username && touched.username && errors.username}
              />
            </Animatable.View>
            <View style={{ flex: 1 }} />
            <OnboardingButton
              style={{ marginBottom: RF(20) }}
              title={t('Next', { ns: ['all'] })}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: THEME.PADDING.LOW,
    flex: 1,
  },
  inputActive: {
    borderColor: COLORS.primary,
  },
  fastImage: { alignSelf: 'center', width: RF(150), height: RF(150) },
});

export default OnboardingEmail;
