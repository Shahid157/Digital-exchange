import React, { useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import { Portal } from '@gorhom/portal';
import { useAppSelector } from '../../../../../shared/hooks/redux';
import CoinBottomSheet from './components/CoinBottomSheet';
import { CoinSelectionModalProps } from '../../types';

function CoinSelectionModal({
  visible,
  toggleModal,
  onSelectAsset,
  setCloseModal,
  otherSelectedCoin,
}: CoinSelectionModalProps) {
  const [searchText, setSearchText] = useState('');

  const [sheetIndex, setSheetIndex] = useState(0);
  const { currencies } = useAppSelector((state) => state.currencies);

  const filterCurrencies = useMemo(() => {
    const nonLocalCoins = currencies.filter((currency) => !currency.isLocal);
    if (!searchText) return nonLocalCoins;

    return nonLocalCoins
      .filter((coin: any) => {
        const name = coin?.name.toLowerCase();
        const ticker = coin?.ticker.toLowerCase();
        const search = searchText.toLowerCase();
        return name.includes(search) || ticker.includes(search);
      })
      .sort((a: any, b: any) => a?.ticker.localeCompare(b?.ticker));
  }, [searchText, currencies]);

  useEffect(() => {
    if (visible) {
      setSheetIndex(1);
    } else {
      setSheetIndex(0);
    }
  }, [visible]);

  return (
    <Portal>
      <CoinBottomSheet
        sheetIndex={sheetIndex}
        setSheetIndex={setSheetIndex}
        onClose={() => {
          setSheetIndex(0);
          toggleModal(null);
        }}
        onChange={(index) => {
          if (Platform.OS === 'ios') if (index === 0) setCloseModal();
        }}
        otherSelectedCoin={otherSelectedCoin}
        currencies={filterCurrencies}
        searchText={searchText}
        setSearchText={setSearchText}
        onSelectAsset={onSelectAsset}
      />
    </Portal>
  );
}

export default CoinSelectionModal;
