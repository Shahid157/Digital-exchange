import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native-gesture-handler';
import { COLORS, FONTS } from 'shared/constants/theme';
import { DashboardTabsEnum } from '..';

interface Props {
  activeTab: DashboardTabsEnum;
  setActiveTab: (tab: DashboardTabsEnum) => void;
}

const Tabs = [
  DashboardTabsEnum.DEPOSITS,
  DashboardTabsEnum.WITHDRAWALS,
  DashboardTabsEnum.SWAPS,
];

export function DashboardTabs({ activeTab, setActiveTab }: Props) {
  const { t } = useTranslation(['all']);
  const { colors } = useTheme();

  return (
    <FlatList
      contentContainerStyle={styles.listsView}
      data={Tabs}
      renderItem={({ item }) => {
        const active = item === activeTab;
        const borderColor = active ? COLORS.success : COLORS.secondary;
        const iconColor = active ? COLORS.warning : colors.text;
        return (
          <TouchableOpacity
            key={item}
            style={[styles.itemTouchable, { borderColor }]}
            onPress={() => setActiveTab(item)}
          >
            <Text style={[styles.touchableText, { color: iconColor }]}>
              {t(item)}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  listsView: {
    marginBottom: 15,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginRight: 30,
    marginLeft: 5,
  },
  itemTouchable: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomWidth: 2,
    marginRight: 10,
    marginLeft: 10,
    paddingBottom: 5,
  },
  touchableText: {
    ...FONTS.font,
    ...FONTS.fontMedium,
  },
  favoriteIcon: {
    marginRight: 5,
  },
});
