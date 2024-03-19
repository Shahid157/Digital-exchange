import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from 'shared/constants/theme';
import AppText from 'shared/components/AppText';
import { RF } from 'shared/theme/responsive';
import { SvgUri } from 'react-native-svg';
import { BalanceDataType } from '..';

type BalanceRowProps = {
  data: BalanceDataType | any;
};

export function BalanceRow({ data }: BalanceRowProps) {
  const diff = data.pool - data.db;

  return (
    <View style={styles.root}>
      <View>
        <SvgUri
          width={RF(30)}
          height={RF(30)}
          uri={data.currency?.image || ''}
        />
      </View>
      <View style={styles.secondItemContainer}>
        <View style={styles.secondItem}>
          <AppText h3 medium>
            {data.legacyTicker.toUpperCase()}
          </AppText>
          <AppText
            h4
            medium
            color={!diff ? COLORS.white : diff < 0 ? COLORS.danger : 'green'}
          >
            {diff.toFixed(6)}
          </AppText>
        </View>
        <View style={styles.thirdItem}>
          <Text>DB: {data.db.toFixed(6)}</Text>
          <Text>Pool: {data.pool.toFixed(6)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    padding: 8,
  },
  secondItem: {
    flexDirection: 'column',
  },
  thirdItem: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  secondItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
  },
});
