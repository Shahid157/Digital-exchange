import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { ICONS } from 'assets/images/icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import ROUTE_NAMES from 'routes/RouteNames';
import Markets from 'screens/Main/Markets/Markets';
import Profile from 'screens/Main/Profile';
import PortfolioScreen from 'screens/Main/Portfolio';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import Entypo from 'react-native-vector-icons/Entypo';
import Home from '../../screens/Main/Home';
import KycRestrictionBottomSheet from '../../screens/Main/Home/components/KycRestrictionBottomSheet';
import { useAppSelector } from '../../shared/hooks/redux';
import CenterBottomNavigationSheet from './CenterBottomNavigationSheet';

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  const user = useAppSelector((state) => state.session.user);
  const navigation = useNavigation();

  const [centerBottomOpen, setCenterBottomOpen] = useState(false);

  const [kycRestrictionOpen, setKycRestrictionOpen] = useState(false);

  const renderTabBarIcon = (routeName: string) =>
    function ({ focused }: any) {
      let icon = ICONS.HOME;
      const tintColor = focused
        ? THEME.COLORS.secondaryYellow
        : THEME.COLORS.white;
      switch (routeName) {
        case 'Home':
          icon = ICONS.HOME;
          break;
        case 'Market':
          icon = ICONS.MARKET;
          break;
        case 'Portfolio':
          icon = ICONS.WALLET;
          break;
        case 'Profile':
          icon = ICONS.PROFILE;
          break;
      }
      return (
        <FastImage
          source={icon}
          resizeMode={FastImage.resizeMode.contain}
          style={[styles.mainIcon]}
          tintColor={tintColor}
        />
      );
    };

  const centerCircle = (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        setCenterBottomOpen(true);
      }}
    >
      <LinearGradient
        start={{ x: 0, y: 0.04 }}
        end={{ x: 0, y: 1 }}
        colors={['rgba(53, 55, 55, 1)', 'rgba(25, 28, 27, 1)']}
        style={styles.btnCircleUp}
      >
        <Entypo
          disabled
          name="plus"
          size={30}
          color={THEME.COLORS.secondaryYellow}
        />
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'rgba(38, 38, 38, 1)',
          },
        }}
      >
        <Tab.Screen
          name={ROUTE_NAMES.HOME}
          component={Home}
          options={{
            title: '',
            tabBarIcon: renderTabBarIcon(ROUTE_NAMES.HOME),
          }}
        />

        <Tab.Screen
          name={ROUTE_NAMES.MARKET}
          component={Markets}
          options={{
            title: '',
            tabBarIcon: renderTabBarIcon(ROUTE_NAMES.MARKET),
          }}
        />

        <Tab.Screen
          name="CENTER_BOTTOM_SHEET"
          component={Markets}
          options={{
            title: '',
            tabBarIcon: ({ focused }) => centerCircle,
          }}
        />

        <Tab.Screen
          name={ROUTE_NAMES.PORTFOLIO}
          component={PortfolioScreen}
          options={{
            title: '',
            tabBarIcon: renderTabBarIcon(ROUTE_NAMES.PORTFOLIO),
          }}
        />

        <Tab.Screen
          name={ROUTE_NAMES.PROFILE}
          component={Profile}
          options={{
            title: '',
            tabBarIcon: renderTabBarIcon(ROUTE_NAMES.PROFILE),
          }}
        />
      </Tab.Navigator>

      <CenterBottomNavigationSheet
        open={centerBottomOpen}
        setOpen={setCenterBottomOpen}
        onOptionSeleted={(screenName) => {
          if (user?.kycVerification?.status !== 'verified') {
            setKycRestrictionOpen(true);
            return;
          }
          // @ts-ignore
          navigation?.navigate(screenName);
        }}
      />

      <KycRestrictionBottomSheet
        open={kycRestrictionOpen}
        setOpen={setKycRestrictionOpen}
        onCompleteKyc={() => {
          setKycRestrictionOpen(false);
          // @ts-ignore
          navigation?.navigate(ROUTE_NAMES.COMPLETE_KYC);
        }}
      />
    </>
  );
}

export default BottomNavigation;

const styles = StyleSheet.create({
  btnCircleUp: {
    width: RF(52),
    height: RF(52),
    borderRadius: THEME.RADIUS.ROUND,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.COLORS.iconGrey,
    bottom: RF(15),
  },
  mainIcon: {
    marginTop: RF(10),
    height: RF(22),
    width: RF(22),
  },
});
