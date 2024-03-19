/* eslint-disable prefer-regex-literals */
/* eslint-disable no-useless-escape */
import * as Yup from 'yup';

export const emailRegex = RegExp(
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
);

export const nonSpaceRegex = RegExp(/^\S*$/);

const emailVS = Yup.object().shape({
  username: Yup.string().required('Enter Your Username').min(2).max(50).trim(),
  email: Yup.string()
    .matches(emailRegex, 'Invalid Email Address')
    .email('Please Enter a Valid Email')
    .required('Enter Your Email'),
});

const signupVS = Yup.object().shape({
  firstName: Yup.string().min(2).trim().required('Enter Your First Name'),
  lastName: Yup.string().min(2).trim().required('Enter Your Last Name'),
});

export { emailVS, signupVS };
