/* eslint-disable no-useless-escape */
/* eslint-disable prefer-regex-literals */
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

export const phoneRegex = RegExp(
  /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
);
export const emailRegex = RegExp(
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
);
export const clabeRegex = /^\d{18}$/;
export const nonSpaceRegex = RegExp(/^\S*$/);
const passwordRegex = RegExp(
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
);

const useValidationYupT = () => {
  const { t } = useTranslation();

  const loginVS = () =>
    Yup.object().shape({
      username: Yup.string()
        .min(5, t('saaaaaaaaaaaaaaaa'))
        .trim()
        .required(t('Enter Username or Email')),
      password: Yup.string().required(t('Enter Your Password')),
    });

  const signupVS = () =>
    Yup.object().shape({
      username: Yup.string()
        .required(t('enterUsername'))
        .min(2, t('Username must be at least 5 characters long'))
        .max(50)
        .trim(),
      email: Yup.string()
        .matches(emailRegex, t('validation.invalidEmail'))
        .email(t('validation.validEmail'))
        .required(t('validation.enterEmail')),
      firstName: Yup.string()
        .min(2)
        .trim()
        .required(t('validation.enterFirstName')),
      lastName: Yup.string()
        .min(2)
        .trim()
        .required(t('validation.enterLastName')),
      password: Yup.string()
        .required(t('validation.enterPassword'))
        .min(8)
        .max(33)
        .matches(passwordRegex, t('validation.invalidPassword'))
        .label(t('validation.passwordLabel'))
        .trim(),
      confirmPassword: Yup.string()
        .required(t('validation.enterConfirmPassword'))
        .oneOf([Yup.ref('password'), null], t('validation.passwordsDoNotMatch'))
        .min(8)
        .max(33)
        .label(t('validation.confirmPasswordLabel'))
        .trim(),
    });

  const passwordResetVS = () =>
    Yup.object().shape({
      password: Yup.string()
        .required(t('validation.enterPassword'))
        .min(8)
        .max(33)
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          t('validation.invalidPassword')
        )
        .label(t('validation.passwordLabel'))
        .trim(),
      confirmPassword: Yup.string()
        .required(t('validation.enterConfirmPassword'))
        .oneOf([Yup.ref('password'), null], t('validation.passwordsDoNotMatch'))
        .min(8)
        .max(33)
        .label(t('validation.confirmPasswordLabel'))
        .trim(),
    });

  return {
    loginVS,
    signupVS,
    passwordResetVS,
  };
};

export default useValidationYupT;
