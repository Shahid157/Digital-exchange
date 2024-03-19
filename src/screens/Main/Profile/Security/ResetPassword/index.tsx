import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import AppHeader from 'shared/components/AppHeader';
import AppInput from 'shared/components/AppInput';
import AppLoader from 'shared/components/AppLoader';
import AppText from 'shared/components/AppText';
import PrimaryButton from 'shared/components/PrimaryButton';
import PrimaryCheckbox from 'shared/components/PrimaryCheckbox';
import {
  checkPasswordStrength,
  getNormalizedError,
  validatePassword,
} from 'shared/services/helper.service';
import { RootState } from 'shared/store';
import { THEME } from 'shared/theme';
import { changepasswordApiV2 } from 'shared/services/auth';
import ROUTE_NAMES from 'routes/RouteNames';
import { RF } from 'shared/theme/responsive';
import { GenericNavigation } from '../../types';
import styles from './styles';

function ResetPassword(props: GenericNavigation) {
  const { otpId }: any = props?.route?.params;
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [isFocusedNew, setIsFocusedNew] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    strength: 'Weak',
    color: 'orange',
  });

  const [handleNewPassword, setHandleNewPassword] = useState(true);

  const toggleEyeNewPass = () => setHandleNewPassword(!handleNewPassword);

  const { t } = useTranslation(['all']);

  useEffect(() => {
    setValidationErrors(validatePassword(newPassword));
    const strength = checkPasswordStrength(newPassword);
    setPasswordStrength(strength);
  }, [newPassword]);

  const onConfirm = async (otpId: string, newPassword: string) => {
    try {
      setLoading(true);

      const payload = {
        otpId,
        newPassword,
      };
      const res = await changepasswordApiV2(payload);
      setLoading(false);
      Toast.show({
        text1: t('Success'),
        text2: t('Password Changed Successfully'),
        type: 'success',
      });
      props?.navigation?.navigate(ROUTE_NAMES.SIGN_IN);
    } catch (error) {
      setLoading(false);
      const err = getNormalizedError(error);
      Toast.show({
        text1: t('Failed'),
        text2: err,
        type: 'error',
      });
    }
  };

  return (
    <>
      {loading ? (
        <AppLoader isVisible />
      ) : (
        <View style={styles.mainContainer}>
          <AppHeader title={t('Create new password')} leftIcon="back" />
          <AppInput
            label={t('New Password')}
            onFocus={() => setIsFocusedNew(true)}
            onBlur={() => setIsFocusedNew(false)}
            inputStyle={[styles.input, isFocusedNew && styles.inputActive]}
            autoCapitalize="none"
            placeholder={t('Input password')}
            onChangeText={setNewPassword}
            value={newPassword}
            secureTextEntry={handleNewPassword}
            eye={handleNewPassword ? 'eye-off' : 'eye'}
            onPressIcon={toggleEyeNewPass}
          />
          <AppText
            style={{ alignSelf: 'flex-end', marginRight: THEME.MARGIN.LOW }}
          >
            {t('Password Strength:')}{' '}
            <AppText style={{ color: passwordStrength?.color }}>
              {t(passwordStrength?.strength)}
            </AppText>
          </AppText>
          <View style={{ marginVertical: THEME.MARGIN.NORMAL }}>
            {validationErrors.map((item: any, index) => (
              <PrimaryCheckbox
                key={item?.id}
                disabled
                title={t(item?.error)}
                checked={Boolean(item?.checked)}
                onCheckColor={THEME.COLORS.primary}
              />
            ))}
          </View>
          <View style={{ flex: 1 }} />
          <PrimaryButton
            style={{ marginBottom: RF(40) }}
            disabled={validationErrors.some((error: any) => !error?.checked)}
            onPress={() => onConfirm(otpId, newPassword)}
            title={t('Confirm')}
          />
        </View>
      )}
    </>
  );
}

export default ResetPassword;
