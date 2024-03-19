import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ROUTE_NAMES from 'routes/RouteNames';
import AppHeader from 'shared/components/AppHeader';
import AppLoader from 'shared/components/AppLoader';
import AppText from 'shared/components/AppText';
import AttachmentView from 'shared/components/AttachmentView';
import { GenericNavigation } from 'shared/models/types';
import { THEME } from 'shared/theme';
import { Currency } from '../../../../__generated__/graphql';
import PrimaryButton from '../../../../shared/components/PrimaryButton';
import PrimaryCheckbox from '../../../../shared/components/PrimaryCheckbox';
import {
  copyToClipboard,
  handleImageUpload,
  handleUploadPdf,
  toast,
} from '../../../../shared/services/helper.service';
import {
  useCreateEntryMutation,
  usePaymentMethodsQuery,
} from '../../../../shared/store/slices/aztc-deposits/aztc-deposits.api';
import {
  PaymentMovementType,
  PaymentType,
} from '../../../../shared/store/slices/aztc-deposits/aztc-deposits.types';
import EmptyAttachmentBox, { Option } from './components/EmptyAttachmentsBox';
import styles from './styles';

function RowData({ label, value, loading, enableCopy }: any) {
  return (
    <View style={styles.rowContainer}>
      <AppText color={THEME.COLORS.textGrey}>{label}</AppText>
      {loading ? (
        <ActivityIndicator size="small" color={THEME.COLORS.secondaryYellow} />
      ) : (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {enableCopy && (
            <TouchableOpacity onPress={() => copyToClipboard(value)}>
              <MaterialCommunityIcon
                size={16}
                style={{ marginEnd: THEME.MARGIN.LOW }}
                color={THEME.COLORS.WHITE_TRANS}
                name="content-copy"
              />
            </TouchableOpacity>
          )}

          <AppText color={THEME.COLORS.textGrey}>{value}</AppText>
        </View>
      )}
    </View>
  );
}
function DepositLocalAttachmentScreen(props: GenericNavigation) {
  const coin = props?.route?.params?.coin as Currency;
  const amount = props?.route?.params?.amount || 0;
  const movementType =
    props?.route?.params?.method || PaymentMovementType.Deposit;
  const { t } = useTranslation(['all']);

  const paymentMethodsQuery = usePaymentMethodsQuery('');
  const paymentMethod = paymentMethodsQuery.data?.at(0);

  const [attachement, setAttachement] = useState<any | undefined>();
  const [termsCheck, setTermsCheck] = useState(false);
  const [iHaveMadeTheDeposit, setIHaveMadeTheDeposit] = useState(false);

  const [createEntry, createEntryResult] = useCreateEntryMutation();

  const isLoading =
    paymentMethodsQuery.isLoading || createEntryResult.isLoading;

  const handleOnChooseAttachement = async (option: Option) => {
    switch (option) {
      case 'camera':
      case 'gallery':
        handleImageUpload(option, setAttachement, (err: any) =>
          toast(t('Failed'), t(err), 'error')
        );
        break;
      case 'file':
        handleUploadPdf(setAttachement, (err: any) =>
          toast(t('Failed'), err, 'error')
        );
        break;
    }
  };
  const handleCreateDeposit = () => {
    if (!attachement) {
      toast('Error', 'Please choose an attachment.', 'error');
      return;
    }

    createEntry({
      type: PaymentType.LocalCurrency,
      fromAmount: amount,
      movementType,
      toTicker: coin.legacyTicker,
      paymentMethodId: paymentMethod?._id || '',
      transactionId: '', // TODO, send the transaction id by now is empty and it's ok.
      attachemnt: attachement,
    });
  };

  // handle mutations result
  useEffect(() => {
    if (createEntryResult.isSuccess) {
      props?.navigation?.navigate(ROUTE_NAMES.DEPOSIT_SUCCESS);
    }
    if (createEntryResult.isError) {
      // @ts-ignore
      const message = createEntryResult?.error?.data?.message;
      toast(t('Deposit failed'), t(message), 'error');
    }
  }, [createEntryResult]);

  return (
    <>
      {isLoading && <AppLoader isVisible />}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.mainContainer}>
          <AppHeader leftIcon="back" title={t('Deposit Information')} />

          <View style={styles.amountCard}>
            <AppText style={{ marginVertical: THEME.MARGIN.LOW }} medium>
              {t('Account Details')}
            </AppText>

            <RowData label={t('name')} value={paymentMethod?.name} />
            <RowData label={t('bank')} value={paymentMethod?.payload?.bank} />
            <RowData
              label={t('account_number')}
              value={paymentMethod?.payload?.accountNumber}
              enableCopy
            />
            <RowData
              label={t('clabe')}
              value={paymentMethod?.payload?.clabe}
              enableCopy
            />

            <View style={styles.finalAmountRow}>
              <AppText>{t('Amount')}</AppText>
              <AppText h3 semiBold color={THEME.COLORS.secondaryYellow}>
                {amount} {coin.legacyTicker.toUpperCase()}
              </AppText>
            </View>
          </View>

          <View style={styles.amountCard}>
            <AppText style={{ marginVertical: THEME.MARGIN.LOW }} medium>
              {t('voucher')}
            </AppText>

            {attachement ? (
              <AttachmentView
                attachment={attachement}
                onClose={() => setAttachement(undefined)}
              />
            ) : (
              <EmptyAttachmentBox onPress={handleOnChooseAttachement} />
            )}
          </View>

          <View style={{ marginTop: THEME.MARGIN.NORMAL }} />

          <PrimaryCheckbox
            checked={termsCheck}
            setChecked={setTermsCheck}
            title={t('I have read and accept the Terms & Conditions')}
          />

          <PrimaryCheckbox
            checked={iHaveMadeTheDeposit}
            setChecked={setIHaveMadeTheDeposit}
            title={t('I have made the deposit')}
          />

          <View style={{ marginTop: THEME.MARGIN.NORMAL }} />

          <PrimaryButton
            disabled={!attachement || !termsCheck || !iHaveMadeTheDeposit}
            title={t('Deposit')}
            onPress={handleCreateDeposit}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </>
  );
}

export default DepositLocalAttachmentScreen;
