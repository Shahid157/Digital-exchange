import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Portal } from '@gorhom/portal';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import AppHeader from 'shared/components/AppHeader';
import AppText from 'shared/components/AppText';
import PrimaryButton from 'shared/components/PrimaryButton';
import {
  copyToClipboard,
  getNormalizedError,
} from 'shared/services/helper.service';
import { THEME } from 'shared/theme';
import { depositStatus } from 'shared/services/deposit.services';
import moment from 'moment';
import ROUTE_NAMES from 'routes/RouteNames';
import { useTranslation } from 'react-i18next';
import AppLoader from '../../../../../shared/components/AppLoader';
import styles from './styles';
import { GenericNavigation } from '../../types';
import DepositStatusBottomSheet from './components/DepositStatusBottomSheet';

function DepositStatus(props: GenericNavigation) {
  const { address, validUntil, depositFee, finalAmount, currency, id }: any =
    props?.route?.params;
  const [loading, setLoading] = useState(false);
  const [sheetIndex, setSheetIndex] = useState(0);
  const { t } = useTranslation(['all']);

  const getDepositStatus = async (id: any) => {
    try {
      const res = await depositStatus(id);
    } catch (e) {
      const error = getNormalizedError(e);
    }
  };

  useEffect(() => {
    getDepositStatus(id);
  }, [id]);

  function RowData({ label, value, loading }: any) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: THEME.MARGIN.LOW,
        }}
      >
        <AppText color={THEME.COLORS.textGrey}>{label}</AppText>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={THEME.COLORS.secondaryYellow}
          />
        ) : (
          <AppText color={THEME.COLORS.textGrey}>{value}</AppText>
        )}
      </View>
    );
  }

  const onClose = () => {
    setSheetIndex(0);
    props?.navigation?.navigate(ROUTE_NAMES.HOME);
  };

  return (
    <>
      {loading && <AppLoader isVisible />}
      <SafeAreaView style={styles.mainContainer}>
        <AppHeader leftIcon="back" title={t('Review')} />
        <AppText
          style={{ marginTop: THEME.MARGIN.NORMAL }}
          secondaryTitle
          medium
        >
          {t('Please deposit your funds into this wallet')}
        </AppText>
        <AppText
          color={THEME.COLORS.textGrey}
          style={{ marginVertical: THEME.MARGIN.NORMAL }}
        >
          {t(
            'Once you deposit the funds, it can take up to 5 minutes to reflect in your account, in some case it could take longer'
          )}
        </AppText>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => copyToClipboard(address)}
            style={styles.inputContainer}
          >
            <View style={{ flex: 0.8 }}>
              <AppText
                color={THEME.COLORS.textGrey}
                style={{ marginBottom: THEME.MARGIN.VERYLOW }}
              >
                {`${currency.toUpperCase()} ${t('Deposit Address')}`}
              </AppText>
              <AppText medium>{address}</AppText>
            </View>
            <AnyIcon
              disabled
              type={Icons.Foundation}
              name="page-copy"
              size={20}
              color={THEME.COLORS.white}
            />
          </TouchableOpacity>

          <View style={styles.amountCard}>
            <AppText style={{ marginVertical: THEME.MARGIN.LOW }} medium>
              {t('Summary')}
            </AppText>
            <RowData
              label={t('Desposit Fee')}
              value={
                depositFee ? `${depositFee} ${currency.toUpperCase()}` : '--'
              }
            />

            <View style={styles.finalAmountRow}>
              <AppText>{t('You will get')}</AppText>

              <AppText h3 semiBold color={THEME.COLORS.secondaryYellow}>
                {finalAmount
                  ? `${finalAmount} ${currency.toUpperCase()}`
                  : '--'}
              </AppText>
            </View>
          </View>

          <View style={{ flex: 1 }} />
          <PrimaryButton title={t('Close')} onPress={() => setSheetIndex(1)} />
        </View>
      </SafeAreaView>
      <Portal>
        <DepositStatusBottomSheet
          sheetIndex={sheetIndex}
          setSheetIndex={setSheetIndex}
          onClose={onClose}
        />
      </Portal>
    </>
  );
}

export default DepositStatus;
