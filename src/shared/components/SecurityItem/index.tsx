import { StyleSheet, TouchableOpacity } from 'react-native';

import React from 'react';

import { useNavigation } from '@react-navigation/native';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import AppText from 'shared/components/AppText';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import FastImage from 'react-native-fast-image';
import { ICONS } from 'assets/images/icons';
import { useTranslation } from 'react-i18next';

interface SecurityItemType {
  title: string;
  icon: string;
  iconType: string;
  navigate: string | never;
}
interface Props {
  index?: number;
  data: SecurityItemType;
}
function SecurityItem({ index, data }: Props) {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation(['all']);
  return (
    <TouchableOpacity
      key={index}
      onPress={() => navigation?.navigate(data?.navigate)}
      style={styles.mainContainer}
    >
      {data.title == 'Authenticator App Verification' ? (
        <FastImage
          source={ICONS.GOOGLE_AUTHENTICATOR}
          style={{ height: RF(20), width: RF(20), marginRight: RF(10) }}
        />
      ) : (
        <AnyIcon
          type={data?.iconType}
          size={20}
          color={THEME.COLORS.secondaryYellow}
          name={data?.icon}
          style={{
            marginRight: RF(10),
          }}
        />
      )}

      <AppText
        h4
        style={{
          flex: 1,
        }}
      >
        {t(data.title, { ns: ['all'] })}
      </AppText>
      {data.title == 'Security' && (
        <AnyIcon
          type={Icons.AntDesign}
          size={18}
          color={THEME.COLORS.errorRed}
          name="warning"
          style={{
            marginRight: RF(10),
          }}
        />
      )}
      <AnyIcon
        type={Icons.Feather}
        size={18}
        color={THEME.COLORS.textExtraLight}
        name="chevron-right"
      />
    </TouchableOpacity>
  );
}

export default SecurityItem;

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: THEME.RADIUS.BOX,
    marginVertical: RF(5),
    backgroundColor: THEME.COLORS.secondaryBackground,
    flexDirection: 'row',
    alignItems: 'center',
    padding: RF(10),
  },
});
