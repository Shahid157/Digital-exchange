/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
import Clipboard from '@react-native-clipboard/clipboard';
import moment from 'moment';
import zxcvbn from 'zxcvbn';
import { Dimensions, Linking, Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Toast, { BaseToast } from 'react-native-toast-message';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import { passwordValidations } from 'shared/constants/AppConstants';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import {
  AZTEC_TICKER,
  DBSP_TICKER,
} from '../store/slices/aztc-deposits/aztc-deposits.types';

export const convertSizeToBytes = (size: string): number => {
  const units: { [key: string]: number } = {
    B: 1,
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
    TB: 1024 * 1024 * 1024 * 1024,
  };

  const [value, unit] = size.split(' ');
  const numericValue = parseFloat(value);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(numericValue) || !units.hasOwnProperty(unit)) {
    throw new Error('Invalid size format');
  }

  return numericValue * units[unit];
};

export const getWidth = () => Dimensions.get('window').width;

export const getFixedAmount = (amount: number, dPlaces: number = 6) => {
  let amountP = amount;
  if (typeof amountP !== 'number') {
    amountP = Number(amountP);
  }
  if (amountP) {
    return amountP?.toFixed(amount > 10 ? 2 : dPlaces);
  }
  return '0.00';
};

export const openExternalLink = async (link: string) => {
  try {
    const supported = await Linking.canOpenURL(link);
    if (supported) {
      await Linking.openURL(link);
    }
  } catch (error) {
    // do nothing
  }
};

export const getNormalizedError = (err: any) =>
  err?.response?.data?.message ||
  err?.data?.message ||
  err?.message ||
  'Request Failed!';

export const handleImageUpload = async (
  type?: 'camera' | 'gallery',
  setData?: any,
  onError?: any
) => {
  try {
    let response: any;
    if (type === 'gallery') {
      response = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: false,
        width: 300,
        height: 400,
        // forceJpg: Platform.OS === "ios",
        waitAnimationEnd: false,
      });
    } else if (type === 'camera') {
      response = await ImagePicker.openCamera({
        mediaType: 'photo',
        cropping: false,
        width: 300,
        height: 400,
        // forceJpg: Platform.OS === "ios",
        waitAnimationEnd: false,
      });
    }

    const ext = response?.path?.split('/');
    const fileName = ext[ext?.length - 1];
    setData({
      uri:
        Platform.OS === 'android'
          ? response?.path
          : response?.path.replace('file://', ''),
      size: response?.size,
      name: fileName,
      type: response?.mime,
    });
  } catch (error) {
    const err = getNormalizedError(error);
    onError(err);
  }
};
export function GetNetworkName(network: string) {
  network = network.toUpperCase();
  if (network === 'BTC') {
    return 'Bitcoin';
  }
  if (network === 'ETH') {
    return 'Ethereum (ERC20)';
  }
  if (network === 'BSC') {
    return 'Binance Smart Chain (BEP20)';
  }
  if (network === 'TRX') {
    return 'Tron (TRC20)';
  }
  if (network === 'MATIC') {
    return 'Polgon (MATIC)';
  }
  return network;
}

export function GetMethodName(method: string) {
  method = method.toUpperCase();
  if (method === 'BTC') {
    return 'Bitcoin';
  }
  if (method === 'ETH') {
    return 'Ethereum (ERC20)';
  }
  if (method === 'BSC') {
    return 'Binance Smart Chain (BEP20)';
  }
  if (method === 'TRX') {
    return 'Tron (TRC20)';
  }
  if (method === 'MATIC') {
    return 'Polgon (MATIC)';
  }
  return method;
}

export const dateFormateAPM = (date: any) =>
  moment(date).format('DD MMMM, YYYY | HH:mm A');

export const dateFormate = (date: any, format = 'YYYY-MM-DD') =>
  moment(date).format(format);
export const dateFormateTableDeatils = (date: any, format = 'DD-MMM-YYYY') =>
  moment(date).format(format);
export const ISO8601dateFormate = (date: any) => moment(date);

export const copyToClipboard = (string: string | undefined) => {
  Clipboard.setString(String(string));
  Toast.show({
    text1: 'Copied to Clipboard',
    type: 'success',
  });
};
export const amountPercentage = (val1: string, val2: string) =>
  ((Number(val1) / Number(val2)) * 100).toFixed(2);
export const transformToCamelCase = (inputString: string) => {
  const words = inputString.split(' ');
  const transformedWords = words.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return transformedWords.join('');
};

export const camelCaseToNormalWord = (camelCaseWord: string) => {
  // Find all capital letters preceded by a lowercase letter
  const words = camelCaseWord.replace(/([a-z])([A-Z])/g, '$1 $2');
  // Capitalize the first letter of the result
  return words.charAt(0).toUpperCase() + words.slice(1);
};

export const ToastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      text2NumberOfLines={2}
      style={{
        borderLeftWidth: 0,
        paddingHorizontal: 15,
        backgroundColor: THEME.COLORS.secondaryBackground,
        width: '90%',
        height: RF(70),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: THEME.RADIUS.BOX,
      }}
      text1Style={{
        fontSize: THEME.FONTS.SIZE.XSMALL,
        fontFamily: THEME.FONTS.TYPE.MEDIUM,
        fontWeight: '500',
        color: THEME.COLORS.sharpGreen,
      }}
      text2Style={{
        fontSize: THEME.FONTS.SIZE.XXSMALL,
        fontFamily: THEME.FONTS.TYPE.MEDIUM,
        fontWeight: '400',
        color: THEME.COLORS.textGrey,
      }}
      renderLeadingIcon={() => (
        <AnyIcon
          type={Icons.MaterialCommunityIcons}
          name="shield-alert-outline"
          size={20}
          color={THEME.COLORS.sharpGreen}
        />
      )}
    />
  ),

  error: (props: any) => (
    <BaseToast
      {...props}
      text2NumberOfLines={2}
      style={{
        borderLeftWidth: 0,
        paddingHorizontal: 15,

        backgroundColor: THEME.COLORS.secondaryBackground,
        width: '90%',
        height: RF(70),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: THEME.RADIUS.BOX,
      }}
      text1Style={{
        fontSize: THEME.FONTS.SIZE.XSMALL,
        fontFamily: THEME.FONTS.TYPE.MEDIUM,
        fontWeight: '500',
        color: THEME.COLORS.errorRed,
      }}
      text2Style={{
        fontSize: THEME.FONTS.SIZE.XXSMALL,
        fontFamily: THEME.FONTS.TYPE.MEDIUM,
        fontWeight: '400',
        color: THEME.COLORS.textGrey,
      }}
      renderLeadingIcon={() => (
        <AnyIcon
          type={Icons.MaterialCommunityIcons}
          name="shield-alert-outline"
          size={30}
          color={THEME.COLORS.errorRed}
        />
      )}
    />
  ),

  info: (props: any) => (
    <BaseToast
      {...props}
      text2NumberOfLines={2}
      style={{
        borderLeftWidth: 0,
        paddingHorizontal: 15,
        backgroundColor: THEME.COLORS.secondaryBackground,
        width: '90%',
        height: RF(70),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: THEME.RADIUS.BOX,
      }}
      text1Style={{
        fontSize: THEME.FONTS.SIZE.XSMALL,
        fontFamily: THEME.FONTS.TYPE.MEDIUM,
        fontWeight: '500',
        color: THEME.COLORS.lightBlue,
      }}
      text2Style={{
        fontSize: THEME.FONTS.SIZE.XXSMALL,
        fontFamily: THEME.FONTS.TYPE.MEDIUM,
        fontWeight: '400',
        color: THEME.COLORS.textGrey,
      }}
      renderLeadingIcon={() => (
        <AnyIcon
          type={Icons.MaterialCommunityIcons}
          name="shield-alert-outline"
          size={20}
          color={THEME.COLORS.lightBlue}
        />
      )}
    />
  ),
};

export const validatePassword = (password: any) => {
  const updatedErrors = [...passwordValidations];

  // Minimum 8 Characters
  updatedErrors[0].checked = password?.length >= 8;

  // Contains 1 uppercase letter
  updatedErrors[1].checked = /[A-Z]/.test(password);

  // Contains 1 lowercase letter
  updatedErrors[2].checked = /[a-z]/.test(password);

  // Contains 1 number
  updatedErrors[3].checked = /[0-9]/.test(password);

  // Contains 1 symbol
  updatedErrors[4].checked = /[!@#$%^&*.+?_]/.test(password);

  return updatedErrors;
};
export const checkPasswordStrength = (password: string) => {
  const strengthResult = zxcvbn(password);
  const { score } = strengthResult;

  let strength = '';
  let color = '';

  if (score === 0) {
    strength = 'Weak';
    color = 'red';
  } else if (score === 1) {
    strength = 'Fair';
    color = 'orange';
  } else if (score === 2) {
    strength = 'Good';
    color = 'yellow';
  } else if (score === 3) {
    strength = 'Strong';
    color = 'green';
  } else if (score === 4) {
    strength = 'Excellent';
    color = 'blue';
  }

  return {
    strength,
    color,
  };
};

export const formatAssetAmmount = (
  amount: number | null | undefined,
  isInputSpecial?: boolean
) => {
  if (isInputSpecial) {
    return amount?.toFixed(3);
  }
  if (!amount) return '0.00';
  if (amount < 1.2) {
    return amount?.toFixed(6);
  }

  return amount?.toFixed(2);
};

export const formatObject = (text: string) => {
  const keyValuePairs = text.slice(1, -1).split(',');

  // Initialize an empty object to store the extracted values
  const extractedObject: Record<string, any> = {};

  // Loop through key-value pairs
  keyValuePairs.forEach((pair) => {
    const [key, value] = pair.split(':').map((item) => item.trim());

    // Remove any leading/trailing whitespace and quotes from value
    const sanitizedValue = value.replace(/^['"](.+)['"]$/, '$1');

    // Assign key-value pair to extracted object
    extractedObject[key] = sanitizedValue;
  });
  return extractedObject;
};

export const toast = (text1: string, text2: string, type: string) => {
  Toast.show({
    text1,
    text2,
    type,
  });
};

export const generateBoxShadowStyle = (
  xOffset: number,
  yOffset: number,
  shadowColorIos: string,
  shadowOpacity: number,
  shadowRadius: number,
  elevation: number,
  shadowColorAndroid: string
) => {
  if (Platform.OS === 'ios') {
    return {
      shadowColor: shadowColorIos,
      shadowOffset: { width: xOffset, height: yOffset },
      shadowOpacity,
      shadowRadius,
    };
  }
  if (Platform.OS === 'android') {
    return {
      elevation,
      shadowColor: shadowColorAndroid,
    };
  }
};

export const handleUploadPdf = async (returnFile: any, onError: any) => {
  try {
    const res = await DocumentPicker.pickSingle({
      type: DocumentPicker.types.pdf,
    });

    returnFile({
      name: res.name,
      type: res.type,
      uri: res.uri,
      size: res.size,
    });
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      onError('Canceled from document picker');
    } else {
      onError(`Unknown Error: ${JSON.stringify(err)}`);
    }
  }
};

export function capitalFistStringLetter(str1: string) {
  const str = str1.toString();
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getNameForTicker(ticker?: string) {
  switch (ticker?.toUpperCase()) {
    case 'BTC':
      return 'Bitcoin';
    case 'ETH':
      return 'Ethereum';
    case 'XMR':
      return 'Monero';
    case 'DAI':
      return 'DAI';
    case 'BUSD':
      return 'Binance USD';
    case 'USDT':
      return 'Tether USDT';
    case 'BNB':
      return 'Binance coin';
    case 'BSP':
      return 'BSP';
    case AZTEC_TICKER.toUpperCase():
      return 'Azteca';
    case DBSP_TICKER.toUpperCase():
      return 'Dollar BSP';
    case 'USD':
      return 'USD';
    default:
      return '';
  }
}
