import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { COLORS, FONTS } from 'shared/constants/theme';
import HelpCreateTicket from 'shared/components/helpdesk/helpCreateTicket';
import HelpExisting from 'shared/components/helpdesk/helpExisting';
import AppHeader from 'shared/components/AppHeader';
import { useTranslation } from 'react-i18next';

function HelpDesk() {
  const { colors } = useTheme();
  const { t } = useTranslation(['all']);
  function CreateTicket() {
    return <HelpCreateTicket />;
  }
  function Existing() {
    return <HelpExisting />;
  }

  const renderScene = SceneMap({
    CreateTicket,
    Existing,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'CreateTicket', title: t('Create Ticket', { ns: ['all'] }) },
    { key: 'Existing', title: t('Existing', { ns: ['all'] }) },
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{
        height: 3,
        backgroundColor: COLORS.primary,
      }}
      style={{
        backgroundColor: colors.card,
        // elevation:0,
      }}
      renderLabel={({ focused, route }: any) => (
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
      <AppHeader title={t('Help Desk', { ns: ['all'] })} leftIcon="back" />
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

export default HelpDesk;
