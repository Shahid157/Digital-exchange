import React, { useEffect, useMemo, useState } from 'react';
import { Portal } from '@gorhom/portal';
import { useWalletWithCoins } from '../../hooks/useWalletWithCoins';
import { AssetSelectionModalProps } from '../../types';
import AssetBottomSheet from '../AssetSelectionModal/components/AssetBottomSheet';

function LocalCurrencySelectionModal({
  visible,
  otherSelectedCoin,
  toggleModal,
  onSelectAsset,
  setCloseModal,
}: AssetSelectionModalProps) {
  const [searchText, setSearchText] = useState('');
  const [sheetIndex, setSheetIndex] = useState(0);
  const wallet = useWalletWithCoins();

  const assets = useMemo(() => {
    const coins = wallet?.data?.coins || [];
    const result = coins.filter((coin) => {
      if (!coin.currency.isLocal) return false;
      return coin.id !== otherSelectedCoin?.id;
    });

    result.sort((a, b) => a?.ticker.localeCompare(b?.ticker));

    if (!searchText) {
      return result;
    }

    return result.filter((coin) => {
      const name = coin.currency.name.toLowerCase();
      const ticker = coin.currency.ticker.toLowerCase();
      const search = searchText.toLowerCase();
      return name.includes(search) || ticker.includes(search);
    });
  }, [searchText, wallet, otherSelectedCoin]);

  useEffect(() => {
    if (visible) {
      setSheetIndex(1);
    } else {
      setSheetIndex(0);
    }
  }, [visible]);

  return (
    <Portal>
      <AssetBottomSheet
        sheetIndex={sheetIndex}
        setSheetIndex={setSheetIndex}
        onClose={() => toggleModal(null)}
        onChange={(index) => {
          if (index === 0 && setCloseModal) {
            setCloseModal();
          }
        }}
        otherSelectedCoin={otherSelectedCoin}
        assets={assets}
        searchText={searchText}
        setSearchText={setSearchText}
        onSelectAsset={onSelectAsset}
      />
    </Portal>
  );
}
export default LocalCurrencySelectionModal;
