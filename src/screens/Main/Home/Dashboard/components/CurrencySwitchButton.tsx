import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { RF } from '../../../../../shared/theme/responsive';
import AppText from '../../../../../shared/components/AppText';
import AnyIcon, { Icons } from '../../../../../shared/components/AnyIcon';
import { THEME } from '../../../../../shared/theme';
import NetworkTag from '../../../../../shared/components/NetworkTag';
import { CurrencySwitchButtonProps } from '../../types';

export default function CurrencySwitchButton(props: CurrencySwitchButtonProps) {
  const { currency, onChangeCurrency } = props;

  return (
    <TouchableOpacity onPress={onChangeCurrency}>
      <View style={styles.container}>
        {!currency && <AppText>Select Coin</AppText>}

        {currency && (
          <>
            <SvgUri
              width={RF(22)}
              height={RF(22)}
              style={styles.coinIcon}
              uri={currency?.image}
              onLoad={() => {}}
            />

            <View style={styles.coinContainer}>
              <AppText h3 medium style={styles.ticker}>
                {currency?.ticker}
              </AppText>
              <NetworkTag network={currency?.network} />
            </View>
          </>
        )}

        <AnyIcon
          type={Icons.Entypo}
          name="chevron-down"
          size={20}
          color={THEME.COLORS.white}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ticker: {
    textTransform: 'uppercase',
    marginTop: 4,
  },
  coinIcon: {
    height: RF(30),
    width: RF(30),
    borderRadius: THEME.RADIUS.NORMAL,
    marginRight: RF(10),
  },
});
