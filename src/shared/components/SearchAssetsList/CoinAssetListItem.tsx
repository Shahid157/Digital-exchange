/* eslint-disable react/require-default-props */
/* eslint-disable react/no-children-prop */
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
import NetworkTag from '../NetworkTag';

interface Props {
  item: {
    amount: number;
    currency: {
      price: number;
      lastUpdatedPrice: string;
      name: string;
      network: string;
      ticker: string;
      legacyTicker: string;
      image: string;
    };
    price: number;
    lastUpdatedPrice: string;
    name: string;
    network: string;
    ticker: string;
    legacyTicker: string;
    image: string;
  };
  onPress?: () => void;
  disabled?: boolean;
}

function CoinAssetListItem(props: Props) {
  const { item, disabled, onPress } = props;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [item?.currency.image]);

  const handleImageLoaded = () => {
    setLoading(false);
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={styles.container}
    >
      <View style={styles.left}>
        {loading && (
          <ActivityIndicator
            size={30}
            color={THEME.COLORS.secondaryYellow}
            style={styles.loader}
          />
        )}

        <SvgUri
          width={RF(28)}
          height={RF(28)}
          style={styles.coinIcon}
          uri={item?.currency.image}
          onLoad={handleImageLoaded}
        />

        <View
          style={{
            flexDirection: 'row',
            width: '80%',
          }}
        >
          <AppText medium>{item.currency.name}</AppText>
          <NetworkTag network={item?.network} />
        </View>
      </View>

      <View style={styles.right}>
        <ConfidentialText
          children={`${item.amount.toFixed(2)}`}
          style={[styles.amountText]}
        />

        <ConfidentialText
          children={`$ ${(item.amount * item.currency.price).toFixed(2)}`}
          style={[styles.secondaryText]}
        />
      </View>
    </TouchableOpacity>
  );
}

export default CoinAssetListItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: '#363636',
    flexDirection: 'row',
    padding: THEME.PADDING.LOW,

    marginVertical: THEME.MARGIN.VERYLOW,
    borderRadius: THEME.RADIUS.BOX,
  },
  left: {
    flex: 1,
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
    flex: 1,
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
