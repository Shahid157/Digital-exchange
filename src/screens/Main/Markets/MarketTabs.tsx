import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RF } from 'shared/theme/responsive';
import { COLORS, FONTS } from '../../../shared/constants/theme';
import { RoutesNamesEnum, Tabs } from './Markets.types';

interface Props {
  activeTab: RoutesNamesEnum;
  setActiveTab: (tab: RoutesNamesEnum) => void;
}

export default function MarketTabs({ activeTab, setActiveTab }: Props) {
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
            {item === RoutesNamesEnum.FAVORITES && (
              <FontAwesome
                style={styles.favoriteIcon}
                color={iconColor}
                size={16}
                name="star-o"
              />
            )}
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
    marginBottom: RF(15),
    paddingHorizontal: RF(10),
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTouchable: {
    flex: 1,
    padding: 5,

    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    // marginRight: 10,
    // marginLeft: 10,
    // paddingBottom: 5,
  },
  touchableText: {
    ...FONTS.fontSm,
  },
  favoriteIcon: {
    marginRight: 5,
  },
});
