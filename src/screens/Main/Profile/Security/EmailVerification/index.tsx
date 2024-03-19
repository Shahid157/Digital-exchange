import React, { useState } from 'react';
import { View } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import ROUTE_NAMES from 'routes/RouteNames';
import { Icons } from 'shared/components/AnyIcon';
import AppHeader from 'shared/components/AppHeader';
import AppInput from 'shared/components/AppInput';
import AppText from 'shared/components/AppText';
import PrimaryButton from 'shared/components/PrimaryButton';
import { THEME } from 'shared/theme';
import { emailRegex } from 'shared/validations/authValidations';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import { GenericNavigation } from '../../types';

function EmailVerification(props?: GenericNavigation) {
  const [email, setEmail] = useState('');
  const [isFocused, setisFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(['all']);
  const onNext = () => {
    try {
      if (!email) {
        Toast.show({
          text1: t('Failed', { ns: ['all'] }),
          text2: t('Enter Email First', { ns: ['all'] }),
          type: 'error',
        });
      } else if (!emailRegex.test(email)) {
        Toast.show({
          text1: t('Failed', { ns: ['all'] }),
          text2: t('Invalid Email', { ns: ['all'] }),
          type: 'error',
        });
      } else {
        setLoading(true);
        props?.navigation?.navigate(ROUTE_NAMES.EMAIL_VERIFICATON_OTP, {
          email,
        });
        setLoading(false);
      }
    } catch (e) {}
  };

  return (
    <View style={styles.mainContainer}>
      <AppHeader
        title={t('Email Verification', { ns: ['all'] })}
        leftIcon="back"
      />
      <AppText>
        {t('We’ll send a code to verify this Email. Make sure it is valid.', {
          ns: ['all'],
        })}
      </AppText>
      <AppInput
        onFocus={() => setisFocused(true)}
        onBlur={() => setisFocused(false)}
        inputStyle={isFocused ? styles.inputActive : null}
        label={t('Email', { ns: ['all'] })}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        placeholder={t('Enter Email', { ns: ['all'] })}
        leftIconType={Icons.Feather}
        leftIcon="mail"
        leftIconColor={THEME.COLORS.secondaryYellow}
      />
      <View style={{ flex: 1 }} />
      <PrimaryButton
        onPress={onNext}
        loading={loading}
        title={t('Next', { ns: ['all'] })}
        buttonStyle={{ marginVertical: THEME.MARGIN.NORMAL }}
      />
    </View>
  );
}

export default EmailVerification;
