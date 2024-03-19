import React from 'react';
import { View } from 'react-native';
import AppHeader from 'shared/components/AppHeader';
import { useTranslation } from 'react-i18next';
import ProfileItem from 'shared/components/ProfileItem';
import ROUTE_NAMES from 'routes/RouteNames';
import { Icons } from 'shared/components/AnyIcon';
import { GenericNavigation } from '../types';
import { THEME } from '../../../../shared/theme';

function LegalInformation(props: GenericNavigation) {
  const { t, i18n } = useTranslation(['all']);
  const navToScreen = (screen: string) => props?.navigation?.navigate(screen);

  return (
    <View style={{ flex: 1, backgroundColor: THEME.COLORS.primaryBackground }}>
      <AppHeader title={t('Legal')} leftIcon="back" />
      <ProfileItem
        icon="document-text-outline"
        iconType={Icons.Ionicons}
        title={t('TermsAndConditions', { ns: ['all'] })}
        onPress={() => navToScreen(ROUTE_NAMES.TERMS_AND_CONDITIONS_MAIN)}
      />
      <ProfileItem
        icon="shield-checkmark-outline"
        iconType={Icons.Ionicons}
        title={t('PrivacyPolicy', { ns: ['all'] })}
        onPress={() => navToScreen(ROUTE_NAMES.PRIVACY_POLICY)}
      />
    </View>
  );
}

export default LegalInformation;
