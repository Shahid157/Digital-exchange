import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useWalletWithCoins } from 'screens/Main/Home/hooks/useWalletWithCoins';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import AppText from 'shared/components/AppText';
import { SvgUri } from 'react-native-svg';
import NetworkTag from 'shared/components/NetworkTag';
import { secondaryBackgroundColorProperty, THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { formatAssetAmmount } from 'shared/services/helper.service';
import { useTranslation } from 'react-i18next';
import { Transaction } from '../../../../../__generated__/graphql';

interface Props {
  item: Transaction;
  onPress: () => void;
}

function SwapHistoryItem(props: Props) {
  const { item, onPress } = props;
  const txItem = item.payload;
  const wallet = useWalletWithCoins();
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation(['all']);
  const [fromCoin, toCoin] = useMemo(() => {
    const coin1 = wallet.data?.coins.find((i) => i.id === txItem?.fromCurrency);
    const coin2 = wallet.data?.coins.find((i) => i.id === txItem?.toCurrency);
    return [coin1, coin2];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txItem?.currency, wallet.data?.coins]);

  useEffect(() => {
    setLoading(true);
  }, [fromCoin?.currency?.image, toCoin?.currency?.image]);

  const handleImageLoaded = () => {
    setLoading(false);
  };

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
          {loading && (
            <ActivityIndicator
              size={30}
              color={THEME.COLORS.secondaryYellow}
              style={styles.loader}
            />
          )}

          <SvgUri
            width={RF(20)}
            height={RF(20)}
            style={styles.coinIcon}
            uri={fromCoin?.currency?.image || null}
            onLoad={handleImageLoaded}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AppText medium style={[styles.coinName]}>
              {fromCoin?.ticker?.toUpperCase()}
            </AppText>
            <NetworkTag network={fromCoin?.network || ''} />
          </View>
        </View>
        <AppText
          style={{ textAlign: 'center' }}
          semiBold
          color={THEME.COLORS.textLight}
        >
          {formatAssetAmmount(txItem?.fromAmount)}{' '}
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
      <View style={[styles.subContainer, { alignItems: 'flex-end' }]}>
        <View style={styles.coinItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AppText medium style={[styles.coinName]}>
              {toCoin?.ticker?.toUpperCase()}
            </AppText>
            <NetworkTag network={toCoin?.network || ''} />
          </View>
          {loading && (
            <ActivityIndicator
              size={30}
              color={THEME.COLORS.secondaryYellow}
              style={styles.loader}
            />
          )}

          <SvgUri
            width={RF(20)}
            height={RF(20)}
            style={styles.coinIcon}
            uri={toCoin?.currency?.image || null}
            onLoad={handleImageLoaded}
          />
        </View>
        <AppText
          style={{ textAlign: 'center' }}
          semiBold
          color={THEME.COLORS.textLight}
        >
          {formatAssetAmmount(txItem?.toAmount)}{' '}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}
export default SwapHistoryItem;

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
  loader: {
    marginRight: RF(10),
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
