import { View, Text, StyleSheet } from 'react-native';
import { FONTS, COLORS } from 'shared/constants/theme';
import { SvgUri } from 'react-native-svg';
import { RF } from 'shared/theme/responsive';
import { Currency } from '__generated__/graphql';
import { THEME } from 'shared/theme';

interface BalanceStatSplitItemData {
  start: string;
  end: string;
  totalCount: number;
  totalAmount: number;
}

interface BalanceStatItemData {
  currency: string;
  totalCount: number;
  totalAmount: number;
  totalCountAvr: number;
  totalAmountAvr: number;
  splits: BalanceStatSplitItemData[];
  currencyData: Currency;
}

type MarketCoinsProps = {
  data: BalanceStatItemData;
  dataFrame: string;
  dataSet: string;
};

function BalanceStatItem(props: MarketCoinsProps) {
  const { data, dataFrame } = props;

  const ticker = data.currencyData.ticker.toUpperCase();
  const { name } = data.currencyData;
  const avr = data.totalCountAvr;
  const amountAvr = data.totalAmountAvr.toFixed(6);

  return (
    <View style={styles.root}>
      <View style={styles.itemContainer}>
        <SvgUri
          style={styles.itemDescription}
          width={RF(30)}
          height={RF(30)}
          uri={data.currencyData.image}
        />

        <View>
          <Text>{ticker}</Text>
          <Text>{name}</Text>
        </View>
      </View>
      <View style={styles.itemContainerSubLine}>
        <Text style={[styles.price, styles.tableItem]}>{amountAvr}</Text>
        <Text style={[styles.price, styles.tableItem]}>
          {avr ? avr.toFixed(2) : 0}/{dataFrame}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: 15,
    backgroundColor: COLORS.marketCards,
    borderRadius: THEME.RADIUS.BOX,
    marginHorizontal: 4,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  tableItem: {
    ...FONTS.font,
    paddingHorizontal: 15,
    flexBasis: 120,
    flexShrink: 2,
  },
  itemContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  itemContainerSubLine: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  itemDescription: {
    marginLeft: 10,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: THEME.RADIUS.ROUND,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    marginRight: 10,
  },
  ticker: {
    ...FONTS.font,
    fontSize: 15,
    ...FONTS.fontMedium,
  },
  price: {
    ...FONTS.font,
    ...FONTS.fontMedium,
    fontSize: 20,
    color: COLORS.white,
  },
});

export default BalanceStatItem;
