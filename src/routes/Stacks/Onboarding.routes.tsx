/* eslint-disable react/jsx-props-no-spreading */
import { useTheme } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import ROUTE_NAMES from 'routes/RouteNames';
import OnboardingEmail from 'screens/Onboarding/OnboardingEmail';
import OnboardingOTP from 'screens/Onboarding/OnboardingOTP';
import OnboardingPassword from 'screens/Onboarding/OnboardingPassword';
import OnboardingSignup from 'screens/Onboarding/OnboardingSignup';
import Startup from 'screens/Onboarding/Startup';
import AlmostDone from 'screens/Onboarding/AlmostDone';
import TermsAndConditions from 'screens/Auth/TermsAndConditions';

function MyStatusBar({ ...props }) {
  return (
    <View style={[styles.statusBar]}>
      <StatusBar translucent {...props} />
    </View>
  );
}

const Stack = createStackNavigator();

function OnboardingStack() {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.container]}>
      <MyStatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <Stack.Navigator
        initialRouteName={ROUTE_NAMES.SIGN_IN}
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name={ROUTE_NAMES.START_UP} component={Startup} />
        <Stack.Screen
          name={ROUTE_NAMES.TERMS_AND_CONDITIONS}
          component={TermsAndConditions}
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
      </Stack.Navigator>
    </SafeAreaView>
  );
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: STATUSBAR_HEIGHT,
  },
  statusBar: {
    height: 0,
  },
});
export default OnboardingStack;
