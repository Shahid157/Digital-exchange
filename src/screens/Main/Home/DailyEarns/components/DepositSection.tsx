import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { RF } from '../../../../../shared/theme/responsive';
import AppText from '../../../../../shared/components/AppText';
import { numberRoundDown } from '../../../../../shared/utils/numberRoundDown';
import { THEME } from '../../../../../shared/theme';
import SummaryCard from './SummaryCard';
import PrimaryButton from '../../../../../shared/components/PrimaryButton';
import CoinInput from './CoinInput';
import { COLORS } from '../../../../../shared/constants/theme';
import { DepositSectionProps } from '../../types';

export default function DespositSection(props: DepositSectionProps) {
  const {
    amount,
    setAmount,
    coin,
    staking,
    onDeposit,
    amountStr,
    setAmountStr,
  } = props;
  const { t } = useTranslation('all');
  const [amountError, setAmountError] = useState('');

  const changeTextDebounced = (text: string) => {
    if (isNaN(Number(text))) {
      setAmount(0);
      setAmountError('invalid amount');
      return;
    }
    const value = Number(text);
    setAmount(Number(text));
    if (value > (coin?.amount || 0)) {
      setAmountError(t('Amount should be less then available balance'));
      return;
    }
    setAmountError('');
  };

  const changeTextDebouncer = useCallback(
    debounce(changeTextDebounced, 500),
    []
  );

  const setMaxValue = () => {
    const numerRoundDown = numberRoundDown(coin?.amount || 0, 6);
    setAmountStr(numerRoundDown);
    setAmount(parseFloat(numerRoundDown));
  };

  return (
    <View style={{ flex: 0.52, padding: RF(10) }}>
      <AppText h2 medium style={{ marginTop: RF(5) }}>
        {t('Deposit & Earn')} {coin?.ticker.toUpperCase()}
      </AppText>

      <CoinInput
        hideChevron
        placeholder="0.00"
        value={amountStr}
        onChangeText={(text) => {
          setAmountStr(text);
          changeTextDebouncer(text);
        }}
        showRightText
        rightText={t('Max')}
        coin={coin}
        onPressRightText={setMaxValue}
        inputStyle={{
          backgroundColor: COLORS.marketHeader,
          elevation: 20,
          shadowColor: '0px 0px 18px 0px rgba(0, 0, 0, 0.20)',
        }}
      />

      {amountError && (
        <AppText
          color={THEME.COLORS.secondaryYellow}
          style={{ marginVertical: THEME.MARGIN.SUPERLOW }}
          medium
        >
          {amountError}
        </AppText>
      )}

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <AppText medium>{t('Available')}:</AppText>
        <AppText style={{ paddingStart: THEME.MARGIN.VERYLOW }}>
          {numberRoundDown(coin?.amount || 0, 6)} {coin?.ticker.toUpperCase()}
        </AppText>
      </View>

      <SummaryCard amount={amount} coin={coin} staking={staking} />

      <PrimaryButton
        textStyle={{
          color: THEME.COLORS.secondaryBackground,
          textAlign: 'center',
        }}
        title={t('Deposit & Earn')}
        onPress={onDeposit}
        disabled={(coin && amount > coin?.amount) || !amount}
      />
    </View>
  );
}
