/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import AppText from 'shared/components/AppText';
import ConfidentialText from 'shared/components/ConfidentialText';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import FastImage from 'react-native-fast-image';
import NetworkTag from '../NetworkTag';
import { formatAssetAmmount } from '../../services/helper.service';
import { GetImageForCoin } from '../../../assets/images/coins';
import { CoinWithCurrency } from '../../types';

interface Props {
  item: CoinWithCurrency;
  onPress?: () => void;
  disabled?: boolean;
}

function CoinAssetListItem(props: Props) {
  const { item, disabled, onPress } = props;
  const [loading, setLoading] = useState(true);
  const price = item?.currency?.price || 0;
  const isLocal = item?.currency?.isLocal || false;

  useEffect(() => {
    setLoading(true);
  }, [item?.currency.image]);

  const handleImageLoaded = () => {
    setLoading(false);
  };

  // if USD amount is less than 1, don't show it
  if (item.amount * price < 1) {
    return null;
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={styles.container}
    >
      <View style={styles.left}>
        {loading && !isLocal && (
          <ActivityIndicator
            size={30}
            color={THEME.COLORS.secondaryYellow}
            style={styles.loader}
          />
        )}

        {isLocal && (
          <FastImage
            source={GetImageForCoin(item?.currency?.ticker || '')}
            style={styles.localCoin}
            resizeMode="contain"
          />
        )}

        {!isLocal && (
          <SvgUri
            width={RF(28)}
            height={RF(28)}
            style={styles.coinIcon}
            uri={item?.currency.image}
            onLoad={handleImageLoaded}
          />
        )}

        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <AppText h5 medium>
              {item.currency.name}
            </AppText>

            <NetworkTag network={item.currency.network} />
          </View>

          <AppText
            style={{
              marginTop: THEME.MARGIN.VERYLOW,
            }}
            color={THEME.COLORS.textGrey}
            medium
          >
            ${formatAssetAmmount(item.amount * price)}
          </AppText>
        </View>
      </View>

      <View style={styles.right}>
        <ConfidentialText style={[styles.amountText]}>
          {formatAssetAmmount(item.amount) || ''}
        </ConfidentialText>

        <ConfidentialText style={[styles.secondaryText]}>
          {`$  ${formatAssetAmmount(item.amount * price)}`}
        </ConfidentialText>
      </View>
    </TouchableOpacity>
  );
}

export default CoinAssetListItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: '#101010',
    flexDirection: 'row',
    marginHorizontal: THEME.MARGIN.LOW,
    marginVertical: THEME.MARGIN.LOW,
    borderRadius: THEME.RADIUS.BOX,
    padding: THEME.PADDING.MID_LOW,
  },
  left: {
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
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    marginTop: THEME.MARGIN.VERYLOW,
  },
  localCoin: {
    width: RF(28),
    height: RF(28),
    marginRight: RF(10),
  },
});
