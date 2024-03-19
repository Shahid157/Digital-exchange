import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useBackHandler } from '@react-native-community/hooks';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import { THEME } from '../../../../../shared/theme';
import AppText from '../../../../../shared/components/AppText';
import Divider from '../../../../../shared/components/Dividers';
import RowData from './RowData';
import { formatAssetAmmount } from '../../../../../shared/services/helper.service';
import { getStatusTranslation } from '../helpers/helpers';
import {
  StakingPolicy,
  StakingEntryStatus,
  StakingTypes,
} from '../../../../../shared/store/slices/stakings/staking.types';
import { RF } from '../../../../../shared/theme/responsive';
import SecondaryButton from '../../../../../shared/components/SecondaryButton';
import { GetImageForCoin } from '../../../../../assets/images/coins';
import { HistoryDetailsBottomSheetProps } from '../../types';

export default function HistoryDetailsBottomSheet(
  props: HistoryDetailsBottomSheetProps
) {
  const { open, entry, onChangePolicy, setOpen } = props;
  const { t } = useTranslation('all');
  const [index, setIndex] = useState(0);
  const snapPoints = useMemo(
    () => [
      0.1,
      entry?.snapshot?.policy === StakingPolicy.ReenterOnComplete
        ? '45%'
        : '40%',
    ],
    [entry]
  );
  const isDaily = entry?.snapshot?.type === StakingTypes.DailyEarns;

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    []
  );

  useBackHandler(() => {
    if (open) {
      setOpen(false);
      return true;
    }
    return false;
  });

  const getStatusColor = (status?: StakingEntryStatus) => {
    switch (status) {
      case StakingEntryStatus.Completed:
        return THEME.COLORS.errorRed;
      case StakingEntryStatus.Active:
        return THEME.COLORS.sharpGreen;
      default:
        return THEME.COLORS.secondaryYellow;
    }
  };

  useEffect(() => {
    const idx = open ? 1 : 0;
    setIndex(idx);
  }, [open]);

  return (
    <BottomSheet
      index={index}
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={styles.backgroundStyle}
      onClose={() => setOpen(false)}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={styles.handleIndicatorStyle}
    >
      <View style={styles.bottomSheetContainer}>
        <AppText h3 medium>
          {t('Staking Details')}
        </AppText>

        <Divider />

        <RowData
          label={t('Status')}
          value={getStatusTranslation(entry?.status, t)}
          colorValue={getStatusColor(entry?.status)}
        />

        <RowData
          label={
            entry?.snapshot?.policy === StakingPolicy.RefundOnComplete
              ? t('Time to Refund')
              : t('Time to Finish')
          }
          value={moment(entry?.nextRewardDate).format('DD/MM/YYYY, HH:MM')}
        />

        {!isDaily && (
          <RowData
            label={t('est. reward')}
            value={`${
              entry &&
              formatAssetAmmount((entry.amount * entry.snapshot.profit) / 100)
            }`}
          />
        )}

        <Divider />
      </View>

      <View style={styles.totalContainer}>
        <View style={styles.flexRow}>
          <AppText secondaryTitle semiBold style={{ marginTop: 5 }}>
            {formatAssetAmmount(entry?.amount || 0)}
          </AppText>

          <View style={styles.flexRow}>
            <FastImage
              source={GetImageForCoin(entry?.currency.toUpperCase() || '')}
              style={{ width: RF(22), height: RF(22) }}
              resizeMode="contain"
            />

            <View>
              <View style={styles.flexRow}>
                <AppText
                  h3
                  medium
                  style={{
                    marginHorizontal: RF(10),
                  }}
                >
                  {entry?.currency.toUpperCase()}
                </AppText>
              </View>
            </View>
          </View>
        </View>

        {entry?.snapshot?.policy === StakingPolicy.ReenterOnComplete && (
          <SecondaryButton
            buttonStyle={styles.withdrawButton}
            textStyle={{
              color: THEME.COLORS.secondaryBackground,
              textAlign: 'center',
            }}
            title={t('Withdraw')}
            onPress={() =>
              onChangePolicy(entry?._id || '', StakingPolicy.RefundOnComplete)
            }
          />
        )}
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    padding: THEME.PADDING.NORMAL,
  },
  backgroundStyle: {
    backgroundColor: '#181818',
  },
  handleIndicatorStyle: {
    backgroundColor: THEME.COLORS.inputGrey,
  },
  totalContainer: {
    backgroundColor: '#262626',
    padding: 12,
    marginHorizontal: 12,
    borderRadius: THEME.RADIUS.BOX,
    zIndex: 9,
    position: 'relative',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  withdrawButton: {
    backgroundColor: THEME.COLORS.secondaryYellow,
    color: THEME.COLORS.secondaryBackground,
  },
});
