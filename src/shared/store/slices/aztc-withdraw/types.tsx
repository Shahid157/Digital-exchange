/* eslint-disable no-shadow */
export enum PaymentStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Deleted = 'Deleted',
}

export enum PaymentMovementType {
  Deposit = 'Deposit',
  Transfer = 'Transfer',
}

export enum PaymentType {
  LocalCurrency = 'LocalCurrency',
}

export interface AztcWithdrawEntry {
  user: string;
  paymentMethod: string;
  status: PaymentStatus;
  type: PaymentType;
  movementType: PaymentMovementType;
  paymentRate: string;
  transactionId: string;
  paymentDate: Date;
  amount: number;
  attachments: string[];
  approvedBy?: string;
  rejectedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAztcWithdraw {
  type: string;
  movementType: string;
  fromAmount: number;
  toTicker: string;
  otpId: string;
  fromTicker: string;
  bank: string;
  accountNumber: string;
  clabe: string;
}

export interface ExchangeWithdrawRateQuery {
  fromAmount: number;
  fromTicker: string;
  toTicker: string;
}

export interface ExchangeWithdrawRateResponse {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  exchangeRate: number;
  exchangeRateDate: string;
}
