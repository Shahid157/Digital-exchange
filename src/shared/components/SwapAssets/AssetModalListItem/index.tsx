import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import AppText from 'shared/components/AppText';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import FastImage from 'react-native-fast-image';
import { GetImageForCoin } from 'assets/images/coins';
import NetworkTag from 'shared/components/NetworkTag';
import { CoinWithCurrency } from '../../../types';
import { formatAssetAmmount } from '../../../services/helper.service';

interface Props {
  item: CoinWithCurrency;
  onPress?: () => void;
  disabled?: boolean;
}

function AssetModalListItem(props: Props) {
  const { item, disabled, onPress } = props;
  const [loading, setLoading] = useState(true);

  const price = item?.currency?.price || 0;
  const isLocal = item?.currency?.isLocal || false;

  const amount = item?.amount || 0;
  const handleImageLoaded = () => {
    setLoading(false);
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, disabled && { opacity: 0.5 }]}
    >
      <View style={styles.left}>
        {/* <SvgUri
          width={RF(28)}
          height={RF(28)}
          style={styles.coinIcon}
          uri={item?.currency?.image}
        /> */}
        {!isLocal && (
          <SvgUri
            width={RF(28)}
            height={RF(28)}
            style={styles.coinIcon}
            uri={item?.currency.image}
            onLoad={handleImageLoaded}
          />
        )}
        {isLocal && (
          <FastImage
            source={GetImageForCoin(item?.currency?.ticker || '')}
            style={styles.localCoin}
            resizeMode="contain"
          />
        )}

        <View style={{ width: '70%' }}>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <AppText h5 medium>
              {item?.currency?.name}
            </AppText>

            <NetworkTag network={item?.currency?.network || item?.network} />
          </View>

          <AppText
            style={{
              marginTop: THEME.MARGIN.VERYLOW,
            }}
            color={THEME.COLORS.textGrey}
            medium
          >
            ${formatAssetAmmount(price)}
          </AppText>
        </View>
      </View>

      <View style={styles.right}>
        <AppText
          children={`${item?.amount?.toFixed(2)}`}
          style={[styles.amountText]}
        />

        <AppText
          children={`$ ${formatAssetAmmount(amount * price)}`}
          style={[styles.secondaryText]}
        />
      </View>
    </TouchableOpacity>
  );
}

export default AssetModalListItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: '#363636',
    flexDirection: 'row',
    paddingVertical: THEME.PADDING.MID_LOW,
    marginVertical: THEME.MARGIN.LOW,
    borderRadius: THEME.RADIUS.BOX,
    paddingHorizontal: RF(12),
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
  localCoin: {
    width: RF(28),
    height: RF(28),
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
});
