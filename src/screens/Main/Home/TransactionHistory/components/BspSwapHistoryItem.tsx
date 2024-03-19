import moment from 'moment';
import React, { useMemo } from 'react';
import { useWalletWithCoins } from 'screens/Main/Home/hooks/useWalletWithCoins';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import AppText from 'shared/components/AppText';
import NetworkTag from 'shared/components/NetworkTag';
import { secondaryBackgroundColorProperty, THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { formatAssetAmmount } from 'shared/services/helper.service';
import { useTranslation } from 'react-i18next';
import { Transaction } from '../../../../../__generated__/graphql';
import { GetImageForCoin } from '../../../../../assets/images/coins';

interface Props {
  item: Transaction;
  onPress: () => void;
}

interface BspSwapTransactionPayload {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  updatedAt: string;
}

export default function BspSwapHistoryItem(props: Props) {
  const { item, onPress } = props;
  const payload = item.payload as BspSwapTransactionPayload;
  const wallet = useWalletWithCoins();
  const { t } = useTranslation(['all']);

  const [fromCoin, toCoin] = useMemo(() => {
    const from = wallet.data?.coins.find((i) => i.id === payload.fromCurrency);
    const to = wallet.data?.coins.find((i) => i.id === payload.toCurrency);
    return [from!, to!];
  }, [payload, wallet.data?.coins]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.container, secondaryBackgroundColorProperty()]}
    >
      <View
        style={[
          styles.subContainer,
          { alignItems: 'flex-start' },
          secondaryBackgroundColorProperty(),
        ]}
      >
        <View style={styles.coinItem}>
          <Image
            style={styles.coinIcon}
            source={GetImageForCoin(fromCoin.ticker)}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AppText medium style={[styles.coinName]}>
              {fromCoin?.ticker?.toUpperCase()}
            </AppText>
            <NetworkTag network={fromCoin?.network} />
          </View>
        </View>
        <AppText
          style={{ textAlign: 'center' }}
          semiBold
          color={THEME.COLORS.textLight}
        >
          {formatAssetAmmount(payload.fromAmount)}{' '}
        </AppText>
      </View>

      <View style={styles.subContainer}>
        <AnyIcon
          type={Icons.AntDesign}
          name="arrowright"
          size={20}
          color={THEME.COLORS.secondaryYellow}
        />
        <AppText medium style={styles.date}>
          {moment(item.createdAt).format(t('formatDateTime'))}
        </AppText>
      </View>

      <View style={[styles.subContainer, styles.flexEnd]}>
        <View style={styles.coinItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AppText medium style={[styles.coinName]}>
              {toCoin?.ticker?.toUpperCase()}
            </AppText>
            <NetworkTag network={toCoin?.network} />
          </View>

          <Image
            style={styles.coinIcon}
            source={GetImageForCoin(toCoin.ticker)}
          />
        </View>
        <AppText
          style={{ textAlign: 'center' }}
          semiBold
          color={THEME.COLORS.textLight}
        >
          {formatAssetAmmount(payload.toAmount)}{' '}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: THEME.PADDING.NORMAL,
    flexDirection: 'row',
    margin: THEME.MARGIN.LOW,
    marginVertical: THEME.MARGIN.VERYLOW,
    padding: THEME.PADDING.LOW,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: secondaryBackgroundColorProperty().backgroundColor,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
  date: {
    fontSize: THEME.FONTS.SIZE.XXXSMALL,
    color: THEME.COLORS.textLight,
    textAlign: 'center',
    marginTop: RF(5),
  },
  coinIcon: {
    height: RF(20),
    width: RF(20),
    borderRadius: THEME.RADIUS.OVAL,
  },
  arrow: {
    height: RF(20),
    width: RF(20),
    marginBottom: THEME.MARGIN.VERYLOW,
  },
  coinName: {
    marginHorizontal: RF(3),
  },
  coinItem: {
    marginBottom: THEME.MARGIN.VERYLOW,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
