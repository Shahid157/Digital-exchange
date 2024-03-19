import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useBackHandler } from '@react-native-community/hooks';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import { THEME } from '../../../../../shared/theme';
import { Transaction } from '../../../../../__generated__/graphql';
import FiatWithdrawDetailsContent from './FiatWithdrawDetailsContent';
import FiatDepositDetailsContent from './FiatDepositDetailsContent';
import BspSwapDetailsContent from './BspSwapDetailsContent';
import WithdrawDetailsContent from './WithdrawDetailsContent';

export interface Props {
  transaction?: Transaction;
  onClose: () => void;
}

/**
 * Map transaction type to bottom sheet snap points
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TransactionTypeToBottomSheetSnapPoints: Record<string, any> = {
  FiatWithdraw: [0.1, '50%'],
  FiatDeposit: [0.1, '50%'],
  BspSwap: [0.1, '60%'],
  Withdraw: [0.1, '60%'],
};

export default function TransactionDetailsBottomSheet(props: Props) {
  const { transaction, onClose } = props;
  const [index, setIndex] = useState(0);
  const snapPoints = useMemo(() => {
    const type = transaction?.type || '';
    return TransactionTypeToBottomSheetSnapPoints[type] || [0.1, '50%'];
  }, [transaction]);

  const renderBackdrop = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (renderProps: any) => (
      <BottomSheetBackdrop
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...renderProps}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    []
  );

  let content;
  const type = transaction?.type as string;
  switch (type) {
    case 'FiatWithdraw':
      content = <FiatWithdrawDetailsContent transaction={transaction} />;
      break;
    case 'FiatDeposit':
      content = <FiatDepositDetailsContent transaction={transaction} />;
      break;
    case 'BspSwap':
      content = <BspSwapDetailsContent transaction={transaction} />;
      break;
    case 'Withdraw':
      content = <WithdrawDetailsContent transaction={transaction} />;
      break;
    default:
      content = null;
      break;
  }

  useBackHandler(() => {
    if (index === 1) {
      onClose();
      return true;
    }
    return false;
  });

  useEffect(() => {
    const idx = transaction ? 1 : 0;
    setIndex(idx);
  }, [transaction]);

  return (
    <BottomSheet
      onClose={onClose}
      index={index}
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={styles.backgroundStyle}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={styles.handleIndicatorStyle}
    >
      {content}
    </BottomSheet>
  );
}

TransactionDetailsBottomSheet.defaultProps = {
  transaction: null,
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#181818',
  },
  handleIndicatorStyle: {
    backgroundColor: THEME.COLORS.inputGrey,
  },
});
