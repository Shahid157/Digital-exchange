import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import ROUTE_NAMES from 'routes/RouteNames';
import FastImage from 'react-native-fast-image';
import { ICONS } from 'assets/images/icons';
import AppText from '../../../shared/components/AppText';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import PrimaryCheckboxV2 from '../../../shared/components/PrimaryCheckboxV2';
import { GenericNavigation } from '../../../shared/models/types';
import { THEME } from '../../../shared/theme';
import { RF } from '../../../shared/theme/responsive';
import styles from './styles';
import {
  TermsAndConditionsEN,
  TermsAndConditionsES,
} from '../../../shared/constants/AppConstants';

function TermsAndConditions(props: GenericNavigation) {
  const [termsCheck, setTermsCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [newsCheck, setNewsCheck] = useState(false);

  const { t, i18n } = useTranslation(['all']);
  const languageCurrent = i18n.language;

  const onContinue = () => {
    props?.navigation?.navigate(ROUTE_NAMES.ONBOARDING_SIGNUP);
  };
  return (
    <View style={styles.main}>
      <View
        style={{
          flex: 0.4,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AppText
          secondaryTitle
          semiBold
          style={{ alignSelf: 'center', marginBottom: RF(10) }}
          color={THEME.COLORS.secondaryYellow}
        >
          {t('TermsAndConditions', { ns: ['all'] })}
        </AppText>
        <FastImage
          source={ICONS.MAIN_BS_LOGO}
          resizeMode={FastImage.resizeMode.contain}
          style={[styles.mainLogo]}
        />
      </View>
      <View
        style={{
          flex: 0.4,
          borderRadius: THEME.RADIUS.BOX,
          backgroundColor: THEME.COLORS.secondaryBackground,
          padding: THEME.PADDING.LOW,
          marginVertical: THEME.PADDING.LOW,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator
          indicatorStyle="white"
          contentContainerStyle={{
            paddingBottom: THEME.PADDING.VERYHIGH,
          }}
        >
          <AppText>
            {languageCurrent === 'es'
              ? TermsAndConditionsES
              : TermsAndConditionsEN}
          </AppText>
        </ScrollView>
      </View>
      {/* <Divider /> */}
      <View
        style={{
          marginVertical: RF(10),
          flex: 0.25,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: THEME.RADIUS.BOX,

          backgroundColor: THEME.COLORS.secondaryBackground,
        }}
      >
        <PrimaryCheckboxV2
          checked={termsCheck}
          setChecked={setTermsCheck}
          title={t('I have read and accept the Terms & Conditions.')}
        />
        <PrimaryCheckboxV2
          checked={ageCheck}
          setChecked={setAgeCheck}
          title={t('I Confirm that I’m 18 years or above.')}
        />
        <PrimaryCheckboxV2
          checked={newsCheck}
          setChecked={setNewsCheck}
          title={t('I want to receive news and promotions from Business Shop.')}
        />
      </View>

      <View style={{ flex: 0.1, marginBottom: RF(10) }}>
        <PrimaryButton
          disabled={!termsCheck || !ageCheck || !newsCheck}
          title={t('AcceptTermsAndConditions', { ns: ['all'] })}
          onPress={onContinue}
          buttonStyle={{
            marginTop: RF(10),
          }}
        />
      </View>
    </View>
  );
}

export default TermsAndConditions;
