import { Coin, Currency } from '../../__generated__/graphql';

export * from './KYCTypes';

export interface CoinWithCurrency extends Coin {
  currency: Currency;
}
