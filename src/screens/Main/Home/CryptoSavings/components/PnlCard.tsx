import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { THEME } from '../../../../../shared/theme';
import VerticalData from './VerticalData';
import { formatAssetAmmount } from '../../../../../shared/services/helper.service';
import { PnlCardProps } from '../../types';

export default function PnlCard(props: PnlCardProps) {
  const { pnls, staking } = props;
  const { t } = useTranslation('all');

  return (
    <View style={styles.container}>
      <VerticalData
        label={t('PnL [30d]')}
        value={formatAssetAmmount(pnls.last30) || ''}
      />

      <VerticalData
        style={styles.verticalValue}
        label="APR"
        value={staking?.profit ? `${staking.profit * 12}%` : '-'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: THEME.MARGIN.LOW,
    marginTop: THEME.MARGIN.LOW,
  },
  verticalValue: { marginHorizontal: THEME.MARGIN.HYPERHIGH },
});
