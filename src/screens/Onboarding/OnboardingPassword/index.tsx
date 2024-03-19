import { ICONS } from 'assets/images/icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import ROUTE_NAMES from 'routes/RouteNames';
import AppInput from 'shared/components/AppInput';
import AppLoader from 'shared/components/AppLoader';
import AppText from 'shared/components/AppText';
import OnboardingButton from 'shared/components/OnboardingButton';
import PrimaryCheckbox from 'shared/components/PrimaryCheckbox';
import ProgressBar from 'shared/components/ProgressBar';
import { COLORS } from 'shared/constants/theme';
import { GenericNavigation } from 'shared/models/types';
import {
  checkPasswordStrength,
  validatePassword,
} from 'shared/services/helper.service';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { useTranslation } from 'react-i18next';

function OnboardingPassword(props: GenericNavigation) {
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const { t } = useTranslation(['all']);
  const email = props?.route?.params?.email;
  const username = props?.route?.params?.username;
  const firstName = props?.route?.params?.firstName;
  const lastName = props?.route?.params?.lastName;
  const dob = props?.route?.params?.dob;
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    strength: 'Weak',
    color: 'orange',
  });
  const [handlePassword, setHandlePassword] = useState(true);
  const toggleEye = () => setHandlePassword(!handlePassword);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setValidationErrors(validatePassword(password));
    const strength = checkPasswordStrength(password);
    setPasswordStrength(strength);
  }, [password]);

  const onNext = async () => {
    props?.navigation?.navigate(ROUTE_NAMES.ONBOARDING_OTP, {
      email,
      password,
      username,
      firstName,
      lastName,
      dob,
    });
  };

  return (
    <>
      {loading ? (
        <AppLoader isVisible />
      ) : (
        <View style={styles.container}>
          <FastImage
            source={ICONS.APP_LOGO}
            style={{ alignSelf: 'center', width: RF(140), height: RF(140) }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <ProgressBar
            progressBarStyle={{ margin: THEME.MARGIN.NORMAL }}
            percentage={90}
          />
          <AppText medium h1>
            {t('Protect Your Account', { ns: ['all'] })}
          </AppText>
          <AppText
            style={{ marginVertical: THEME.MARGIN.MID_LOW }}
            medium
            color={THEME.COLORS.textGrey}
          >
            {t('Create a strong password', { ns: ['all'] })}
          </AppText>
          <AppInput
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            inputStyle={[styles.input, isFocused && styles.inputActive]}
            autoCapitalize="none"
            placeholder={t('enter_password', { ns: ['all'] })}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={handlePassword}
            eye={handlePassword ? 'eye-off' : 'eye'}
            onPressIcon={toggleEye}
          />
          <AppText
            style={{ alignSelf: 'flex-end', marginRight: THEME.MARGIN.LOW }}
          >
            {t('Password Strength:', { ns: ['all'] })}{' '}
            <AppText style={{ color: passwordStrength?.color }}>
              {t(passwordStrength?.strength)}
            </AppText>
          </AppText>
          <View style={{ marginVertical: THEME.MARGIN.NORMAL }}>
            {validationErrors.map((item: any, index) => (
              <PrimaryCheckbox
                key={item?.id}
                disabled
                title={t(item?.error, { ns: ['all'] })}
                checked={Boolean(item?.checked)}
                onCheckColor={THEME.COLORS.primary}
              />
            ))}
          </View>
          <View style={{ flex: 1 }} />
          <OnboardingButton
            style={{ marginBottom: RF(20) }}
            disabled={validationErrors.some((error: any) => !error.checked)}
            onPress={onNext}
            title={t('Next', { ns: ['all'] })}
          />
        </View>
      )}
    </>
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
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default OnboardingPassword;
