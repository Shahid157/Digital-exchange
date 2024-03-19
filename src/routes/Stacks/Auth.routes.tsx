import { useTheme } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import ROUTE_NAMES from 'routes/RouteNames';
import ChangePassword from 'screens/Auth/ChangePassword';
import SignIn from 'screens/Auth/Signin';
import LoginOTPVerify from 'screens/Auth/LoginOTPVerify';
import CompleteKYC from 'screens/Auth/CompleteKYC';
import OnboardingSignup from 'screens/Onboarding/OnboardingSignup';
import OnboardingEmail from 'screens/Onboarding/OnboardingEmail';
import OnboardingOTP from 'screens/Onboarding/OnboardingOTP';
import OnboardingPassword from 'screens/Onboarding/OnboardingPassword';
import AlmostDone from 'screens/Onboarding/AlmostDone';
import { useSelector } from 'react-redux';
import OTPVerification from 'screens/Auth/OTPVerification';
import ResetPassword from 'screens/Main/Profile/Security/ResetPassword';
import TermsAndConditions from 'screens/Auth/TermsAndConditions';
import DebugLabel from '../../shared/components/DebugLabel';
import { RootState } from '../../shared/store';

function MyStatusBar({ ...props }) {
  return (
    <View style={[styles.statusBar]}>
      <StatusBar translucent {...props} />
    </View>
  );
}

const Stack = createStackNavigator();

function AuthStack() {
  const { colors } = useTheme();
  const { firstTime } = useSelector((state: RootState) => state.settings);
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <MyStatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <Stack.Navigator
        initialRouteName={
          firstTime ? ROUTE_NAMES.START_UP : ROUTE_NAMES.SIGN_IN
        }
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name={ROUTE_NAMES.SIGN_IN} component={SignIn} />
        <Stack.Screen
          name={ROUTE_NAMES.TERMS_AND_CONDITIONS}
          component={TermsAndConditions}
        />
        <Stack.Screen
          name={ROUTE_NAMES.LOGIN_OTP_VERIFY}
          component={LoginOTPVerify}
        />
        <Stack.Screen
          name={ROUTE_NAMES.ONBOARDING_SIGNUP}
          component={OnboardingSignup}
        />
        <Stack.Screen
          name={ROUTE_NAMES.ONBOARDING_EMAIL}
          component={OnboardingEmail}
        />

        <Stack.Screen
          name={ROUTE_NAMES.ONBOARDING_OTP}
          component={OnboardingOTP}
        />
        <Stack.Screen
          name={ROUTE_NAMES.ONBOARDING_PASSWORD}
          component={OnboardingPassword}
        />
        <Stack.Screen name={ROUTE_NAMES.ALMOST_DONE} component={AlmostDone} />

        <Stack.Screen
          name={ROUTE_NAMES.OTP_VERIFICATION}
          component={OTPVerification}
        />
        <Stack.Screen
          name={ROUTE_NAMES.CHANGE_PASSWORD}
          component={ChangePassword}
        />
        <Stack.Screen name={ROUTE_NAMES.COMPLETE_KYC} component={CompleteKYC} />
        <Stack.Screen
          name={ROUTE_NAMES.RESET_PASSWORD}
          component={ResetPassword}
        />
      </Stack.Navigator>

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
export default AuthStack;
