import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { THEME } from '../../../../../shared/theme';
import AppText from '../../../../../shared/components/AppText';
import { ICONS } from '../../../../../assets/images/icons';
import SecondaryButton from '../../../../../shared/components/SecondaryButton';
import VerticalData from './VerticalData';
import { formatAssetAmmount } from '../../../../../shared/services/helper.service';
import { StakingTypes } from '../../../../../shared/store/slices/stakings/staking.types';
import ROUTE_NAMES from '../../../../../routes/RouteNames';
import CoinInput from './CoinInput';
import { PnlCardProps } from '../../types';

export default function PnlCard(props: PnlCardProps) {
  const { pnls, coin, staking } = props;
  const { t } = useTranslation('all');
  const navigation = useNavigation();

  const handleWithdraw = () => {
    // @ts-ignore
    navigation.navigate(ROUTE_NAMES.DAILY_EARNS_HISTORY, {
      type: StakingTypes.DailyEarns,
    });
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={['#393939', '#393939']}
      style={styles.topContainer}
      angle={45}
    >
      <View style={{ flex: 1, padding: THEME.PADDING.MID_LOW }}>
        <AppText h4 medium>
          {t('Your Daily Earning')}
        </AppText>

        <CoinInput
          hideChevron
          value={formatAssetAmmount(pnls.last24)}
          coin={coin}
          coinDisable
          editable={false}
          inputStyle={styles.earningInput}
          hideDivider
          parentContainerStyle={styles.parentContainerStyle}
          isSpecial
        />

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}
        >
          <VerticalData
            label={t('PnL [30d]')}
            value={formatAssetAmmount(pnls.last30) || ''}
          />

          <VerticalData
            style={{ marginHorizontal: THEME.MARGIN.HYPERHIGH }}
            label="APR"
            value={staking?.profit ? `${staking.profit * 365}%` : '-'}
          />
        </View>

        <SecondaryButton
          onPress={handleWithdraw}
          title={t('Withdraw Funds')}
          buttonStyle={styles.withdrawButton}
          image={ICONS.WITHDRAW}
          textStyle={{
            color: THEME.COLORS.secondaryBackground,
            textAlign: 'center',
          }}
          leftIconColor={THEME.COLORS.secondaryBackground}
          colorImage="black"
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    borderRadius: THEME.RADIUS.BOX,
    flex: 1,
    margin: THEME.MARGIN.LOW,
  },
  earningInput: {
    backgroundColor: '#262626',
    elevation: 20,
    shadowColor: '0px 0px 18px 0px rgba(0, 0, 0, 0.20)',
  },
  withdrawButton: {
    backgroundColor: THEME.COLORS.secondaryYellow,
    color: THEME.COLORS.secondaryBackground,
  },
  parentContainerStyle: {
    margin: 0,
  },
});
