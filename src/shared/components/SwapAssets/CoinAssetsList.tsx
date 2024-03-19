import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import AppText from '../AppText';
import { THEME } from '../../theme';
import CoinAssetListItem from './CoinAssetListItem';
import AnyIcon, { Icons } from '../AnyIcon';
import { CoinWithCurrency } from '../../types';

export interface CoinAssetsListProps {
  coins: CoinWithCurrency[];
  disabled: boolean;
  onPress: (item: CoinWithCurrency) => void;
}

export default function CoinAssetsList(props: CoinAssetsListProps) {
  const { coins, disabled, onPress } = props;
  const { t } = useTranslation();

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}
      >
        <AppText h3 semiBold style={{ marginLeft: THEME.MARGIN.LOW }}>
          {t('Assets', { ns: ['all'] })}
        </AppText>
        <AppText h4 style={{ marginLeft: THEME.MARGIN.LOW, color: '#979797' }}>
          {t('Value', { ns: ['all'] })}{' '}
          <AnyIcon
            type={Icons.FontAwesome}
            name="chevron-down"
            size={10}
            color="#979797"
          />
        </AppText>
      </View>

      {!coins && (
        <AppText
          color={THEME.COLORS.textGrey}
          medium
          style={{ textAlign: 'center' }}
        >
          {t('No Coins in the wallet', { ns: ['all'] })}
        </AppText>
      )}

      {coins?.map((item) => (
        <CoinAssetListItem
          disabled={disabled}
          key={item.id}
          item={item}
          onPress={() => onPress(item)}
        />
      ))}
    </>
  );
}
