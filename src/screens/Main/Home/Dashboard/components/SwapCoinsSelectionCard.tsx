import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { THEME } from 'shared/theme';
import { Currency } from '../../../../../__generated__/graphql';
import CurrencySwitchButton from './CurrencySwitchButton';
import CoinSelectionModal from '../../ExchangeCurrency/CoinSelectionModal';
import Swapper from '../../ExchangeCurrency/SwapScreen/Swapper';
import AppText from '../../../../../shared/components/AppText';
import IntervalSelect from './InvervalSelect';
import SwapStatChartCard from './SwapStatChartCard';
import { SwapCoinsSelectionCardProps } from '../../types';

const DatasetValues = [
  '1h',
  '2h',
  '4h',
  '6h',
  '11h',
  '1d',
  '3d',
  '1w',
  '15d',
  '30d',
];

const TimeFrameValues = ['1h', '2h', '4h', '6h', '12h'];

export default function SwapCoinsSelectionCard(
  props: SwapCoinsSelectionCardProps
) {
  const {
    from,
    to,
    dataSet,
    timeFrame,
    stats,
    setFrom,
    setTo,
    setDataSet,
    setTimeFrame,
  } = props;
  const [open, setOpen] = useState<'from' | 'to' | undefined>();

  const handdleOnChange = (fromOrTo: 'from' | 'to') => () => {
    setOpen(fromOrTo);
  };

  const handleOnSelectedCoin = (currency: Currency) => {
    if (open === 'from') {
      setFrom(currency);
    } else if (open === 'to') {
      setTo(currency);
    }
    setOpen(undefined);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowFlex}>
        <AppText h1>Select a pair</AppText>

        <View style={styles.invervals}>
          <IntervalSelect
            interval={dataSet}
            intervals={DatasetValues}
            onIntervalChange={setDataSet}
          />

          <IntervalSelect
            interval={timeFrame}
            intervals={TimeFrameValues}
            onIntervalChange={setTimeFrame}
          />
        </View>
      </View>

      <View style={styles.root}>
        <CurrencySwitchButton
          currency={from}
          onChangeCurrency={handdleOnChange('from')}
        />

        <Swapper onPress={() => {}} />

        <CurrencySwitchButton
          currency={to}
          onChangeCurrency={handdleOnChange('to')}
        />

        <CoinSelectionModal
          visible={open !== undefined}
          toggleModal={() => setOpen(undefined)}
          onSelectAsset={handleOnSelectedCoin}
          setCloseModal={() => setOpen(undefined)}
          otherSelectedCoin={open === 'from' ? to : from}
        />
      </View>

      <SwapStatChartCard stats={stats} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#101010',
    borderRadius: THEME.RADIUS.BOX,
    padding: 20,
    marginHorizontal: 10,
  },
  root: {
    marginTop: 20,
    borderRadius: THEME.RADIUS.BOX,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  invervals: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
