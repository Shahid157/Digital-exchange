/* eslint-disable react/react-in-jsx-scope */
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Currency } from '__generated__/graphql';
import { GetImageForCoin } from 'assets/images/coins';
import { THEME } from 'shared/theme';
import { RF } from '../../theme/responsive';
import {
  formatAssetAmmount,
  getNameForTicker,
} from '../../services/helper.service';
import AppText from '../AppText';
import { COLORS } from '../../constants/theme';

type MarketCoinsProps = {
  onSelect: (val: Currency) => void;
  data: Currency;
  isFavorite: boolean;
  onFavorite: () => void;
  onUnFavorite: () => void;
};

function MarketCoins({
  data,
  onSelect,
  isFavorite,
  onFavorite,
  onUnFavorite,
}: MarketCoinsProps) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => onSelect(data)}
      style={styles.itemContainer}
    >
      <View style={styles.itemDescriptionContainer}>
        <Ripple
          style={{ paddingRight: RF(10) }}
          onPress={() => (isFavorite ? onUnFavorite() : onFavorite())}
        >
          {isFavorite ? (
            <FontAwesome color={COLORS.warning} size={16} name="star" />
          ) : (
            <FontAwesome
              style={styles.rippleText}
              color={colors.text}
              size={16}
              name="star-o"
            />
          )}
        </Ripple>

        <Image source={GetImageForCoin(data?.ticker)} style={styles.icon} />

        <View style={{ marginLeft: RF(10) }}>
          <AppText semiBold h2>
            {data?.ticker.toUpperCase()}
          </AppText>
          <AppText h5 style={[styles.descriptionName]}>
            {getNameForTicker(data?.ticker)}
          </AppText>
        </View>
      </View>

      <AppText h3 semiBold>
        ${formatAssetAmmount(data?.price || 0)}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: COLORS.marketCards,
    borderRadius: THEME.RADIUS.BOX,
    flexDirection: 'row',
    marginVertical: RF(5),
    padding: RF(10),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemDescriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1,
    // paddingLeft: 15,
  },

  rippleText: { opacity: 0.6 },

  descriptionName: {
    textTransform: 'uppercase',
  },
  icon: {
    height: RF(32),
    width: RF(32),
    borderRadius: THEME.RADIUS.OVAL,
    marginRight: RF(10),
    resizeMode: 'contain',
  },
});

export default MarketCoins;
