/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import moment from 'moment';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import AppText from 'shared/components/AppText';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { formatAssetAmmount } from 'shared/services/helper.service';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { CoinWithCurrency } from 'shared/types';
import { useWalletWithCoins } from 'screens/Main/Home/hooks/useWalletWithCoins';
import { RootState } from '../../store';
import NetworkTag from '../NetworkTag';
import { Transaction } from '../../../__generated__/graphql';
import { GetImageForCoin } from '../../../assets/images/coins';

interface Props {
  item: Transaction;
  onPress: (item: Transaction) => void;
}
function WithdrawTransactionItem(props: Props) {
  const { item, onPress } = props;
  const txItem = item.payload;
  const wallet = useWalletWithCoins();
  const movement = item?.movements[0];

  const currencies = useSelector(
    (state: RootState) => state.currencies.currencies
  );
  const { t } = useTranslation(['all']);

  const currency = currencies.find(
    (currency) => currency.legacyTicker === item.movements[0].coinId
  );
  const coin = useMemo(() => {
    const foundCoin = wallet.data?.coins.find(
      (i: CoinWithCurrency) => i.id === txItem?.currency
    );
    return foundCoin;
  }, [txItem?.currency, wallet.data?.coins]);

  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.container}>
      <View style={styles.left}>
        <Image
          style={styles.coinIcon}
          source={GetImageForCoin(coin?.currency?.ticker || '')}
        />

        <View style={{}}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AppText medium>{currency?.ticker?.toUpperCase()}</AppText>
            <NetworkTag network={currency?.network || ''} />
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
            {t(txItem?.payoutAddress)}
          </AppText>
        </View>
      </View>

      <View style={styles.right}>
        <AppText style={[styles?.amountText]}>
          {movement ? formatAssetAmmount(movement.amount) : '--'}
        </AppText>

        <AppText style={styles.secondaryText} h5 medium>
          {moment(item.createdAt).format(t('formatDate'))}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}
export default WithdrawTransactionItem;

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
