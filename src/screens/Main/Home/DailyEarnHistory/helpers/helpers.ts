/* eslint-disable default-param-last */
import { TransactionStatus } from '../../../../../__generated__/graphql';
import { THEME } from '../../../../../shared/theme';

export const getStatusTranslation = (
  status: string = '',
  t: (_: string) => string
) => {
  switch (status) {
    case 'Active':
      return t('Active');
    case 'Completed':
      return t('completed');
    default:
      return status;
  }
};

export const getColorForTransactionStatus = (
  status?: TransactionStatus | undefined
) => {
  switch (status) {
    case TransactionStatus.Completed:
      return THEME.COLORS.sharpGreen;
    case TransactionStatus.Rejected:
    case TransactionStatus.Failed:
      return THEME.COLORS.errorRed;
    case TransactionStatus.InProgress:
      return THEME.COLORS.lightBlue;
    case TransactionStatus.PendingToApproval:
    case TransactionStatus.PendingToClaim:
      return THEME.COLORS.secondaryYellow;
    default:
      return THEME.COLORS.textGrey;
  }
};
