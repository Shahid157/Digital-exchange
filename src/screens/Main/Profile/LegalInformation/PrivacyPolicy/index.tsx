import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import { ICONS } from 'assets/images/icons';
import FastImage from 'react-native-fast-image';
import AppText from 'shared/components/AppText';
import { GenericNavigation } from 'shared/models/types';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import AppHeader from 'shared/components/AppHeader';
import styles from './styles';
import {
  PrivacyEN,
  PrivacyES,
} from '../../../../../shared/constants/AppConstants';

function PrivacyPolicy(props: GenericNavigation) {
  const { t, i18n } = useTranslation(['all']);
  const Languages = ['ENG', 'ESP'];
  const [language, setLanguage] = useState(Languages[1]);
  const languageCurrent = i18n.language;

  useEffect(() => {
    const getLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('language');
        if (storedLanguage) {
          if (storedLanguage == 'es') {
            setLanguage('ESP');
          } else {
            setLanguage('ENG');
          }
        }
      } catch (error) {}
    };

    getLanguage();
  }, []);

  return (
    <View style={styles.main}>
      <AppHeader leftIcon="back" headerStyle={{ borderColor: 'transparent' }} />
      <View style={styles.upper}>
        <AppText
          secondaryTitle
          semiBold
          style={{ alignSelf: 'center', marginBottom: RF(10) }}
          color={THEME.COLORS.secondaryYellow}
        >
          {t('PrivacyPolicy', { ns: ['all'] })}
        </AppText>
        <FastImage
          source={ICONS.PRIVACY_POLICY}
          resizeMode={FastImage.resizeMode.contain}
          style={[styles.mainLogo]}
        />
      </View>
      <View style={styles.lower}>
        <ScrollView
          showsVerticalScrollIndicator
          indicatorStyle="white"
          contentContainerStyle={{
            paddingBottom: THEME.PADDING.VERYHIGH,
          }}
        >
          <AppText>{languageCurrent === 'es' ? PrivacyES : PrivacyEN}</AppText>
        </ScrollView>
      </View>
    </View>
  );
}

export default PrivacyPolicy;
