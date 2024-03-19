import { Currency } from '__generated__/graphql';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { SvgUri } from 'react-native-svg';
import { useSelector } from 'react-redux';
import AppText from 'shared/components/AppText';
import ConfidentialText from 'shared/components/ConfidentialText';
import { RootState } from 'shared/store';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { CoinWithCurrency } from 'shared/types';

interface Props {
  item: Currency;
  onPress?: () => void;
  disabled?: boolean;
}
function CoinListItem(props: Props) {
  const { item } = props;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [item?.image]);
  const handleImageLoaded = () => {
    setLoading(false);
  };

  return (
    <TouchableOpacity
      disabled={props?.disabled}
      onPress={props.onPress}
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
          width={RF(30)}
          height={RF(30)}
          style={styles.coinIcon}
          uri={item?.image}
          onLoad={handleImageLoaded}
        />

        <View>
          <AppText h3 medium>
            {item.ticker.toUpperCase()}
          </AppText>

          <AppText
            style={{
              marginTop: THEME.MARGIN.VERYLOW,
            }}
            color={THEME.COLORS.textGrey}
            medium
          >
            ${item.price}
          </AppText>
        </View>
      </View>

      <View style={styles.right}>
        <ConfidentialText
          children={`${item?.amount.toFixed(2)}`}
          style={[styles.amountText]}
        />

        <ConfidentialText
          children={`$ ${item?.amount.toFixed(2)}`}
          style={[styles.secondaryText]}
        />
      </View>
    </TouchableOpacity>
  );
}
export default CoinListItem;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: THEME.PADDING.MID_LOW,
    marginHorizontal: THEME.MARGIN.LOW,
    marginVertical: THEME.MARGIN.SUPERLOW,
    borderRadius: THEME.RADIUS.BOX,
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
});
