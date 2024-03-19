/* eslint-disable import/prefer-default-export */
import Snackbar from 'react-native-snackbar';
import { COLORS } from 'shared/constants/theme';

export const getError = (error) => {
  const errorText = Object.values(error?.response?.data?.errors);
  if (errorText?.length > 0) {
    if (Array.isArray(errorText[0]) && errorText[0]?.length > 0) {
      Snackbar.show({
        text: `Error: ${JSON.stringify(errorText[0][0])}`,
        backgroundColor: COLORS.danger,
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      Snackbar.show({
        text: `Error: ${JSON.stringify(errorText[0])}`,
        backgroundColor: COLORS.danger,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  } else {
    Snackbar.show({
      text: `Error: ${JSON.stringify(error?.message)}`,
      backgroundColor: COLORS.danger,
      duration: Snackbar.LENGTH_SHORT,
    });
  }
};
