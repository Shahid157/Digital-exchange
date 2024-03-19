import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import AppText from '../../../../../shared/components/AppText';
import AnyIcon, { Icons } from '../../../../../shared/components/AnyIcon';
import ConfidentialText from '../../../../../shared/components/ConfidentialText';
import { THEME } from '../../../../../shared/theme';
import { formatAssetAmmount } from '../../../../../shared/services/helper.service';
import { RF } from '../../../../../shared/theme/responsive';
import { RootState } from '../../../../../shared/store';
import { useAppDispatch } from '../../../../../shared/hooks/redux';
import { toggleShowBalances } from '../../../../../shared/store/reducers/settingsReducer';
import { BalancesCardProps } from '../../types';

export default function BalancesCard(props: BalancesCardProps) {
  const { stakedAmount, coin } = props;
  const { showBalances } = useSelector((state: RootState) => state.settings);
  const dispatch = useAppDispatch();

  const { t } = useTranslation('all');

  return (
    <View style={styles.balanceCard}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <AppText h3 medium>
          {t('Your Funds')}
        </AppText>

        <AnyIcon
          style={{ marginLeft: THEME.MARGIN.VERYLOW }}
          onPress={() => dispatch(toggleShowBalances())}
          type={Icons.Ionicons}
          name={showBalances ? 'eye-off-outline' : 'eye-outline'}
          size={20}
          color="grey"
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <ConfidentialText
          style={{
            color: THEME.COLORS.secondaryYellow,
            fontSize: THEME.FONTS.SIZE.XLARGE,
          }}
        >
          {formatAssetAmmount(stakedAmount)}
        </ConfidentialText>

        <AppText
          color={THEME.COLORS.textGrey}
          semiBold
          style={{
            alignSelf: 'flex-end',
            marginBottom: RF(10),
            marginLeft: THEME.MARGIN.VERYLOW,
          }}
        >
          {coin?.ticker.toUpperCase()}
        </AppText>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <ConfidentialText style={{ color: THEME.COLORS.textGrey }}>
          {formatAssetAmmount(stakedAmount * coin?.currency?.price)}
        </ConfidentialText>
        <AppText
          color={THEME.COLORS.textGrey}
          style={{ marginLeft: THEME.MARGIN.VERYLOW }}
        >
          USD
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  balanceCard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
