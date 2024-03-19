import React from 'react';
import { View } from 'react-native';
import AppHeader from 'shared/components/AppHeader';
import { useTranslation } from 'react-i18next';
import styles from './styles';

function CurrencyScreen() {
  const { t } = useTranslation(['all']);
  return (
    <View style={styles.mainContainer}>
      <AppHeader title={t('Currency', { ns: ['all'] })} leftIcon="back" />
    </View>
  );
}

export default CurrencyScreen;
