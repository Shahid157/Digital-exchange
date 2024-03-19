import React, { useEffect, useState } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ROUTE_NAMES from 'routes/RouteNames';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import AppText from 'shared/components/AppText';
import PrimaryButton from 'shared/components/PrimaryButton';
import { THEME } from 'shared/theme';
import { useSelector } from 'react-redux';
import AppHeader from 'shared/components/AppHeader';
import AppLoader from 'shared/components/AppLoader';
import { RootState } from 'shared/store';
import { useTranslation } from 'react-i18next';
import { copyToClipboard } from 'shared/services/helper.service';
import { useMfaGetAuthenticatorQuery } from 'shared/store/slices/mfa/mfa-otp.api';
import styles from './styles';
import { GenericNavigation } from '../../types';

function AuthenticatorAppVerificationQr(props?: GenericNavigation) {
  const { user } = useSelector((state: RootState) => state.session);
  const hasAuthenticator = user?.twoFactorAuthenticationMethods?.some(
    (method: any) => method.type === 'authenticator'
  );
  const [qrCodeData, setQRCodeData] = useState('');
  const [qrSecretKey, setQrSecretKey] = useState('');
  const { t } = useTranslation(['all']);
  const { data, isLoading } = useMfaGetAuthenticatorQuery();

  useEffect(() => {
    // Fetch the QR code data using the API
    if (!hasAuthenticator && data) {
      const qrCodeData = data?.result.qrCode;
      const qrSecret = data?.result.secretKey;
      setQRCodeData(qrCodeData);
      setQrSecretKey(qrSecret);
    }
  }, [data]);

  return (
    <View style={styles.mainContainer}>
      <AppHeader
        title={t('Authenticator App Verification', { ns: ['all'] })}
        leftIcon="back"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginVertical: THEME.MARGIN.LOW }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AnyIcon
              type={Icons.MaterialCommunityIcons}
              name="numeric-2-circle"
              size={30}
              color={THEME.COLORS.secondaryYellow}
              style={{ marginRight: THEME.MARGIN.LOW }}
            />
            <AppText semiBold color={THEME.COLORS.secondaryYellow}>
              {t('Open Authenticator App', { ns: ['all'] })}
            </AppText>
          </View>
          <AppText
            style={{ alignSelf: 'center', width: '79%', marginBottom: 80 }}
          >
            {t(
              'Open GA and scan the QR code below or enter the setup key to Authenticator App',
              { ns: ['all'] }
            )}
          </AppText>
          {isLoading ? (
            <AppLoader isVisible />
          ) : (
            qrCodeData && (
              <>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 50,
                  }}
                >
                  <QRCode
                    size={140}
                    logo={{ uri: qrCodeData }}
                    logoSize={140}
                    logoBackgroundColor="transparent"
                  />
                </View>

                <AppText
                  style={[
                    styles.gaCodeHd,
                    { alignSelf: 'center', width: '79%' },
                  ]}
                >
                  {t('Setup Key', { ns: ['all'] })}
                </AppText>
                <TouchableOpacity
                  onPress={() => copyToClipboard(qrSecretKey)}
                  style={styles.gaCode}
                >
                  <AppText regular color={THEME.COLORS.secondaryYellow}>
                    {qrSecretKey}
                  </AppText>
                  <AnyIcon
                    type={Icons.Feather}
                    onPress={() => copyToClipboard(qrSecretKey)}
                    name="copy"
                    size={14}
                    color={THEME.COLORS.white}
                    style={{
                      alignSelf: 'center',
                      marginRight: THEME.MARGIN.LOW,
                    }}
                  />
                </TouchableOpacity>
              </>
            )
          )}
        </View>
        {isLoading ? (
          <AppLoader isVisible />
        ) : (
          <PrimaryButton
            title={t('Next', { ns: ['all'] })}
            small
            style={{ marginVertical: THEME.MARGIN.LOW }}
            onPress={() =>
              props?.navigation?.navigate(ROUTE_NAMES.AUTHENTICATOR_OTP)
            }
          />
        )}
      </ScrollView>
    </View>
  );
}

export default AuthenticatorAppVerificationQr;
