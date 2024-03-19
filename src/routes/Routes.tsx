import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useSelector } from 'react-redux';
import { COLORS } from '../shared/constants/theme';
import themeContext from '../shared/constants/themeContext';
import { ToastConfig } from '../shared/services/helper.service';
import { RootState } from '../shared/store';
import { RF } from '../shared/theme/responsive';
import AuthStack from './Stacks/Auth.routes';
import MainStack from './Stacks/MainStack.routes';
import OnboardingStack from './Stacks/Onboarding.routes';

function Routes() {
  const { user } = useSelector((state: RootState) => state.session);

  const { firstTime } = useSelector((state: RootState) => state.settings);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const authContext = React.useMemo(
    () => ({
      setDarkTheme: () => {
        setIsDarkTheme(true);
      },
      setLightTheme: () => {
        setIsDarkTheme(false);
      },
    }),
    []
  );

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      background: 'black',
      title: COLORS.title,
      card: COLORS.card,
      text: COLORS.text,
      borderColor: COLORS.border,
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      background: 'black',
      title: COLORS.darkTitle,
      card: COLORS.darkCard,
      text: COLORS.darkText,
      borderColor: COLORS.darkBorder,
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  return (
    <>
      <themeContext.Provider value={authContext}>
        <StatusBar backgroundColor="black" />
        <NavigationContainer theme={theme}>
          {firstTime ? (
            <OnboardingStack />
          ) : user ? (
            <MainStack />
          ) : (
            <AuthStack />
          )}
        </NavigationContainer>
      </themeContext.Provider>
      <Toast config={ToastConfig} position="top" topOffset={RF(50)} />
    </>
  );
}
export default Routes;
