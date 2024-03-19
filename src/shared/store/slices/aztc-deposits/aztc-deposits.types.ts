/* eslint-disable no-shadow */
export enum PaymentMethodStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Deleted = 'Deleted',
}

export enum PaymentMethodTypes {
  Fiat = 'Fiat',
  Crypto = 'Crypto',
  Cash = 'Cash',
}

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

export interface AztcDepositPaymentMethod {
  _id: string;
  name: string;
  status: PaymentMethodStatus;
  type: PaymentMethodTypes;
  legacyTicker: string;
  payload: Record<string, any>;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AztcDepositPaymentEntry {
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

export interface CreateAztcDepositPaymentEntry {
  paymentMethodId: string;
  type: PaymentType;
  movementType: PaymentMovementType;
  fromAmount: number;
  transactionId: string;
  toTicker: string;
  attachemnt: Blob;
}

export interface ExchangeRateQuery {
  paymentMethodId: string;
  fromAmount: number;
  toTicker: string;
}

export interface ExchangeRateResponse {
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
  exchangeRate: number;
  exchangeRateDate: string;
}

export const DepositMethodNames = Object.values(PaymentMovementType);

export const AZTEC_TICKER = 'aztec';
export const DBSP_TICKER = 'dbsp';
export const BSP_TICKER = 'bsp';
