import { NavigationProp, RouteProp } from '@react-navigation/core';
import { Coin, Currency, Transaction } from '__generated__/graphql';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import {
  Staking,
  StakingPolicy,
} from 'shared/store/slices/stakings/staking.types';
import { CoinWithCurrency } from 'shared/types';
import { EntryWithEarns } from './DailyEarnHistory/hooks/useEntriesWithEarns';
import { AztcDepositPaymentMethod } from '../../../shared/store/slices/aztc-deposits/aztc-deposits.types';

export interface GenericNavigation {
  navigation?: NavigationProp<any>;
  route?: RouteProp<any, any>;
}
export enum MFAMethods {
  email = 'email',
  sms = 'sms',
  authenticator = 'authenticator',
}
export interface KycRestrictionBottomSheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onCompleteKyc: () => void;
}
export interface BalancesCardProps {
  stakedAmount: number;
  coin: any;
}

export interface DepositBottomSheetProps {
  open: boolean;
  coin?: Coin;
  amount: number;
  staking?: Staking;
  setOpen: (open: boolean) => void;
  onDeposit: () => void;
}
export interface DepositSectionProps {
  amount: number;
  amountStr: string;
  coin?: Coin;
  staking?: Staking;
  setAmount: (amount: number) => void;
  setAmountStr: (amount: string) => void;
  onDeposit: () => void;
}
export interface PnlCardProps {
  pnls: { last24: number; last30: number };
  coin?: Coin;
  staking?: Staking;
}
export interface RowDataProps {
  label: string;
  value: string;
}
export interface SummaryCardProps {
  amount: number;
  coin: any;
  staking?: Staking;
}
export interface VerticalDataProps {
  label: string;
  value: string;
  style?: StyleProp<ViewStyle>;
}

export interface HistoryDetailsBottomSheetProps {
  open: boolean;
  entry?: EntryWithEarns;
  setOpen: (open: boolean) => void;
  onChangePolicy: (id: string, policy: StakingPolicy) => void;
}
export interface RowDataProps {
  label: string;
  value: string;
  loading?: boolean;
  colorValue?: string;
}
export interface TextInputProps {
  coin: any;
  inputStyle?: StyleProp<ViewStyle>;
  error?: string | undefined;
  textInputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  icon?: string;
  onPressIcon?: () => void;
  eye?: string;
  iconColor?: string;
  label?: string;
  leftIcon?: string;
  leftIconType?: any;
  leftIconColor?: any;
  iconType?: any;
  onPressLeftIcon?: () => any;
  showRightText?: boolean;
  onPressRightText?: () => void;
  rightText?: string;
  onPress?: () => void;
  hideDivider?: boolean;
  hideChevron?: boolean;
  parentContainerStyle?: StyleProp<ViewStyle>;
  name?: string;
  required?: boolean;
  coinDisable?: boolean;
  isSpecial?: boolean;
}

export interface DepositBottomSheetTopProps {
  open: boolean;
  profit?: number;
  coin?: Coin;
  amount: number;
  setOpen: (open: boolean) => void;
  onDeposit: () => void;
}

export interface RowDataTopProps {
  label: string;
  value: string;
}
export interface CurrencySwitchButtonProps {
  currency?: Currency;
  onChangeCurrency: () => void;
}

export interface IntervalSelectProps {
  interval: string;
  intervals: string[];
  onIntervalChange: (interval: string) => void;
}

export interface SwapCoinsSelectionCardProps {
  from?: Currency;
  to?: Currency;
  dataSet: string;
  timeFrame: string;
  stats?: any;
  setFrom: (currency: Currency) => void;
  setTo: (currency: Currency) => void;
  setDataSet: (dataSet: string) => void;
  setTimeFrame: (timeFrame: string) => void;
}

export interface SwapStatChartCardProps {
  stats?: any;
  currency?: Currency;
}

export interface SwapStatsSummaryCardProps {
  stats: any;
  loading: boolean;
}
export interface DepositStatusBottomSheetProps {
  sheetIndex?: number;
  setSheetIndex: (sheetIndex: number) => void;
  onClose?: any;
}

export interface DepositBottomShtProps {
  sheetIndex?: number;
  setSheetIndex: (sheetIndex: number) => void;
  setNetwork: (item: string) => void;
  networks?: any;
}
export interface DepositMethodBottomShtProps {
  sheetIndex?: number;
  depositMethods: string[];
  setSheetIndex: (sheetIndex: number) => void;
  setMethod: (item: string) => void;
}

export interface AssetSelectionModalProps {
  visible?: boolean;
  toggleModal: (val: any) => void;
  onSelectAsset: (asset: CoinWithCurrency) => void;
  setCloseModal?: () => void;
  otherSelectedCoin?: any;
}

export interface AssetBottomSheetProps {
  sheetIndex?: number;
  otherSelectedCoin?: CoinWithCurrency;
  assets: CoinWithCurrency[];
  searchText?: string;
  coinLoading?: boolean;
  setSheetIndex: (sheetIndex: number) => void;
  onChange?: (index: number) => void;
  setSearchText: (search: string) => void;
  onSelectAsset: (asset: CoinWithCurrency) => void;
  onClose?: () => void;
}
export interface CoinSelectionModalProps {
  visible?: boolean;
  toggleModal: (val: any) => void;
  onSelectAsset: (asset: Currency) => void;
  setCloseModal: () => void;
  otherSelectedCoin?: Currency;
}
export interface CoinBottomSheetProps {
  sheetIndex?: number;
  setSheetIndex: (sheetIndex: number) => void;
  otherSelectedCoin?: Currency;
  currencies: Currency[];
  onChange?: (index: number) => void;
  searchText?: string;
  setSearchText: (search: string) => void;
  onSelectAsset: (asset: Currency) => void;
  onClose: () => void;
}

export interface SwapCardProps {
  title: string;
  coinItem: any;
  toggleModal: () => void;
  value: any;
  rateLoading?: boolean;
  onChangeText?: (text: any) => void;
  handleMaxValue: (text: number) => void;
  titleValidator: string;
  coinBoxStyle?: StyleProp<ViewStyle>;
}

export interface SwapSuccessProps {
  successDetails?: Transaction;
  fromCoin?: CoinWithCurrency;
  toCoin?: CoinWithCurrency;
  fromAmount: number;
  toAmount: number;
  visible?: boolean;
  toggleModal: () => void;
  hideModalAndRedirect: () => void;
}
export interface SwapSuccessBottomSheetProps {
  sheetIndex?: number;
  setSheetIndex: (sheetIndex: number) => void;
  fromAmount?: string;
  fromCoin?: string;
  network: string;
  uri: string | null;
  onClose?: () => void;
  toAmount?: string;
  toCoin?: string;
  toCoinUri: string | null;
  coinNetwork: string;
}
export interface AssetAuthBottomSheetProps {
  sheetIndex?: number;
  setSheetIndex: (sheetIndex: number) => void;
  emailMethodAvailable?: boolean;
  smsMethodAvailable?: boolean;
  onPress?: () => void;
  onSmsPress?: () => void;
}

export interface AssetEmailOTPBottomSheetProps {
  sheetIndex?: number;
  setSheetIndex: (sheetIndex: number) => void;
  authenticatorMethodAvailable?: boolean;
  smsMethodAvailable?: boolean;
  onPress?: () => void;
  onAuthPress?: () => void;
}
export interface AssetSMSOTPBottomSheetProps {
  sheetIndex?: number;
  setSheetIndex: (sheetIndex: number) => void;
  onPress?: () => void;
  onCloseSMS?: () => void;
}
export interface SendSuccessModalProps {
  coin?: any;
  sentAmount?: any;
  recipient?: any;
  visible?: boolean;
  toggleModal?: () => void;
  hideModalAndRedirect?: () => void;
}
export interface SendAssetSuccessModalProps {
  coin?: any;
  sentAmount?: any;
  recipient?: any;
  index: number;
  setIndex: (arg: number) => void;
}

export interface SwapHistoryBottomSheetProps {
  sheetIndex?: number;
  setSheetIndex: (sheetIndex: number) => void;
  fromCoin?: any;
  onClose?: () => void;
  toCoin?: any;
  txDetails?: any;
  coin?: any;
  getStatusTranslation?: any;
  imageLoading?: boolean;
  handleImageLoaded?: () => void;
}
