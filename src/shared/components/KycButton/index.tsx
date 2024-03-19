import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import AppText from 'shared/components/AppText';

import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';

import { kycStatus } from 'shared/constants/AppConstants';
import { useTranslation } from 'react-i18next';

interface Props {
  status: string;
  loading: boolean;
  onPress: () => void;
}
function KycButton(props: Props) {
  const { status, loading } = props;
  let iconType;
  let iconName;
  const { t } = useTranslation(['all']);

  switch (status) {
    case 'nonVerified':
    case 'rejected':
    case 'deleted':
      iconType = Icons.AntDesign;
      iconName = 'warning';
      break;
    case 'reviewNeeded':
      iconType = Icons.MaterialCommunityIcons;
      iconName = 'progress-clock';
      break;
    default:
      iconType = Icons.MaterialIcons;
      iconName = 'verified';
      break;
  }

  return (
    <TouchableOpacity
      onPress={props?.onPress}
      disabled={!(status === 'nonVerified' || status === 'deleted')}
      style={styles.kycButton}
    >
      <AppText semiBold color="black">
        KYC:
      </AppText>
      <View style={styles.verified}>
        {loading ? (
          <AppText
            color="black"
            semiBold
            style={{
              marginLeft: RF(2),
            }}
          >
            Loading...
          </AppText>
        ) : (
          <>
            <AnyIcon type={iconType} name={iconName} size={20} color="black" />
            <AppText
              color="black"
              semiBold
              style={{
                marginLeft: RF(2),
              }}
            >
              {t(`${kycStatus[status]}`, { ns: ['all'] })}
            </AppText>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}
export default KycButton;

const styles = StyleSheet.create({
  verified: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: RF(10),
  },
  kycButton: {
    padding: RF(10),
    borderRadius: THEME.RADIUS.BOX,
    backgroundColor: THEME.COLORS.secondaryYellow,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
