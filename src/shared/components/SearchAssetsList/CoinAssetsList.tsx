import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Coin } from '__generated__/graphql';
import { CoinWithCurrency } from 'shared/types';
import AppText from '../AppText';
import { THEME } from '../../theme';
import CoinAssetListItem from './CoinAssetListItem';
import AnyIcon, { Icons } from '../AnyIcon';

interface CoinType {
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
}
export interface CoinAssetsListProps {
  coins?: CoinType[];
  disabled: boolean;
  onPress: (item: CoinType) => void;
}

export default function CoinAssetsList(props: CoinAssetsListProps) {
  const { coins, disabled, onPress } = props;
  const { t } = useTranslation();

  return (
    <>
      {!coins && (
        <AppText
          color={THEME.COLORS.textGrey}
          medium
          style={{ textAlign: 'center' }}
        >
          {t('No Coins in the wallet', { ns: ['all'] })}
        </AppText>
      )}

      {coins?.map((item: CoinType, index: number) => (
        <CoinAssetListItem
          disabled={disabled}
          key={index}
          item={item}
          onPress={() => onPress(item)}
        />
      ))}
    </>
  );
}
