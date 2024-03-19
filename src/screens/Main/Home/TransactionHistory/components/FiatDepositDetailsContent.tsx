import React from 'react';
import { View } from 'react-native-animatable';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { Transaction } from '../../../../../__generated__/graphql';
import AppText from '../../../../../shared/components/AppText';
import { formatAssetAmmount } from '../../../../../shared/services/helper.service';
import { RF } from '../../../../../shared/theme/responsive';
import { GetImageForCoin } from '../../../../../assets/images/coins';
import RowData from './RowData';
import { styles } from './styles';
import { THEME } from '../../../../../shared/theme';
import { RootState } from '../../../../../shared/store';
import TransactionHeaderDetails from './TransactionHeaderDetails';

export interface Props {
  transaction?: Transaction;
}

export default function FiatDepositDetailsContent(props: Props) {
  const { transaction } = props;
  const payload = transaction?.payload;
  const { t } = useTranslation('all');
  const currencies = useSelector(
    (state: RootState) => state.currencies.currencies
  );
  const currency = currencies.find(
    (it) => it.legacyTicker === transaction?.movements[0].coinId
  );

  return (
    <>
      <View style={styles.bottomSheetContainer}>
        <TransactionHeaderDetails transaction={transaction} />

        <RowData
          label={t('Withdrawal Fee')}
          value={`${payload?.paymentRate?.fee || t('No Fees')}`}
          colorValue={
            !payload?.paymentRate?.fee
              ? THEME.COLORS.sharpGreen
              : THEME.COLORS.textGrey
          }
        />
      </View>

      <View style={styles.totalContainer}>
        <AppText h4 color="#979797">
          {t('You received')}
        </AppText>

        <View style={localStyles.centerAndSpacedBetween}>
          <AppText secondaryTitle semiBold>
            {formatAssetAmmount(payload?.paymentRate?.toAmount)}
          </AppText>

          <View style={localStyles.rowCenter}>
            <FastImage
              source={GetImageForCoin(currency?.ticker || '')}
              style={localStyles.toCurrencyIcon}
            />

            <View style={localStyles.rowCenter}>
              <AppText h3 medium style={localStyles.toCurrencyText}>
                {currency?.ticker?.toUpperCase()}
              </AppText>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

FiatDepositDetailsContent.defaultProps = {
  transaction: null,
};

const localStyles = StyleSheet.create({
  centerAndSpacedBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toCurrencyIcon: {
    width: RF(22),
    height: RF(22),
  },
  toCurrencyText: {
    textTransform: 'uppercase',
    marginHorizontal: RF(10),
  },
});
