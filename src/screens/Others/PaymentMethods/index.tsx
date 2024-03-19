import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import AppHeader from 'shared/components/AppHeader';
import PaymentAccountDetails from 'shared/components/payment/paymentAccountDetails';
import PaymentCardDetails from 'shared/components/payment/paymentCardDetails';
import PaymentSaveCards from 'shared/components/payment/paymentSaveCards';
import { COLORS, FONTS } from 'shared/constants/theme';

function PaymentMethod() {
  const { colors } = useTheme();

  function AccountDetails() {
    return <PaymentAccountDetails />;
  }
  function CardDetails() {
    return <PaymentCardDetails />;
  }
  function SavedCards() {
    return <PaymentSaveCards />;
  }

  const renderScene = SceneMap({
    AccountDetails,
    CardDetails,
    SavedCards,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'AccountDetails', title: 'Account Details' },
    { key: 'CardDetails', title: 'Card Details' },
    { key: 'SavedCards', title: 'Saved Cards' },
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{
        height: 3,
        backgroundColor: COLORS.primary,
      }}
      style={{
        backgroundColor: colors.background,
        elevation: 0,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        marginBottom: 15,
        paddingHorizontal: 15,
      }}
      indicatorContainerStyle={{
        marginHorizontal: 15,
      }}
      tabStyle={{
        width: 'auto',
      }}
      renderLabel={({ focused, route }) => (
        <Text
          style={{
            ...FONTS.font,
            ...FONTS.fontMedium,
            color: focused ? colors.text : colors.text,
          }}
        >
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <AppHeader title="Payment Method" leftIcon="back" />
      <View style={{ flex: 1 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PaymentMethod;
