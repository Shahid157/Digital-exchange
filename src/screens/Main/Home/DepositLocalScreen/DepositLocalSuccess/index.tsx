import { ICONS } from 'assets/images/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, View, Image, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import ROUTE_NAMES from 'routes/RouteNames';
import AppHeader from 'shared/components/AppHeader';
import AppText from 'shared/components/AppText';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import PrimaryButton from 'shared/components/PrimaryButton';
import { useBackHandler } from '@react-native-community/hooks';
import { GenericNavigation } from '../../types';
import styles from './styles';
import { IMAGES } from '../../../../../assets/images';

function DepositLocalSuccess(props: GenericNavigation) {
  const { t } = useTranslation(['all']);

  useBackHandler(() => {
    props?.navigation?.navigate(ROUTE_NAMES.HOME);
    return true;
  });

  return (
    <SafeAreaView style={styles.mainContainer}>
      <AppHeader
        leftIconPress={() => props?.navigation?.navigate(ROUTE_NAMES.HOME)}
        leftIcon="back"
        title={t('Confirmation')}
      />

      <View style={{ flex: 1, marginHorizontal: THEME.MARGIN.NORMAL }}>
        <View style={styles.expectedTimeContainer}>
          <Image source={IMAGES.timeIcon} style={styles.timeIcon} />

          <View style={styles.confirmTransactionContainer}>
            <Text style={styles.confimingTransactionText}>
              {t('confirming_deposit')}
            </Text>

            <Text style={styles.twentyFourHoursText}>
              {t('confirming_withdrawal_txt')}
            </Text>
          </View>
        </View>

        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <AppText
            secondaryTitle
            style={{ marginVertical: THEME.MARGIN.NORMAL }}
            semiBold
          >
            {t('Deposit Confirmation')}
          </AppText>
          <FastImage
            source={ICONS.CIRCLE_CHECK}
            style={{ height: RF(100), width: RF(100) }}
          />
          <AppText
            h1
            semiBold
            color={THEME.COLORS.secondaryYellow}
            style={{
              width: '90%',
              textAlign: 'center',
              marginVertical: THEME.MARGIN.NORMAL,
            }}
          >
            {t('Your Transaction was Successful')}
          </AppText>
        </View>

        <PrimaryButton
          title={t('New Deposit')}
          onPress={() =>
            props?.navigation?.navigate(ROUTE_NAMES.CHOOSE_CURRENCY)
          }
        />
      </View>
    </SafeAreaView>
  );
}

export default DepositLocalSuccess;
