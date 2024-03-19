import React from 'react';
import { StyleSheet, View } from 'react-native';

import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import AppText from 'shared/components/AppText';

import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';

import { kycStatus } from 'shared/constants/AppConstants';
import { useTranslation } from 'react-i18next';

interface Props {
  status: string;
}
function VerificationStatus(props: Props) {
  const { status } = props;
  let iconType;
  let iconName;
  let iconColor;
  const { t } = useTranslation(['all']);

  switch (status) {
    case 'nonVerified':
    case 'rejected':
    case 'deleted':
      iconType = Icons.AntDesign;
      iconName = 'warning';
      iconColor = THEME.COLORS.errorRed;
      break;
    case 'reviewNeeded':
      iconType = Icons.MaterialCommunityIcons;
      iconName = 'progress-clock';
      iconColor = THEME.COLORS.secondaryYellow;
      break;
    default:
      iconType = Icons.MaterialIcons;
      iconName = 'verified';
      iconColor = THEME.COLORS.sharpGreen;
      break;
  }

  return (
    <View style={[styles.verified]}>
      {/* <AnyIcon type={iconType} name={iconName} size={15} color={THEME.COLORS.WHITE_TRANS} />

      <AppText
        h5
        color={iconColor}
        semiBold
        style={{
          marginLeft: RF(2)
        }}
      >
        {t(`${kycStatus[status]}` , { ns: ['all'] })}
      </AppText> */}
    </View>
  );
}
export default VerificationStatus;

const styles = StyleSheet.create({
  verified: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: RF(10),
  },
});
