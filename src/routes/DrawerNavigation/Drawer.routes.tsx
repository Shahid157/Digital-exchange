import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Sidebar from 'shared/components/Sidebar';
import ROUTE_NAMES from 'routes/RouteNames';
import BottomNavigation from '../BottomNavigation/BottomNavigation';

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      useLegacyImplementation={false}
      drawerContent={() => <Sidebar />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name={ROUTE_NAMES.BOTTOM_NAVIGATION}
        component={BottomNavigation}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
