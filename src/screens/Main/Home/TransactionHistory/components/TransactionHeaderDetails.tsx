import React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import AppText from '../../../../../shared/components/AppText';
import Divider from '../../../../../shared/components/Dividers';
import RowData from './RowData';
import {
  Transaction,
  TransactionStatus,
} from '../../../../../__generated__/graphql';
import {
  getColorForTransactionStatus,
  getStatusTranslation,
} from '../../DailyEarnHistory/helpers/helpers';

export interface Props {
  transaction?: Transaction;
}

const FinalTransactionStatus: string[] = [
  TransactionStatus.Completed,
  TransactionStatus.Failed,
  TransactionStatus.Rejected,
];

export default function TransactionHeaderDetails(props: Props) {
  const { transaction } = props;
  const { t } = useTranslation('all');
  const isInFinalStatus = FinalTransactionStatus.includes(
    transaction?.status || ''
  );

  return (
    <>
      <AppText h3 medium>
        {t('Transaction Details')}
      </AppText>

      <Divider />

      <RowData label={t('Internal ID')} value={transaction?.id || '-'} />

      <RowData
        label={t('Status')}
        value={getStatusTranslation(transaction?.status, t)}
        colorValue={getColorForTransactionStatus(transaction?.status)}
      />

      <RowData
        label={t('Time Initiated')}
        value={moment(transaction?.createdAt).format('DD/MM/YYYY, HH:mm a')}
      />

      {isInFinalStatus && (
        <RowData
          label={t('Time Completed')}
          value={moment(transaction?.updatedAt).format('DD/MM/YYYY, HH:mm a')}
        />
      )}

      <Divider />
    </>
  );
}

TransactionHeaderDetails.defaultProps = {
  transaction: null,
};
