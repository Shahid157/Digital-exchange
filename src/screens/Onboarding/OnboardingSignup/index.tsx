import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ICONS } from 'assets/images/icons';
import { Formik } from 'formik';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import AppInput from 'shared/components/AppInput';
import AppText from 'shared/components/AppText';
import OnboardingButton from 'shared/components/OnboardingButton';
import ProgressBar from 'shared/components/ProgressBar';
import { COLORS } from 'shared/constants/theme';
import { GenericNavigation } from 'shared/models/types';
import { RootState } from 'shared/store';
import { GLOBAL_STYLE, THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import ROUTE_NAMES from 'routes/RouteNames';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Icons } from 'shared/components/AnyIcon';
import { useTranslation } from 'react-i18next';
import { setUser } from 'shared/store/slices/userSignUp/userSignUp.Slice';
import * as Yup from 'yup';

function OnboardingSignup(props: GenericNavigation) {
  const [date, setDate] = useState<Date>('');
  const [open, setOpen] = useState(false);
  const [isFocused4, setisFocused4] = useState(false);
  const [isFocused5, setisFocused5] = useState(false);
  const [isFocused6, setisFocused6] = useState(false);
  const { t, i18n } = useTranslation(['all']);
  const [ageRestriction, setAgeRestriction] = useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.userSignUp);
  const initialValues = {
    firstName: __DEV__ ? user?.name : '',
    lastName: __DEV__ ? user?.lastName : '',
    birthDate: __DEV__ ? user?.birthDate : '',
  };
  const firstNameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);
  const dobRef = useRef<TextInput>(null);

  const handleData = (values: any) => {
    if (!date) {
      Toast.show({
        text1: t('Failed'),
        text2: t('Enter DOB'),
        type: 'error',
      });
    } else if (moment().diff(date, 'years') < 17) {
      Toast.show({
        text1: t('Failed'),
        text2: t('DOB cannot be less than 18 years'),
        type: 'error',
      });
    } else {
      dispatch(
        setUser({
          name: values.firstName,
          lastName: values.lastName,
          birthDate: date,
        })
      );
      props?.navigation?.navigate(ROUTE_NAMES.ONBOARDING_EMAIL, {
        firstName: values.firstName,
        lastName: values.lastName,
        dob: date,
      });
    }
  };
  const handleDateChange = (selectedDate: Date) => {
    const currentDate: any = selectedDate || date;
    if (moment().diff(currentDate, 'years') < 18) {
      setAgeRestriction(true);
      Toast.show({
        text1: t('Failed'),
        text2: t('DOB cannot be less than 18 years'),
        type: 'error',
      });
      return;
    }
    setAgeRestriction(false);
    setDate(currentDate);
  };
  const signupVS = Yup.object().shape({
    firstName: Yup.string()
      .min(2, t('First Name must be at least 2 characters long'))
      .required(t('enterFirstName')),
    lastName: Yup.string()
      .min(2, t('Last Name must be at least 2 characters long'))
      .trim()
      .required(t('enterLastName')),
  });
  const defaultDate = user?.birthDate || date;

  return (
    <View style={GLOBAL_STYLE.MAIN}>
      <FastImage
        source={ICONS.APP_LOGO}
        style={{ alignSelf: 'center', width: RF(140), height: RF(140) }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <ProgressBar
        progressBarStyle={{ margin: THEME.MARGIN.NORMAL }}
        percentage={25}
      />
      <AppText medium h1>
        {t('Enter Personal Details')}
      </AppText>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleData(values)}
        validationSchema={signupVS}
      >
        {({ errors, touched, handleChange, handleSubmit, values }: any) => (
          <>
            <Animatable.View animation="fadeInUpBig" duration={1000}>
              <AppInput
                ref={firstNameRef}
                onFocus={() => setisFocused4(true)}
                onBlur={() => setisFocused4(false)}
                inputStyle={isFocused4 ? styles.inputActive : null}
                label={t('First Name')}
                autoCapitalize="words"
                placeholder={t('Enter First Name')}
                leftIconType={Icons.Feather}
                leftIconColor={THEME.COLORS.primary}
                onChangeText={handleChange('firstName')}
                inputMode="text"
                value={values.firstName}
                error={
                  errors.firstName && touched.firstName && errors.firstName
                }
                onSubmitEditing={() => lastNameRef.current?.focus()}
              />
              <AppInput
                ref={lastNameRef}
                onFocus={() => setisFocused5(true)}
                onBlur={() => setisFocused5(false)}
                inputStyle={isFocused5 ? styles.inputActive : null}
                label={t('Last Name')}
                autoCapitalize="words"
                placeholder={t('Enter Last Name')}
                leftIconType={Icons.Feather}
                leftIconColor={THEME.COLORS.primary}
                onChangeText={handleChange('lastName')}
                value={values.lastName}
                error={errors.lastName && touched.lastName && errors.lastName}
                onSubmitEditing={() => dobRef.current?.focus()}
              />
              <AppInput
                ref={dobRef}
                editable={false}
                onPress={() => setOpen(true)}
                onFocus={() => setisFocused6(true)}
                onBlur={() => setisFocused6(false)}
                inputStyle={isFocused6 ? styles.inputActive : null}
                label={t('Date of Birth (D.O.B.)')}
                autoCapitalize="none"
                placeholder={
                  date ? moment(date).format('MM/DD/YYYY') : t('Select DOB')
                }
                leftIconType={Icons.Feather}
                leftIconColor={THEME.COLORS.primary}
                value={date ? moment(date).format('MM/DD/YYYY') : ''}
              />
            </Animatable.View>
            <View style={{ flex: 1 }} />
            <OnboardingButton
              style={{ marginBottom: RF(20) }}
              disabled={ageRestriction}
              title={t('Next')}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>

      <DatePicker
        modal
        locale={i18n.language}
        title={t('Select Date')}
        cancelText={t('Cancel')}
        confirmText={t('Confirm')}
        mode="date"
        open={open}
        date={defaultDate || moment().subtract(18, 'years').toDate()}
        onConfirm={(date) => {
          setOpen(false);
          handleDateChange(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputActive: {
    borderColor: COLORS.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default OnboardingSignup;
