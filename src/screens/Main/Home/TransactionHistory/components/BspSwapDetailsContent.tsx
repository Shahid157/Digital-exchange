import React from 'react';
import { View } from 'react-native-animatable';
import { Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Transaction } from '../../../../../__generated__/graphql';
import AppText from '../../../../../shared/components/AppText';
import { formatAssetAmmount } from '../../../../../shared/services/helper.service';
import { GetImageForCoin } from '../../../../../assets/images/coins';
import RowData from './RowData';
import { styles } from './styles';
import { THEME } from '../../../../../shared/theme';
import { RootState } from '../../../../../shared/store';
import TransactionHeaderDetails from './TransactionHeaderDetails';
import AnyIcon, { Icons } from '../../../../../shared/components/AnyIcon';

export interface Props {
  transaction?: Transaction;
}

export default function BspSwapDetailsContent(props: Props) {
  const { transaction } = props;
  const payload = transaction?.payload;
  const { t } = useTranslation('all');
  const currencies = useSelector(
    (state: RootState) => state.currencies.currencies
  );
  const fromCurrency = currencies.find(
    (it) => it.legacyTicker === payload.fromCurrency
  );

  const toCurrency = currencies.find(
    (it) => it.legacyTicker === payload.toCurrency
  );

  let feeRowText = t('No Fees');
  const feeRowColor = !payload?.fee
    ? THEME.COLORS.sharpGreen
    : THEME.COLORS.textGrey;
  if (payload?.fee) {
    feeRowText = `${payload?.fee} ${fromCurrency?.ticker.toUpperCase()}`;
  }

  const rateFormatted = formatAssetAmmount(payload?.exchangeRate);

  return (
    <>
      <View style={styles.bottomSheetContainer}>
        <TransactionHeaderDetails transaction={transaction} />

        <RowData label={t('Fee')} value={feeRowText} colorValue={feeRowColor} />

        <RowData
          label={t('Exchange Rate')}
          value={`1 ${fromCurrency?.ticker.toUpperCase()} ≈ ${rateFormatted} ${toCurrency?.ticker.toUpperCase()}`}
          colorValue={feeRowColor}
        />
      </View>

      <View style={[styles.totalContainer, styles.container]}>
        <View style={[styles.subContainer, { alignItems: 'flex-start' }]}>
          <View style={styles.coinItem}>
            <Image
              style={styles.coinIcon}
              source={GetImageForCoin(fromCurrency?.ticker || '')}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AppText medium style={[styles.coinName]}>
                {fromCurrency?.ticker?.toUpperCase()}
              </AppText>
            </View>
          </View>
          <AppText
            style={{ textAlign: 'center' }}
            semiBold
            color={THEME.COLORS.white}
          >
            {formatAssetAmmount(payload?.fromAmount)}{' '}
          </AppText>
        </View>

        <View style={styles.subContainer}>
          <AnyIcon
            type={Icons.AntDesign}
            name="arrowright"
            size={20}
            color={THEME.COLORS.secondaryYellow}
          />
        </View>

        <View style={[styles.subContainer, { alignItems: 'flex-end' }]}>
          <View style={styles.coinItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AppText medium style={[styles.coinName]}>
                {toCurrency?.ticker?.toUpperCase()}
              </AppText>
            </View>
            <Image
              style={styles.coinIcon}
              source={GetImageForCoin(toCurrency?.ticker || '')}
            />
          </View>

          <AppText
            style={{ textAlign: 'center' }}
            semiBold
            color={THEME.COLORS.white}
          >
            {formatAssetAmmount(payload?.toAmount)}{' '}
          </AppText>
        </View>
      </View>
    </>
  );
}

BspSwapDetailsContent.defaultProps = {
  transaction: null,
};
