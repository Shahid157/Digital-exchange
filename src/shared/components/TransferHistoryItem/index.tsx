import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import { useWalletWithCoins } from 'screens/Main/Home/hooks/useWalletWithCoins';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import AnyIcon, { Icons } from '../AnyIcon';
import AppText from '../AppText';
import NetworkTag from '../NetworkTag';
import { GetImageForCoin } from '../../../assets/images/coins';
import { Transaction } from '../../../__generated__/graphql';

interface Props {
  item: Transaction;
  onPressTransaction: () => void;
}

function TransferHistoryItem(props: Props) {
  const { item } = props;
  const wallet: any = useWalletWithCoins();
  const { t } = useTranslation(['all']);
  const walletId = wallet.data.id;

  const coin = useMemo(
    () =>
      wallet?.data.coins.find((i: any) => i.id === item?.movements[0].coinId),
    [item, wallet?.data.coins]
  );

  const TRANSACTION_ICON = () => {
    if (item?.movements[0].wallet === walletId) {
      return 'arrowup';
    }
    return 'arrowdown';
  };

  const TRANSACTION_TEXT =
    item?.movements[0].wallet === walletId ? t('SENT') : t('RECEIVED');

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={props?.onPressTransaction}
      style={[styles.container]}
    >
      <FastImage
        style={styles.coinIcon}
        source={GetImageForCoin(coin?.currency?.ticker)}
        resizeMode={FastImage.resizeMode.contain}
      />

      {/* </View> */}
      <View style={styles.main}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AppText style={[styles.price]}>
            {TRANSACTION_TEXT == 'SENT' || TRANSACTION_TEXT == 'ENVIADO'
              ? item?.movements[0].amount
              : item?.movements[1].amount}{' '}
            {coin?.ticker}
          </AppText>
          <NetworkTag network={coin?.network} />
        </View>
        <Text style={styles.smallText}>
          {moment(item?.updatedAt).format(t('formatDate'))}
        </Text>
      </View>
      <View style={styles.right}>
        <AppText style={[styles.statusText]}>{TRANSACTION_TEXT}</AppText>
        <AnyIcon
          type={Icons.AntDesign}
          name={TRANSACTION_ICON()}
          size={20}
          color={
            TRANSACTION_TEXT == 'SENT' || TRANSACTION_TEXT == 'ENVIADO'
              ? THEME.COLORS.sharpGreen
              : THEME.COLORS.lightBlue
          }
        />
      </View>
    </TouchableOpacity>
  );
}

export default TransferHistoryItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RF(55),
    borderRadius: THEME.RADIUS.BOX,
    flexDirection: 'row',
    paddingHorizontal: THEME.PADDING.LOW,
    paddingVertical: THEME.PADDING.LOW,
    marginBottom: THEME.MARGIN.LOW,
  },
  //   left: { width: "16%", height: "100%", ...GLOBAL_STYLE.CENTER },
  main: {
    flex: 1,
    justifyContent: 'space-around',
    marginLeft: THEME.MARGIN.LOW,
  },
  price: {
    textTransform: 'uppercase',
    textAlign: 'left',
  },
  smallText: {
    fontSize: THEME.FONTS.SIZE.XXXSMALL,
    color: THEME.COLORS.textLight,
    textAlign: 'left',
  },
  statusText: {
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    color: THEME.COLORS.textLight,
    marginRight: THEME.MARGIN.LOW,
  },
  coinIcon: {
    width: RF(30),
    height: RF(30),
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-around',
  },
});
