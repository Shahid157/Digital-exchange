import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import moment from 'moment';
import { SvgUri } from 'react-native-svg';
import { useWalletWithCoins } from 'screens/Main/Home/hooks/useWalletWithCoins';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { useTranslation } from 'react-i18next';
import { GetImageForCoin } from 'assets/images/coins';
import useMergedSameCoins from 'shared/hooks/useSameCoins';
import { formatAssetAmmount } from 'shared/services/helper.service';
import AnyIcon, { Icons } from '../AnyIcon';
import AppText from '../AppText';
import NetworkTag from '../NetworkTag';
import { ICONS } from '../../../assets/images/icons/index';
import { EntryWithEarns } from '../../../screens/Main/Home/DailyEarnHistory/hooks/useEntriesWithEarns';
import { Transaction } from '../../../__generated__/graphql';
import 'moment/locale/es';
import { StakingTypes } from '../../store/slices/stakings/staking.types';
import FastImage from 'react-native-fast-image';

GetImageForCoin('USDT');
interface Props {
  item: EntryWithEarns;
  onPressTransaction: () => void;
}

function TransferHistoryItemDailyEarn(props: Props) {
  const { item } = props;
  const wallet = useWalletWithCoins();
  const { t } = useTranslation(['all']);
  const isDaily = item.snapshot.type === StakingTypes.DailyEarns;
  const coin = wallet.data?.coins.find((coin) => coin.id === item.currency);
  moment.locale('es');

  const totalEarn = item.earns
    .map((item: Transaction) => item.movements[0].amount)
    .reduce((a, b) => a + b, 0);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={props?.onPressTransaction}
      style={[styles.container]}
    >
      <View style={styles.main}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <AppText style={styles.date}>
            {moment(item?.createdAt).format('MMMM, DD')}
          </AppText>
        </View>
        <View style={{ display: 'flex' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FastImage
              style={styles.coinIcon}
              source={GetImageForCoin(
                coin?.currency?.ticker.toUpperCase() || ''
              )}
              resizeMode="contain"
            />

            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginLeft: 2,
              }}
            >
              <AppText style={styles.ticker}>
                {item?.currency.toUpperCase()}
              </AppText>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.right}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-end',
            paddingTop: 5,
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            {isDaily && (
              <AppText style={styles.profit}>
                {t(item?.snapshot?.policy)}
              </AppText>
            )}
            <AppText style={styles.price}>
              {formatAssetAmmount(item?.amount)}
            </AppText>
          </View>
          {isDaily && (
            <AppText style={styles.profit}>
              {t('ROI')} 30 {t('days')} ${formatAssetAmmount(totalEarn)}
            </AppText>
          )}
          {!isDaily && (
            <AppText style={styles.profit}>
              {t('est. reward')} $
              {formatAssetAmmount((item.amount * item.snapshot.profit) / 100)}
            </AppText>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default TransferHistoryItemDailyEarn;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RF(55),
    borderRadius: THEME.RADIUS.BOX,
    flexDirection: 'row',
    paddingHorizontal: THEME.PADDING.VERYLOW,
    paddingVertical: THEME.PADDING.LOW,
    marginBottom: THEME.MARGIN.VERYLOW,
  },
  //   left: { width: "16%", height: "100%", ...GLOBAL_STYLE.CENTER },
  main: {
    flex: 1,
    // justifyContent: "space-around",
    marginLeft: THEME.MARGIN.LOW,
  },
  price: {
    textAlign: 'left',
    marginLeft: THEME.MARGIN.LOW,
  },
  ticker: {
    textAlign: 'left',
    marginLeft: THEME.MARGIN.LOW,
    marginTop: 7,
  },
  date: {
    textAlign: 'left',
    fontSize: THEME.FONTS.SIZE.XSMALL,
  },
  profit: {
    textAlign: 'left',
    color: THEME.COLORS.textGrey,
  },
  smallText: {
    fontSize: THEME.FONTS.SIZE.XXXSMALL,
    color: THEME.COLORS.textLight,
    textAlign: 'left',
  },
  statusText: {
    flexDirection: 'row',
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    color: THEME.COLORS.textLight,
    marginRight: THEME.MARGIN.LOW,
  },
  coinIcon: {
    height: RF(20),
    width: RF(20),
    borderRadius: THEME.RADIUS.OVAL,
  },
  loader: {
    marginRight: RF(10),
  },
  right: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 10,
    height: '100%',
    // justifyContent: "space-around"
  },
});
