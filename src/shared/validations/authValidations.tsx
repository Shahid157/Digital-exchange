/* eslint-disable prefer-regex-literals */
/* eslint-disable no-useless-escape */
import * as Yup from 'yup';

export const phoneRegex = RegExp(
  /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
);
export const emailRegex = RegExp(
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
);

export const nonSpaceRegex = RegExp(/^\S*$/);
export const passwordRegex = RegExp(
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
);
const loginVS = Yup.object().shape({
  username: Yup.string().min(5).trim().required('Enter Your Email'),
  password: Yup.string().required('Enter Your Password'),
});

const signupVS = Yup.object().shape({
  username: Yup.string().required('Enter Your Username').min(2).max(50).trim(),
  email: Yup.string()
    .matches(emailRegex, 'Invalid Email Address')
    .email('Please Enter a Valid Email')
    .required('Enter Your Email'),
  firstName: Yup.string().min(2).trim().required('Enter Your First Name'),
  lastName: Yup.string().min(2).trim().required('Enter Your Last Name'),

  password: Yup.string()
    .required()
    .min(8)
    .max(33)
    .matches(
      passwordRegex,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character'
    )
    .label('Password')
    .trim(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Password do not match')
    .min(8)
    .max(33)
    .label('Confirm Password')
    .trim(),
});

const passwordResetVS = Yup.object().shape({
  password: Yup.string()
    .required()
    .min(8)
    .max(33)
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character'
    )
    .label('Password')
    .trim(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Password do not match')
    .min(8)
    .max(33)
    .label('Confirm Password')
    .trim(),
});

export { loginVS, signupVS, passwordResetVS };
