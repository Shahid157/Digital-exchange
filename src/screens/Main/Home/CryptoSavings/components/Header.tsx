import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Icons } from '../../../../../shared/components/AnyIcon';
import AppHeader from '../../../../../shared/components/AppHeader';
import { THEME } from '../../../../../shared/theme';
import ROUTE_NAMES from '../../../../../routes/RouteNames';
import { StakingTypes } from '../../../../../shared/store/slices/stakings/staking.types';

export default function Header() {
  const { t } = useTranslation('all');
  const navigation = useNavigation();

  return (
    <AppHeader
      hideDivider
      headerStyle={{
        backgroundColor: 'transparent',
        paddingLeft: THEME.PADDING.LOW,
      }}
      titleStyle={{
        color: THEME.COLORS.white,
        paddingLeft: THEME.PADDING.VERYLOW,
      }}
      leftIcon="back"
      title={t('crypto_bank')}
      rightIcon="history"
      rightIconType={Icons.MaterialCommunityIcons}
      rightIconColor={THEME.COLORS.white}
      onPressRightIcon={() => {
        // @ts-ignore
        navigation.navigate(ROUTE_NAMES.DAILY_EARNS_HISTORY, {
          type: StakingTypes.CryptoBank,
        });
      }}
    />
  );
}
