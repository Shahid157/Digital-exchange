import React, { useEffect, useState } from 'react';
import { ICONS } from 'assets/images/icons';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import ROUTE_NAMES from 'routes/RouteNames';
import AppText from 'shared/components/AppText';
import PrimaryButton from 'shared/components/PrimaryButton';
import { GenericNavigation } from 'shared/models/types';
import { setFirstTime } from 'shared/store/reducers/settingsReducer';
import { GLOBAL_STYLE, THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

function Startup(props?: GenericNavigation) {
  const dispatch = useDispatch();

  const [termsCheck, setTermsCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [newsCheck, setNewsCheck] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!modalVisible);
  const { t, i18n } = useTranslation(['all']);
  const Languages = ['ENG', 'ESP'];
  const [language, setLanguage] = useState(Languages[1]);
  const languageCurrent = i18n.language;

  const onPressLogin = () => {
    dispatch(setFirstTime(false));
    // @ts-ignore
    props?.navigation?.replace(ROUTE_NAMES.SIGN_IN);
  };

  const onContinue = () => {
    toggleModal();
    props?.navigation?.navigate(ROUTE_NAMES.ONBOARDING_SIGNUP);
  };

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

  const onSelectLanguage = (item: string) => {
    setLanguage(item);
    switchLanguage(item);
  };

  const switchLanguage = async (lang: any) => {
    if (lang == 'ENG') {
      i18n.changeLanguage('en');
      AsyncStorage.setItem('language', 'en');
    } else {
      i18n.changeLanguage('es');
      AsyncStorage.setItem('language', 'es');
    }
  };
  const onGetStarted = () => {
    props?.navigation?.navigate(ROUTE_NAMES.TERMS_AND_CONDITIONS);
  };
  return (
    <View style={GLOBAL_STYLE.MAIN}>
      <View style={styles.langContainer}>
        {Languages.map((i: string, index: any) => (
          <TouchableOpacity
            key={index}
            onPress={() => onSelectLanguage(i)}
            style={[
              styles.langButton,
              {
                backgroundColor:
                  language == i ? THEME.COLORS.secondaryYellow : 'black',
              },
            ]}
          >
            <AppText
              style={[
                styles.langText,
                { color: language == i ? 'black' : THEME.COLORS.white },
              ]}
            >
              {i}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.subContainer1}>
        <FastImage
          source={ICONS.MAIN_LOGO}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.mainLogo}
        />
      </View>
      <View style={styles.viewStyle}>
        <AppText title semiBold color={THEME.COLORS.mainLogoTitleColor}>
          BUSINESS
        </AppText>
        <AppText title semiBold color={THEME.COLORS.primary}>
          {' SHOP'}
        </AppText>
      </View>

      <View style={styles.subContainer2}>
        <AppText medium h4 style={{ textAlign: 'center', marginTop: RF(40) }}>
          {t('Welcome to the best crypto exchange in', { ns: ['all'] })}{' '}
          <AppText h4 semiBold color={THEME.COLORS.primary}>
            LATAM
          </AppText>
        </AppText>

        <View>
          <PrimaryButton
            title={t('Get Started', { ns: ['all'] })}
            onPress={onGetStarted}
          />
          <AppText medium h4 style={{ textAlign: 'center' }}>
            {t('Already have an account?', { ns: ['all'] })}{' '}
            <AppText
              onPress={onPressLogin}
              style={{ textDecorationLine: 'underline' }}
              h4
              semiBold
              color={THEME.COLORS.primary}
            >
              {t('sign_in', { ns: ['all'] })}
            </AppText>
          </AppText>
        </View>
      </View>
    </View>
  );
}

export default Startup;
