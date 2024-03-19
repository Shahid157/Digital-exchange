import { gql } from '../../../__generated__';

export const GET_CURRENCIES = gql(/* GraphQL */ `
  query GetCurrencies {
    currencies {
      ticker
      name
      image
      hasExternalId
      isFiat
      featured
      isStable
      supportsFixedRate
      network
      tokenContract
      buy
      sell
      legacyTicker
      price
      lastPriceUpdated
      enabled
      isLocal
    }
  }
`);

export const CURRENCIES_SUBSCRIPTION = gql(/* GraphQL */ `
  subscription CurrenciesUpdated {
    currenciesUpdated {
      ticker
      name
      image
      hasExternalId
      isFiat
      featured
      isStable
      supportsFixedRate
      network
      tokenContract
      buy
      sell
      legacyTicker
      price
      lastPriceUpdated
      enabled
      isLocal
    }
  }
`);
