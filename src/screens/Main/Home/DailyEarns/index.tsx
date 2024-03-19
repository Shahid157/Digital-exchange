import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, RefreshControl } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';
import { useWalletWithCoins } from 'screens/Main/Home/hooks/useWalletWithCoins';
import styles from './styles';
import { GenericNavigation } from '../types';
import {
  useCreateEntryMutation,
  useStakingEarnsQuery,
  useStakingEntriesQuery,
  useStakingsQuery,
} from '../../../../shared/store/slices/stakings/stakings.api';
import {
  STAKING_CURRENCY_LEGACY_TICKER,
  StakingTypes,
} from '../../../../shared/store/slices/stakings/staking.types';
import BalancesCard from './components/BalancesCard';
import DepositBottomSheet from './components/DepositBottomSheet';
import useEarnedPnls from './hooks/usePnls';
import PnlCard from './components/PnlCard';
import { toast } from '../../../../shared/services/helper.service';
import DespositSection from './components/DepositSection';
import Header from './components/Header';
import AppLoader from '../../../../shared/components/AppLoader';
import { THEME } from '../../../../shared/theme';
import { useAppDispatch } from '../../../../shared/hooks/redux';
import { emitRefreshWalletSubscription } from '../../../../shared/store/slices/oneTimeEvents/oneTimeEvents.slice';
import useEarns from '../../../../shared/store/slices/stakings/helpers/useEarns';
import useEntries from '../../../../shared/store/slices/stakings/helpers/useEntries';

function DailyEarns(props: GenericNavigation) {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(0);
  const [amountStr, setAmountStr] = useState('');
  const [depositBottomSheetOpen, setDepositBottomSheetOpen] = useState(false);
  const { t } = useTranslation('all');

  const wallet = useWalletWithCoins();
  const [createEntry, createEntryResult] = useCreateEntryMutation();
  const stakingsQuery = useStakingsQuery('stakings');
  const stakingEntries = useStakingEntriesQuery('stakingEntries');
  const earnTransactionQuery = useStakingEarnsQuery(wallet.data?.id || '', {
    skip: !wallet.data?.id,
  });

  const earns = useEarns(
    STAKING_CURRENCY_LEGACY_TICKER,
    earnTransactionQuery.data
  );
  const entries = useEntries(StakingTypes.DailyEarns, stakingEntries.data);
  const stakedAmount = useMemo(
    () =>
      entries.reduce(
        (acc: number, item: { amount: number }) => acc + item.amount,
        0
      ),
    [entries]
  );
  const coin = useMemo(
    () =>
      wallet.data?.coins.find(
        (item) => item.id === STAKING_CURRENCY_LEGACY_TICKER
      ),
    [wallet]
  );
  const staking = stakingsQuery.data?.find(
    (item) => item.type === StakingTypes.DailyEarns
  );
  const pnls = useEarnedPnls(earns);

  const loading =
    createEntryResult.isLoading ||
    stakingsQuery.isLoading ||
    stakingEntries.isLoading ||
    earnTransactionQuery.isLoading;
  const refresh =
    stakingsQuery.isFetching ||
    stakingEntries.isFetching ||
    earnTransactionQuery.isFetching;

  const handleCreaateStaking = async () => {
    createEntry({
      staking: staking?._id || '',
      currency: STAKING_CURRENCY_LEGACY_TICKER,
      amount,
    });
  };

  const handleOnDepositClick = () => {
    setDepositBottomSheetOpen(true);
  };

  // handle mutations result
  useEffect(() => {
    if (createEntryResult.isSuccess) {
      toast(
        t('Deposit successfully'),
        t('Stake created successfully'),
        'success'
      );
      setAmount(0);
      setAmountStr('');
      setDepositBottomSheetOpen(false);
      dispatch(emitRefreshWalletSubscription());
    }
    if (createEntryResult.isError) {
      // @ts-ignore
      const { message } = createEntryResult.error.data;
      toast(t('Deposit failed'), t(message), 'error');
    }
  }, [createEntryResult]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            tintColor={THEME.COLORS.secondaryYellow}
            onRefresh={() => {
              stakingsQuery.refetch();
              stakingEntries.refetch();
              earnTransactionQuery.refetch();
            }}
          />
        }
      >
        {loading && <AppLoader isVisible />}

        <Header />
        <BalancesCard coin={coin} stakedAmount={stakedAmount} />
        <PnlCard coin={coin} pnls={pnls} staking={staking} />
        <DespositSection
          coin={coin}
          staking={staking}
          amount={amount}
          amountStr={amountStr}
          setAmountStr={setAmountStr}
          setAmount={setAmount}
          onDeposit={handleOnDepositClick}
        />
        <DepositBottomSheet
          amount={amount}
          coin={coin}
          profit={staking?.profit}
          open={depositBottomSheetOpen}
          setOpen={setDepositBottomSheetOpen}
          onDeposit={handleCreaateStaking}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default DailyEarns;
