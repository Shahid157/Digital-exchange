import { NavigationProp, RouteProp } from '@react-navigation/core';
import PhoneInput from 'react-native-phone-number-input';

export interface GenericNavigation {
  navigation?: NavigationProp<any>;
  route?: RouteProp<any, any>;
}
export interface SimpleTextInputProps {
  title: string;
  value: string;
  icon?: any;
  copyable?: boolean;
  hideIcon?: boolean;
}

export interface LanguageBottomSheetProps {
  sheetIndex?: number;
  setSheetIndex: (sheetIndex: number) => void;
  handleLoading?: boolean;
  onLanguageSheetClose?: () => void;
  switchLanguagePress?: () => void;
  LanguagesData?: any;
  onSelectLanguage?: any;
  language?: string;
}

export interface LogoutBottomSheetProps {
  sheetIndex?: number;
  setSheetIndex: (sheetIndex: number) => void;
  handleLoading?: boolean;
  onPress?: () => void;
  onCancelPress?: () => void;
}
export interface ProfileBottomSheetProps {
  sheetIndex?: number;
  setSheetIndex: (sheetIndex: number) => void;
  ImagePickerOptions?: any;
  selectImage?: any;
}
export interface ProfileViewBottomSheetProps {
  sheetIndex?: number;
  setSheetIndex: (sheetIndex: number) => void;
  userInfo?: any;
}
export interface AuthAppBottomSheetProps {
  onCancelPress?: () => void;
  onDeletePress?: () => void;
  sheetIndex?: number;
  setSheetIndex: (sheetIndex: number) => void;
}
export interface SecurityBottomSheetProps {
  onClosePress?: () => void;
  BiomatricStatus?: any;
  selectedBioMetricStatus?: string;
  onSelectBiomatricStatus?: any;
  sheetIndex?: number;
  setSheetIndex: (sheetIndex: number) => void;
}

export interface EmailOTPBottomSheetProps {
  sheetIndex?: number;
  setSheetIndex: (sheetIndex: number) => void;
  loading?: boolean;
  onPress?: () => void;
  navigation?: any;
}
export interface PasswordVerificationBottomSheetProps {
  sheetIndex?: number;
  setSheetIndex: (sheetIndex: number) => void;
}

export interface NumberBottomSheetProps {
  sheetIndex?: number;
  setSheetIndex: (sheetIndex: number) => void;
  crossHandlerPress?: () => void;
  onNextPress?: () => void;
  phoneNumberSnapPoint?: any;
  defaultValue?: string;
  loading?: boolean;
  onChangeText?: (text: any) => void;
  onChangeFormattedText?: (text: any) => void;
  phoneInputRef?: React.LegacyRef<PhoneInput>;
  navigation?: any;
}
export interface VerificationBottomSheetProps {
  sheetIndex?: number;
  setSheetIndex: (sheetIndex: number) => void;
  onCancelPress?: () => void;
  deleteSmsVerificationPress?: () => void;
}
export interface OTPBottomSheetProps {
  sheetIndex?: number;
  setSheetIndex: (sheetIndex: number) => void;
  loading?: boolean;
  onBottomSheetClose?: () => void;
  navigation?: any;
}
