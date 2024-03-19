import React, { useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import AnimatedTabGroup from 'shared/components/AnimatedTabGroup';
import AppText from 'shared/components/AppText';
import { toast } from 'shared/services/helper.service';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { useTranslation } from 'react-i18next';
import TransferHistoryItemDailyEarn from 'shared/components/TransferHistoryItemDailyEarn';
import AppHeader from '../../../../shared/components/AppHeader';
import { GenericNavigation } from '../../../../shared/models/types';
import useEntriesWithEarns, {
  EntryWithEarns,
} from './hooks/useEntriesWithEarns';
import {
  StakingEntryStatus,
  StakingPolicy,
  StakingTypes,
} from '../../../../shared/store/slices/stakings/staking.types';
import HistoryDetailsBottomSheet from './component/HistoryDetailsBottomSheet';
import {
  useChangeEntryPolicyMutation,
  useStakingEarnsQuery,
  useStakingEntriesQuery,
} from '../../../../shared/store/slices/stakings/stakings.api';

function DailyEarnHistory(props: GenericNavigation) {
  const type = props?.route?.params?.type || StakingTypes.DailyEarns;
  const { t } = useTranslation(['all']);
  const [sheetOpened, setSheetOpened] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [entry, setEntry] = useState<EntryWithEarns | undefined>();

  const entriesQuery = useStakingEntriesQuery('stakingEntries');
  const earnsQuery = useStakingEarnsQuery('stakingEarns');
  const entriesWithEarns = useEntriesWithEarns(
    entriesQuery.data?.filter((it) => it.snapshot.type === type) || [],
    earnsQuery.data || []
  );

  const [changePolicy, changePolicyResult] = useChangeEntryPolicyMutation();

  const refreshing =
    entriesQuery.isFetching ||
    earnsQuery.isFetching ||
    changePolicyResult.isLoading;

  const onPressTransaction = (item: any) => {
    setEntry(item);
    setSheetOpened(true);
  };

  const handleChangePolicy = async (id: string) => {
    changePolicy({
      policy: StakingPolicy.RefundOnComplete,
      entryId: id,
    });
  };

  const renderItem = (item: EntryWithEarns) => (
    <TransferHistoryItemDailyEarn
      item={item}
      onPressTransaction={() => onPressTransaction(item)}
    />
  );

  function ListEmptyComponent() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <AppText medium style={styles.noRecord}>
          {t('Not Record Found')}
        </AppText>
      </View>
    );
  }

  useEffect(() => {
    if (changePolicyResult.isSuccess) {
      toast(t('Successful'), t('UpdatePoliciesStackSuccess'), 'success');
      setSheetOpened(false);
      setEntry(undefined);
    }
    if (changePolicyResult.isError) {
      // @ts-ignore
      const { message } = changePolicyResult.error.data;
      toast(t('Failed'), t(message), 'error');
    }
  }, [changePolicyResult]);

  return (
    <SafeAreaView style={styles.root}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={entriesWithEarns.filter((item) => {
          if (selectedIndex === 0) {
            return item.status === StakingEntryStatus.Active;
          }
          return item.status === StakingEntryStatus.Completed;
        })}
        ListHeaderComponent={
          <>
            <AppHeader
              headerStyle={styles.headerStyle}
              leftIcon="back"
              title={t('History')}
            />

            <AnimatedTabGroup
              activeTabBackground={THEME.COLORS.secondaryYellow}
              onPress={(val, index) => setSelectedIndex(index)}
              buttons={[t('Active'), t('Completed')]}
              selectedIndex={selectedIndex}
            />
          </>
        }
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item: EntryWithEarns) => item._id}
        ListEmptyComponent={ListEmptyComponent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            tintColor={THEME.COLORS.secondaryYellow}
            onRefresh={() => {
              earnsQuery.refetch();
              entriesQuery.refetch();
            }}
          />
        }
      />

      <HistoryDetailsBottomSheet
        open={sheetOpened}
        setOpen={setSheetOpened}
        onChangePolicy={handleChangePolicy}
        entry={entry}
      />
    </SafeAreaView>
  );
}

export default DailyEarnHistory;

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'black',
    flex: 1,
  },
  headerStyle: {
    paddingStart: THEME.MARGIN.LOW,
  },
  noRecord: {
    alignSelf: 'center',
    marginVertical: RF(10),
  },
});
