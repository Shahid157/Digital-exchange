import { useNavigation, useTheme } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React, { useEffect, useRef } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import ROUTE_NAMES from 'routes/RouteNames';
import HelpDesk from 'screens/Main/Profile/HelpDesk';
import KnowYourCrypto from 'screens/Others/KnowYourCrypto';
import Messages from 'screens/Others/Messages';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import CompleteKYC from 'screens/Auth/CompleteKYC';
import ChooseCurrency from 'screens/Main/Home/ChooseCurrency';
import ExchangeCurrency from 'screens/Main/Home/ExchangeCurrency';
import SwapScreen from 'screens/Main/Home/ExchangeCurrency/SwapScreen';
import SendAssets from 'screens/Main/Home/SendAssets';
import SendAssetOther from 'screens/Main/Home/SendAssets/SendAssetOther';
import ReviewRequest from 'screens/Main/Home/SendAssets/ReviewRequest';
import DepositScreen from 'screens/Main/Home/DepositScreen';
import Accounts from 'screens/Main/Profile/Accounts';
import CurrencyScreen from 'screens/Main/Profile/CurrencyScreen';
import LegalInformation from 'screens/Main/Profile/LegalInformation';
import Notifications from 'screens/Main/Profile/Notifications';
import NotificationsDetails from 'screens/Main/Profile/NotificationsDetails';
import Security from 'screens/Main/Profile/Security';
import AuthenticatorAppVerification from 'screens/Main/Profile/Security/AuthenticatorAppVerification';
import AuthenticatorAppVerificationQr from 'screens/Main/Profile/Security/AuthenticatorAppVerificationQr';
import AuthenticatorOTP from 'screens/Main/Profile/Security/AuthenticatorOTP';
import EmailVerification from 'screens/Main/Profile/Security/EmailVerification';
import EmailVerificationOTP from 'screens/Main/Profile/Security/EmailVerificationOTP';
import PasswordVerification from 'screens/Main/Profile/Security/PasswordVerification';
import PhoneNumberVerification from 'screens/Main/Profile/Security/PhoneNumberVerification';
import PhoneVerificationOTP from 'screens/Main/Profile/Security/PhoneVerificationOTP';
import PaymentMethod from 'screens/Others/PaymentMethods';
import Rewards from 'screens/Others/Rewards';
import SearchCoin from 'screens/Others/SearchCoin';
import Settings from 'screens/Others/Settings';
import TwoFactorAuthentication from 'screens/Others/TwoFactorAuthentication';
import Verification from 'screens/Others/Verification';
import DailyEarns from 'screens/Main/Home/DailyEarns';
import DepositStatus from 'screens/Main/Home/DepositScreen/DepositStatus';
import WithdrawAssets from 'screens/Main/Home/WithdrawScreen/WithdrawAssets';
import WithdrawScreen from 'screens/Main/Home/WithdrawScreen';
import WithdrawReview from 'screens/Main/Home/WithdrawScreen/WithdrawReview';
import WithdrawStatus from 'screens/Main/Home/WithdrawScreen/WithdrawStatus';
import TransactionHistory from 'screens/Main/Home/TransactionHistory';
import MFASwitcher from 'scr../../screens/Main/MFASwitcher';
import AnalyticsView from 'screens/Main/Home/Dashboard/analytics/Analytics';
import SwapAnalytics from 'screens/Main/Home/Dashboard/analytics/SwapAnalytics';
import EmailAppVerification from 'screens/Main/Profile/Security/EmailVerification/EmailVerificationCard';
import BlockedFunds from 'screens/Main/Home/BlockedFunds';
import { AdminDashboard } from 'screens/Main/Home/Dashboard';
import DailyEarnHistory from 'screens/Main/Home/DailyEarnHistory';
import ReviewRequestWithDrawStaking from 'screens/Main/Home/DailyEarnHistory/WithdrawStaking';
import NotificationPopup from 'react-native-push-notification-popup';
import { ICONS } from 'assets/images/icons';
import { updateUserInfo } from 'shared/services/metamap.services';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/store';
import { LocalNotification } from 'shared/utils/pushNotificationsHelper';
import TermsAndConditions from 'screens/Main/Profile/LegalInformation/TermsAndConditions';
import PrivacyPolicy from 'screens/Main/Profile/LegalInformation/PrivacyPolicy';
import DepositLocalScreen from 'screens/Main/Home/DepositLocalScreen';
import DepositLocalSuccess from 'screens/Main/Home/DepositLocalScreen/DepositLocalSuccess';
import WithdrawAzteca from 'screens/Main/Home/WithdrawScreen/WithdrawAzteca';
import WithdrawAztcSuccessScreen from 'screens/Main/Home/WithdrawScreen/WithdrawAzteca/WithdrawAztcSuccessScreen';
import SwapLocalCurrency from 'screens/Main/Home/ExchangeCurrency/SwapLocalCurrency';
import DepositLocalAttachmentScreen from '../../screens/Main/Home/DepositLocalAttachmentScreen';
import DebugLabel from '../../shared/components/DebugLabel';
import CryptoSavings from '../../screens/Main/Home/CryptoSavings';
import BottomNavigation from '../BottomNavigation/BottomNavigation';
import { setWallet } from '../../shared/store/slices/wallets/wallets.slice';
import { useMainWallet } from '../../shared/graphql/wallets/useMainWallet';
import { useCurrencies } from '../../shared/graphql/currencies/useCurrencies';
import { setCurrencies } from '../../shared/store/slices/currencies/currencies.slice';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';

function MyStatusBar({ ...props }) {
  return (
    <View style={[styles.statusBar]}>
      <StatusBar translucent {...props} />
    </View>
  );
}

const Stack = createStackNavigator();

function MainStack() {
  const { colors } = useTheme();
  const theme = useTheme();
  const navigation = useNavigation();
  const popup = useRef<NotificationPopup>(null);

  const {
    onRefreshWalletSubscription: refreshWalletSubscription,
    onGoToVerifyKYCNeeded,
  } = useAppSelector((state) => state.oneTimeEvents);
  const { token } = useSelector((state: RootState) => state.session);
  const currencies = useCurrencies({ enableSubscription: true });
  const wallet = useMainWallet({ enableSubscription: true });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrencies(currencies.data?.currencies || []));
  }, [currencies.data]);

  useEffect(() => {
    dispatch(setWallet(wallet.data?.mainWallet || null));
  }, [wallet.data]);

  useEffect(() => {
    if (!refreshWalletSubscription) {
      return;
    }
    wallet.refetch();
    currencies.refetch();
  }, [refreshWalletSubscription]);

  useEffect(() => {
    if (!onGoToVerifyKYCNeeded) {
      return;
    }
    // @ts-ignore
    navigation.navigate(ROUTE_NAMES.COMPLETE_KYC);
  }, [onGoToVerifyKYCNeeded]);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        handleLocalNotification(remoteMessage);
      }
    );

    return unsubscribe;
  }, []);

  const handleLocalNotification = (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage
  ) => {
    try {
      LocalNotification(remoteMessage);
      popup.current!.show({
        // onPress: () => {},
        appIconSource: ICONS.MAIN_LOGO,
        appTitle: 'Business Shop',
        title: remoteMessage.notification!.title,
        body: remoteMessage.notification!.body,
        slideOutTime: 15000,
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (token) {
      // Fetch data initially
      updateUserInfo();

      // Fetch data every 3 minutes
      const interval = setInterval(
        () => {
          updateUserInfo();
        },
        3 * 60 * 1000
      );

      // Clean up the interval when the component unmounts or when the dependency array changes
      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <MyStatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <NotificationPopup ref={popup} />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name={ROUTE_NAMES.DRAWER} component={BottomNavigation} />
        <Stack.Screen
          name={ROUTE_NAMES.VERIFICATION}
          component={Verification}
        />
        <Stack.Screen
          name={ROUTE_NAMES.KNOW_YOUR_CRYPTO}
          component={KnowYourCrypto}
        />
        <Stack.Screen name={ROUTE_NAMES.SETTINGS} component={Settings} />
        <Stack.Screen
          name={ROUTE_NAMES.TWO_FACTOR_AUTHENTICATION}
          component={TwoFactorAuthentication}
        />
        <Stack.Screen name={ROUTE_NAMES.HELP_DESK} component={HelpDesk} />
        <Stack.Screen name={ROUTE_NAMES.MESSAGES} component={Messages} />
        <Stack.Screen
          name={ROUTE_NAMES.PAYMENT_METHODS}
          component={PaymentMethod}
        />
        <Stack.Screen name={ROUTE_NAMES.REWARDS} component={Rewards} />
        <Stack.Screen
          name={ROUTE_NAMES.NOTIFICATIONS}
          component={Notifications}
        />
        <Stack.Screen
          name={ROUTE_NAMES.NOTIFICATIONS_DETAILS}
          component={NotificationsDetails}
        />
        {/* <Stack.Screen name={ROUTE_NAMES.PROFIT_LOSS} component={ProfitLoss} /> */}
        <Stack.Screen name={ROUTE_NAMES.SEARCH_COIN} component={SearchCoin} />
        <Stack.Screen name={ROUTE_NAMES.OPT_SWITCHER} component={MFASwitcher} />

        {/* Profile */}
        <Stack.Screen name={ROUTE_NAMES.ACCOUNTS} component={Accounts} />
        <Stack.Screen
          name={ROUTE_NAMES.CURRENCY_SCREEN}
          component={CurrencyScreen}
        />
        <Stack.Screen name={ROUTE_NAMES.SECURITY} component={Security} />
        <Stack.Screen
          name={ROUTE_NAMES.LEGAL_INFORMATION}
          component={LegalInformation}
        />
        <Stack.Screen
          name={ROUTE_NAMES.TERMS_AND_CONDITIONS_MAIN}
          component={TermsAndConditions}
        />
        <Stack.Screen
          name={ROUTE_NAMES.PRIVACY_POLICY}
          component={PrivacyPolicy}
        />
        <Stack.Screen
          name={ROUTE_NAMES.AUTHENTICATOR_APP_VERIFICATION}
          component={AuthenticatorAppVerification}
        />
        <Stack.Screen
          name={ROUTE_NAMES.AUTHENTICATOR_APP_VERIFICATION_QR}
          component={AuthenticatorAppVerificationQr}
        />
        <Stack.Screen
          name={ROUTE_NAMES.AUTHENTICATOR_OTP}
          component={AuthenticatorOTP}
        />
        <Stack.Screen
          name={ROUTE_NAMES.EMAIL_VERIFICATION}
          component={EmailVerification}
        />
        <Stack.Screen
          name={ROUTE_NAMES.EMAIL_VERIFICATON_OTP}
          component={EmailVerificationOTP}
        />
        <Stack.Screen
          name={ROUTE_NAMES.PHONE_VERIFICATON_OTP}
          component={PhoneVerificationOTP}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={ROUTE_NAMES.PHONE_NUMBER_VERIFICATION}
          component={PhoneNumberVerification}
        />
        <Stack.Screen
          name={ROUTE_NAMES.PASSWORD_VERIFICATION}
          component={PasswordVerification}
        />
        <Stack.Screen
          name={ROUTE_NAMES.CHOOSE_CURRENCY}
          component={ChooseCurrency}
        />
        <Stack.Screen
          name={ROUTE_NAMES.EXCHANGE_CURRENCY}
          component={ExchangeCurrency}
        />
        <Stack.Screen name={ROUTE_NAMES.SWAP_SCREEN} component={SwapScreen} />
        <Stack.Screen
          name={ROUTE_NAMES.SWAP_LOCAL_CURRENCY}
          component={SwapLocalCurrency}
        />
        <Stack.Screen name={ROUTE_NAMES.SEND_ASSETS} component={SendAssets} />
        <Stack.Screen
          name={ROUTE_NAMES.SEND_ASSET_OTHER}
          component={SendAssetOther}
        />
        <Stack.Screen
          name={ROUTE_NAMES.REVIEW_REQUEST}
          component={ReviewRequest}
        />
        <Stack.Screen
          name={ROUTE_NAMES.DEPOSIT_SCREEN}
          component={DepositScreen}
        />
        <Stack.Screen
          name={ROUTE_NAMES.DEPOSIT_LOCAL_SCREEN}
          component={DepositLocalScreen}
        />
        <Stack.Screen
          name={ROUTE_NAMES.DEPOSIT_LOCAL_ATTACHMENT_SCREEN}
          component={DepositLocalAttachmentScreen}
        />
        <Stack.Screen
          name={ROUTE_NAMES.DEPOSIT_SUCCESS}
          component={DepositLocalSuccess}
        />
        <Stack.Screen
          name={ROUTE_NAMES.DEPOSIT_STATUS}
          component={DepositStatus}
        />
        <Stack.Screen
          name={ROUTE_NAMES.WITHDRAW_ASSETS}
          component={WithdrawAssets}
        />
        <Stack.Screen
          name={ROUTE_NAMES.WITHDRAW_SCREEN}
          component={WithdrawScreen}
        />
        <Stack.Screen
          name={ROUTE_NAMES.WITHDRAW_AZTCA}
          component={WithdrawAzteca}
        />
        <Stack.Screen
          name={ROUTE_NAMES.WITHDRAW_AZTC_SUCCESS}
          component={WithdrawAztcSuccessScreen}
        />
        <Stack.Screen
          name={ROUTE_NAMES.WITHDRAW_REVIEW}
          component={WithdrawReview}
        />

        <Stack.Screen
          name={ROUTE_NAMES.WITHDRAW_STATUS}
          component={WithdrawStatus}
        />
        <Stack.Screen
          name={ROUTE_NAMES.TRANSACTIONS_HISTORY}
          component={TransactionHistory}
        />
        <Stack.Screen name={ROUTE_NAMES.DAILY_EARNS} component={DailyEarns} />
        <Stack.Screen
          name={ROUTE_NAMES.DAILY_EARNS_HISTORY}
          component={DailyEarnHistory}
        />
        <Stack.Screen
          name={ROUTE_NAMES.DAILY_EARNS_HISTORY_REVIEW_WI}
          component={ReviewRequestWithDrawStaking}
        />
        <Stack.Screen
          name={ROUTE_NAMES.CRYPTO_BANK}
          component={CryptoSavings}
        />
        <Stack.Screen
          name={ROUTE_NAMES.ADMIN_DASHBOARD}
          component={AdminDashboard}
        />
        <Stack.Screen name={ROUTE_NAMES.COMPLETE_KYC} component={CompleteKYC} />
        <Stack.Screen name={ROUTE_NAMES.ANALYTICS} component={AnalyticsView} />
        <Stack.Screen name={ROUTE_NAMES.SWAP_STATS} component={SwapAnalytics} />
        <Stack.Screen
          name={ROUTE_NAMES.AUTHENTICATOR_EMAIL}
          component={EmailAppVerification}
        />
        <Stack.Screen
          name={ROUTE_NAMES.BLOCKED_FUNDS}
          component={BlockedFunds}
        />
      </Stack.Navigator>
      <NotificationPopup ref={popup} />
      <DebugLabel />
    </View>
  );
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: STATUSBAR_HEIGHT,
  },
  statusBar: {
    height: 0,
  },
});
export default MainStack;
