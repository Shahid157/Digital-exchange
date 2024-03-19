import React, { useEffect, useState } from 'react';
import { SwapSuccessProps } from 'screens/Main/Home/types';
import SwapSuccessBottomSheet from './components/SwapSuccessBottomSheet';

function SwapSuccessModal(props: SwapSuccessProps) {
  const [sheetIndex, setSheetIndex] = useState(0);

  useEffect(() => {
    if (props?.visible) {
      setSheetIndex(1);
    } else {
      setSheetIndex(0);
    }
  }, [props?.visible]);

  return (
    <SwapSuccessBottomSheet
      successDetails={props?.successDetails}
      sheetIndex={sheetIndex}
      setSheetIndex={setSheetIndex}
      fromAmount={props?.fromAmount}
      uri={props?.fromCoin?.image}
      onClose={() => {
        setSheetIndex(0);
        props.hideModalAndRedirect();
      }}
      fromCoin={props?.fromCoin?.ticker}
      network={props?.fromCoin?.network}
      toAmount={props?.toAmount}
      toCoin={props?.toCoin?.ticker}
      coinNetwork={props?.toCoin?.network}
    />
  );
}

export default SwapSuccessModal;
