import { Portal } from '@gorhom/portal';
import React, { useEffect, useMemo, useState } from 'react';
import {
  BackHandler,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  RefreshControl,
} from 'react-native';
import AnimatedTabGroup from 'shared/components/AnimatedTabGroup';
import AppText from 'shared/components/AppText';
import TransactionItem from 'shared/components/TransactionItem';
import {
  transactionType,
  transactions,
} from 'shared/services/withdraw.services';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import TransferHistoryItem from 'shared/components/TransferHistoryItem';
import FiatWithdrawHistoryItem from 'shared/components/FiatTransactionHistoryItem';
import DepositFiatHistoryItem from 'shared/components/DepositFiatHistoryItem';
import { useTranslation } from 'react-i18next';
import { useBackHandler } from '@react-native-community/hooks';
import WithdrawTransactionItem from 'shared/components/WithdrawTransactionHistoryItem';
import { useWalletWithCoins } from '../hooks/useWalletWithCoins';
import { GenericNavigation } from '../../../../shared/models/types';
import AppHeader from '../../../../shared/components/AppHeader';
import SwapHistoryItem from './SwapHistoryItem';
import SwapHistoryBottomSheet from './SwapHistoryItem/components/SwapHistoryBottomSheet';
import TransactionDetailsBottomSheet from './components/TransactionDetailsBottomSheet';
import { Transaction } from '../../../../__generated__/graphql';
import BspSwapHistoryItem from './components/BspSwapHistoryItem';

const TabIndexs: Record<string, number> = {
  Deposit: 1,
  Swap: 2,
  Transfer: 3,
};

function TransactionHistory(props: GenericNavigation) {
  const type = props?.route?.params?.type;
  const [open, setOpen] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(TabIndexs[type] || 0);
  const [imageLoading, setImageLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [txDetails, setTxDetails] = useState<any>();
  const [transactionDetails, setTransactionDetails] = useState<
    Transaction | undefined
  >();
  const [transactionsHistory, setTransactionsHistory] = useState([]);
  const { t } = useTranslation(['all']);
  const [sheetOpened, setSheetOpened] = useState(false);

  const transactionsHistoryFiltered = useMemo(
    () =>
      transactionsHistory.filter((i: any) => {
        const type = transactionType(selectedIndex);
        if (type === 'Deposit') {
          return i.type === 'Deposit' || i.type === 'FiatDeposit';
        }
        if (type === 'Withdraw') {
          return i.type === 'Withdraw' || i.type === 'FiatWithdraw';
        }
        if (type === 'Swap') {
          return i.type === 'Swap' || i.type === 'BspSwap';
        }
        return i?.type === transactionType(selectedIndex);
      }),
    [transactionsHistory, selectedIndex]
  );
  const wallet = useWalletWithCoins();

  const [fromCoin, toCoin] = useMemo(() => {
    const coin1: any = wallet?.data?.coins?.find(
      (i: any) => i.id === txDetails?.payload?.fromCurrency
    );
    const coin2: any = wallet?.data?.coins?.find(
      (i: any) => i.id === txDetails?.payload?.toCurrency
    );
    return [coin1, coin2];
  }, [txDetails, wallet?.data?.coins]);

  const fetchTransactions = async () => {
    try {
      setRefreshing(true);
      const res = await transactions(wallet.data?.id);
      res.data.reverse();
      setTransactionsHistory(res.data);
    } finally {
      setRefreshing(false);
    }
  };

  const handleImageLoaded = () => {
    setImageLoading(false);
  };

  const onPressTransaction = (item: Transaction) => {
    setTxDetails(item);
    setSheetOpened(true);
    setOpen(1);
  };

  const coin = useMemo(() => {
    const foundCoin: any = wallet?.data?.coins.find((i: any) =>
      selectedIndex == 1
        ? i.id === txDetails?.payload.toCurrency
        : txDetails?.type == 'Transfer'
          ? i.id === txDetails?.movements[0].coinId
          : txDetails?.payload?.currency
    );
    return foundCoin;
  }, [txDetails, wallet?.data?.coins]);

  const renderItem = ({ item }: any) => {
    switch (item?.type) {
      case 'Transfer':
        return (
          <TransferHistoryItem
            item={item}
            onPressTransaction={() => onPressTransaction(item)}
          />
        );
      case 'Swap':
        return (
          <SwapHistoryItem
            item={item}
            onPress={() => onPressTransaction(item)}
          />
        );
      case 'BspSwap':
        return (
          <BspSwapHistoryItem
            item={item}
            onPress={() => setTransactionDetails(item)}
          />
        );
      case 'FiatDeposit':
        return (
          <FiatWithdrawHistoryItem
            item={item}
            onPress={() => setTransactionDetails(item)}
          />
        );
      case 'FiatWithdraw':
        return (
          <FiatWithdrawHistoryItem
            item={item}
            onPress={() => setTransactionDetails(item)}
          />
        );
      case 'Withdraw':
        return (
          <WithdrawTransactionItem
            item={item}
            onPress={() => setTransactionDetails(item)}
          />
        );
      default:
        return (
          <TransactionItem
            item={item}
            onPress={() => onPressTransaction(item)}
          />
        );
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useBackHandler(() => {
    if (sheetOpened) {
      setOpen(0);
      setSheetOpened(false);
      return true;
    }
    return false;
  });

  useEffect(() => {
    setImageLoading(true);
  }, [fromCoin?.currency?.image, toCoin?.currency?.image]);

  const getStatusTranslation = (status: string) => {
    switch (status) {
      case 'Rejected':
        return t('Rejected');
      case 'Completed':
        return t('completed');
      default:
        return status;
    }
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
        <AppHeader leftIcon="back" title={t('Transactions', { ns: ['all'] })} />
        <AnimatedTabGroup
          activeTabBackground={THEME.COLORS.secondaryYellow}
          onPress={(val, index) => setSelectedIndex(index)}
          buttons={['Withdraw', 'Deposit', 'Swap', 'Transfer']}
          selectedIndex={selectedIndex}
        />
        <View style={styles.flatList}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={transactionsHistoryFiltered}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.id}
            ListEmptyComponent={
              <AppText medium style={styles.noRecord}>
                {t('Not Record Found', { ns: ['all'] })}
              </AppText>
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                tintColor={THEME.COLORS.secondaryYellow}
                onRefresh={fetchTransactions}
              />
            }
          />
        </View>
      </SafeAreaView>
      <Portal>
        <SwapHistoryBottomSheet
          sheetIndex={open}
          setSheetIndex={setOpen}
          onClose={() => setOpen(0)}
          fromCoin={fromCoin}
          toCoin={toCoin}
          txDetails={txDetails}
          getStatusTranslation={getStatusTranslation}
          coin={coin}
          imageLoading={imageLoading}
          handleImageLoaded={handleImageLoaded}
        />
      </Portal>

      <TransactionDetailsBottomSheet
        transaction={transactionDetails}
        onClose={() => setTransactionDetails(undefined)}
      />
    </>
  );
}

export default TransactionHistory;

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    marginVertical: THEME.MARGIN.LOW,
  },
  noRecord: { alignSelf: 'center', marginVertical: RF(10) },
});
