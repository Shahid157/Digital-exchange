/* eslint-disable no-shadow */
export enum SwapStatus {
  Created = 'Created',
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Deleted = 'Deleted',
}

export interface SwapRateQuery {
  fromAmount: number;
  fromCurrency?: string;
  toCurrency?: string;
}

export interface SwapRateResponse {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  exchangeRate: number;
  exchangeRateDate: string;
}
export interface SwapLocalCurrency {
  fromAmount: number;
  fromCurrency: string;
  toCurrency: string;
}

export interface SwapLocalEntry {
  createdAt: Date;
  id: string;
  movements: any[];
  payload: {
    exchangeRate: number;
    exchangeRateDate: string;
    fee: number;
    fromAmount: number;
    fromCurrency: string;
    percentageFee: number;
    toAmount: number;
    toCurrency: string;
  };
  status: string;
  type: string;
  updatedAt: Date;
}
