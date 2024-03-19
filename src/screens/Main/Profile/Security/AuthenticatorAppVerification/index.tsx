import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ROUTE_NAMES from 'routes/RouteNames';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import AppText from 'shared/components/AppText';
import PrimaryButton from 'shared/components/PrimaryButton';
import { meApi } from 'shared/services/auth';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { Portal } from '@gorhom/portal';
import { ICONS } from 'assets/images/icons';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import AppHeader from 'shared/components/AppHeader';
import { RootState } from 'shared/store';
import { useTranslation } from 'react-i18next';
import { useMfaDeleteAuthenticatorMutation } from 'shared/store/slices/mfa/mfa-otp.api';
import AuthAppBottomSheet from './components/AuthAppBottomSheet';
import styles from './styles';
import { GenericNavigation } from '../../types';
import { setUser } from '../../../../../shared/store/slices/session/session.slice';

function AuthenticatorAppVerification(props?: GenericNavigation) {
  const { user } = useSelector((state: RootState) => state.session);
  const [mfaAuthDelete, mfaAuthResult] = useMfaDeleteAuthenticatorMutation();
  const hasAuthenticator = user?.twoFactorAuthenticationMethods?.some(
    (method: any) => method.type === 'authenticator'
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(0);
  const { t } = useTranslation(['all']);

  useEffect(() => {
    if (mfaAuthResult.isSuccess) {
      setOpen(0);
      onSuccessAuthDelete();
    }
    if (mfaAuthResult.isError) {
      Toast.show({
        text1: t('Failed', { ns: ['all'] }),
        text2: 'Error',
        type: 'error',
      });
    }
  }, [mfaAuthResult]);

  const onSuccessAuthDelete = async () => {
    try {
      const meResponse = await meApi();
      if (meResponse.status == 200 || meResponse.status == 201) {
        Toast.show({
          text1: t('Successful', { ns: ['all'] }),
          text2: t('Google Authenticator Removed Successfully!', {
            ns: ['all'],
          }),
          type: 'success',
        });
        dispatch(setUser(meResponse.data));
        // getQR();
      }
    } catch (error) {
      Toast.show({
        text1: t('Failed', { ns: ['all'] }),
        text2: 'Error',
        type: 'error',
      });
    }
  };
  const onCancel = () => setOpen(0);

  const deleteAuthenticatorVerification = () => {
    // MFA Auth Delete API
    mfaAuthDelete();
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <AppHeader
          title={t('Authenticator App Verification', { ns: ['all'] })}
          leftIcon="back"
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {hasAuthenticator ? (
            <View style={stylesMain.mainContainer}>
              <FastImage
                source={ICONS.GOOGLE_AUTHENTICATOR}
                style={{ height: RF(30), width: RF(30), marginRight: RF(10) }}
              />
              <View
                style={{
                  flex: 1,
                }}
              >
                <AppText h4>{t('Authenticator App', { ns: ['all'] })}</AppText>
                <AppText h6>{t('configured')}</AppText>
              </View>
              <AnyIcon
                type={Icons.Feather}
                size={18}
                color={THEME.COLORS.lightGrey}
                name="trash"
                onPress={() => {
                  setOpen(1);
                }}
              />
            </View>
          ) : (
            <>
              <AppText>
                {t(
                  'Google Authenticator generates dynamic passwords and it is similar to SMS dynamic verification. This verification code can be used for higher security in the process of log-in, withdrawal, and changing security settings.',
                  { ns: ['all'] }
                )}
                {`\n`}
              </AppText>

              <AppText>
                {t('Enable GA by following three simple steps', {
                  ns: ['all'],
                })}
              </AppText>
              <View style={{ marginVertical: THEME.MARGIN.LOW }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <AnyIcon
                    type={Icons.MaterialCommunityIcons}
                    name="numeric-1-circle"
                    size={30}
                    color={THEME.COLORS.secondaryYellow}
                    style={{ marginRight: THEME.MARGIN.LOW }}
                  />
                  <AppText semiBold color={THEME.COLORS.secondaryYellow}>
                    {t('Downlaod GA', { ns: ['all'] })}
                  </AppText>
                </View>
                <AppText style={{ alignSelf: 'center', width: '79%' }}>
                  {t(
                    "iOS users can log into App Store and search 'Authenticator' to download. Android users can log into App Store or directly search 'Google Authenticator' in your mobile browser to download.",
                    { ns: ['all'] }
                  )}
                </AppText>
              </View>
              <View
                style={{ marginVertical: THEME.MARGIN.LOW, marginBottom: 110 }}
              />
              <PrimaryButton
                title={t('Next', { ns: ['all'] })}
                small
                style={{ marginVertical: THEME.MARGIN.LOW }}
                onPress={() =>
                  props?.navigation?.navigate(
                    ROUTE_NAMES.AUTHENTICATOR_APP_VERIFICATION_QR
                  )
                }
              />
            </>
          )}
        </ScrollView>
      </View>
      <Portal>
        <AuthAppBottomSheet
          sheetIndex={open}
          setSheetIndex={setOpen}
          onCancelPress={onCancel}
          onDeletePress={deleteAuthenticatorVerification}
        />
      </Portal>
    </>
  );
}

export default AuthenticatorAppVerification;

const stylesMain = StyleSheet.create({
  mainContainer: {
    borderRadius: THEME.RADIUS.SMALLBOX,
    marginVertical: RF(5),
    flexDirection: 'row',
    alignItems: 'center',
    padding: RF(10),
  },
});
