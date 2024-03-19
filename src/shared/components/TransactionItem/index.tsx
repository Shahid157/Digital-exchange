import moment from 'moment';
import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { useWalletWithCoins } from 'screens/Main/Home/hooks/useWalletWithCoins';
import AppText from 'shared/components/AppText';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { formatAssetAmmount } from 'shared/services/helper.service';
import { useTranslation } from 'react-i18next';
import { CoinWithCurrency } from 'shared/types';
import NetworkTag from '../NetworkTag';
import { GetImageForCoin } from '../../../assets/images/coins';
import { Transaction } from '../../../__generated__/graphql';

interface Props {
  item: Transaction;
  onPress?: () => void;
}

function TransactionItem(props: Props) {
  const { item, onPress } = props;
  const txItem = item.payload;
  const wallet = useWalletWithCoins();
  const { t } = useTranslation(['all']);

  const coin = useMemo(() => {
    const foundCoin = wallet.data?.coins.find((i: CoinWithCurrency) => {
      switch (item.type) {
        case 'Deposit':
          return i.id === txItem?.toLegacyTicker;
        default:
          return i.id === txItem?.currency;
      }
    });
    return foundCoin;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txItem?.currency, wallet.data?.coins]);

  const amount = txItem?.amountFrom || txItem?.amount;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.left}>
        <Image
          style={styles.coinIcon}
          source={GetImageForCoin(coin?.currency?.ticker || '')}
        />

        <View style={{}}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AppText medium>{coin?.ticker?.toUpperCase()}</AppText>

            <NetworkTag network={coin?.network || ''} />
          </View>

          <AppText
            style={{
              marginTop: THEME.MARGIN.VERYLOW,
            }}
            ellipsizeMode="middle"
            numberOfLines={1}
            color={THEME.COLORS.textGrey}
            medium
            h5
          >
            {item.type === 'Deposit'
              ? txItem?.payinAddress
              : txItem?.payoutAddress}
          </AppText>
        </View>
      </View>

      <View style={styles.right}>
        <AppText style={[styles?.amountText]}>
          {amount ? formatAssetAmmount(amount) : '--'}
        </AppText>

        <AppText h5 medium style={[styles.secondaryText]}>
          {moment(item.createdAt).format(t('formatDate'))}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}

TransactionItem.defaultProps = {
  onPress: undefined,
};

export default TransactionItem;
const styles = StyleSheet.create({
  container: {
    width: '95%',

    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: THEME.PADDING.MID_LOW,
    marginHorizontal: THEME.MARGIN.LOW,
    marginVertical: THEME.MARGIN.SUPERLOW,
    borderRadius: THEME.RADIUS.BOX,
  },
  left: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  coinIcon: {
    height: RF(30),
    width: RF(30),
    borderRadius: THEME.RADIUS.NORMAL,
    marginRight: RF(10),
  },
  loader: {
    marginRight: RF(10),
  },

  right: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  amountText: {
    color: THEME.COLORS.white,
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
    fontSize: THEME.FONTS.SIZE.XSMALL,
  },
  secondaryText: {
    color: THEME.COLORS.textGrey,
    marginTop: THEME.MARGIN.VERYLOW,
  },
});
