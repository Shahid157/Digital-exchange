import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import AppText from 'shared/components/AppText';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { Currency } from '../../../../__generated__/graphql';

interface Props {
  item: Currency;
  onPress?: () => void;
  disabled?: boolean;
}

function CoinModalListItem(props: Props) {
  const { item, disabled, onPress } = props;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [item?.image]);

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
          uri={item?.image}
          onLoad={handleImageLoaded}
        />

        <View>
          <View style={{ flexDirection: 'row' }}>
            <AppText h5 medium>
              {item?.name}
            </AppText>
            <AppText style={styles.network} h5 medium>
              {item?.network?.toUpperCase()}
            </AppText>
          </View>

          <AppText
            style={{
              marginTop: THEME.MARGIN.VERYLOW,
            }}
            color={THEME.COLORS.textGrey}
            medium
          >
            ${item?.price}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default CoinModalListItem;

const styles = StyleSheet.create({
  network: {
    paddingHorizontal: 4,
    borderRadius: THEME.RADIUS.SMALLBOX,
    marginLeft: 3,
    color: '#262626',
    backgroundColor: '#00AAF3',
  },
  container: {
    justifyContent: 'space-between',
    backgroundColor: '#101010',
    flexDirection: 'row',
    paddingVertical: THEME.PADDING.MID_LOW,
    marginHorizontal: THEME.MARGIN.LOW,
    marginVertical: THEME.MARGIN.SUPERLOW,
    borderRadius: THEME.RADIUS.BOX,
    paddingHorizontal: 10,
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
