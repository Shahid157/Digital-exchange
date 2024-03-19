/* eslint-disable react/destructuring-assignment */
import moment from 'moment';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AppText from 'shared/components/AppText';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { formatAssetAmmount } from 'shared/services/helper.service';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { GetImageForCoin } from '../../../assets/images/coins';
import { Transaction } from '../../../__generated__/graphql';
import NetworkTag from '../NetworkTag';
import { RootState } from '../../store';

interface Props {
  item: Transaction;
  onPress: () => void;
}
function TransactionItem(props: Props) {
  const { item } = props;
  const txItem = item.payload;
  const currencies = useSelector(
    (state: RootState) => state.currencies.currencies
  );
  const { t } = useTranslation(['all']);

  const currency = currencies.find(
    (currency) => currency.legacyTicker === item.movements[0].coinId
  );

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <View style={styles.left}>
        <FastImage
          style={styles.coinIcon}
          source={GetImageForCoin(currency?.ticker || '')}
          resizeMode={FastImage.resizeMode.contain}
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
            {t(item.status)}
          </AppText>
        </View>
      </View>

      <View style={styles.right}>
        <AppText style={[styles?.amountText]}>
          {formatAssetAmmount(item.movements[0].amount)}
        </AppText>

        <AppText style={styles.secondaryText} h5 medium>
          {moment(txItem?.updatedAt).format(t('formatDate'))}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}
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
