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
import TransactionHeaderDetails from './TransactionHeaderDetails';
import NetworkTag from '../../../../../shared/components/NetworkTag';
import { RootState } from '../../../../../shared/store';

export interface Props {
  transaction?: Transaction;
}

export default function WithdrawDetailsContent(props: Props) {
  const { transaction } = props;
  const payload = transaction?.payload;
  const { t } = useTranslation('all');

  const currencies = useSelector(
    (state: RootState) => state.currencies.currencies
  );
  const movement = transaction?.movements[0];
  const currency = currencies.find(
    (it) => it.legacyTicker === movement?.coinId
  );

  return (
    <>
      <View style={styles.bottomSheetContainer}>
        <TransactionHeaderDetails transaction={transaction} />

        <RowData label={t('To Address')} value={payload?.payoutAddress} />

        <RowData
          label={t('Network')}
          value={currency?.network?.toUpperCase() || ''}
        />

        {/* <RowData
          label={t('Withdrawal Fee')}
          value={`${payload?.withdrawRate?.fee || t('No Fees')}`}
          colorValue={
            !payload?.withdrawRate?.fee
              ? THEME.COLORS.sharpGreen
              : THEME.COLORS.textGrey
          }
        /> */}
      </View>

      <View style={styles.totalContainer}>
        <AppText h4 color="#979797">
          {t('You withdrew')}
        </AppText>

        <View style={localStyles.centerAndSpacedBetween}>
          <AppText secondaryTitle semiBold>
            {formatAssetAmmount(movement?.amount)}
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

              <NetworkTag network={currency?.network || ''} />
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

WithdrawDetailsContent.defaultProps = {
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
