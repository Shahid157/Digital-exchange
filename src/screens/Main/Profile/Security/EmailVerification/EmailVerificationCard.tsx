import { useSelector } from 'react-redux';
import { RootState } from 'shared/store';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import styles from 'screens/Main/Profile/Security/AuthenticatorAppVerification/styles';
import AppHeader from 'shared/components/AppHeader';
import FastImage from 'react-native-fast-image';
import { ICONS } from 'assets/images/icons';
import { RF } from 'shared/theme/responsive';
import AppText from 'shared/components/AppText';
import { THEME } from 'shared/theme';
import { GenericNavigation } from '../../types';

function EmailAppVerification(props?: GenericNavigation) {
  const { user } = useSelector((state: RootState) => state.session);
  const hasEmail = user?.twoFactorAuthenticationMethods?.some(
    (method: any) => method.type === 'email'
  );
  const { t } = useTranslation(['all']);
  return (
    <View style={styles.mainContainer}>
      <AppHeader
        title={t('Email Verification', { ns: ['all'] })}
        leftIcon="back"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {hasEmail && (
          <TouchableOpacity
            // onPress={() => navigation.navigate(ROUTE_NAMES.EMAIL_VERIFICATION)}
            style={stylesMain.mainContainer}
          >
            <FastImage
              source={ICONS.EMAIL}
              style={stylesMain.iconMail}
              tintColor={THEME.COLORS.secondaryYellow}
            />
            <View
              style={{
                flex: 1,
              }}
            >
              <AppText h4>{t('Email', { ns: ['all'] })}</AppText>
              <AppText h6>{t('configured', { ns: ['all'] })}</AppText>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

export default EmailAppVerification;

const stylesMain = StyleSheet.create({
  mainContainer: {
    borderRadius: THEME.RADIUS.SMALLBOX,
    marginVertical: RF(5),
    flexDirection: 'row',
    alignItems: 'center',
    padding: RF(10),
  },
  iconMail: {
    height: RF(30),
    width: RF(30),
    marginRight: RF(10),
    color: 'white',
  },
});
