import React from 'react';
import { View } from 'react-native';
import AppHeader from 'shared/components/AppHeader';
import AppText from 'shared/components/AppText';
import { GenericNavigation } from 'shared/models/types';
import { GLOBAL_STYLE, THEME } from 'shared/theme';

function NotificationsDetails(props: GenericNavigation) {
  const { item }: any = props?.route?.params;

  return (
    <View style={GLOBAL_STYLE.MAIN}>
      <AppHeader leftIcon="back" title=" " />
      <AppText style={{ marginTop: THEME.MARGIN.MID_LOW }} h1 medium>
        {item.title}
      </AppText>
      <AppText
        color={THEME.COLORS.textGrey}
        style={{ marginVertical: THEME.MARGIN.MID_LOW }}
        medium
      >
        {item.createdAt}
      </AppText>
      <AppText color={THEME.COLORS.textGrey} medium>
        {item.content}
      </AppText>
    </View>
  );
}

export default NotificationsDetails;
