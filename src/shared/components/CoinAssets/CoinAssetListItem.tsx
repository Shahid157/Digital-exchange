import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import AppText from 'shared/components/AppText';
import ConfidentialText from 'shared/components/ConfidentialText';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { useTranslation } from 'react-i18next';
import NetworkTag from '../NetworkTag';
import { formatAssetAmmount } from '../../services/helper.service';
import { GetImageForCoin } from '../../../assets/images/coins';
import { CoinWithCurrency } from '../../types';

interface Props {
  isPortfolio?: boolean;
  item: CoinWithCurrency;
  onPress?: () => void;
  disabled?: boolean;
}

function CoinAssetListItem(props: Props) {
  const { item, disabled, onPress, isPortfolio } = props;
  const { t } = useTranslation(['all']);

  const { isLocal } = item.currency;
  const price = item.currency.price || 0;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={styles.container}
    >
      <View style={styles.left}>
        <Image
          source={GetImageForCoin(item.currency.ticker)}
          style={styles.icon}
        />
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AppText h3 medium>
              {item.currency.ticker.toUpperCase()}
            </AppText>
            {item.currency.isLocal}
            {isPortfolio && <NetworkTag network={item?.currency?.network} />}
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
        <ConfidentialText
          children={formatAssetAmmount(item.amount)}
          style={[styles.amountText]}
        />

        <ConfidentialText
          children={`$ ${formatAssetAmmount(price * item.amount)}`}
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
    flexDirection: 'row',
    paddingVertical: THEME.PADDING.LOW,
    paddingHorizontal: THEME.MARGIN.VERYLOW,
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
  icon: {
    height: RF(32),
    width: RF(32),
    borderRadius: THEME.RADIUS.OVAL,
    marginRight: RF(10),
    resizeMode: 'contain',
  },
});
