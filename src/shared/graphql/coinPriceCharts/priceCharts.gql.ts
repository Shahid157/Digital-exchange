import { gql } from '../../../__generated__';

export const GET_CURRENCY_TIMELINES = gql(/* GraphQL */ `
  query GetCurrencyTimelines {
    getCurrencyTimelines {
      ticker
      price
      updatedAt
      createdAt
    }
  }
`);

export const TIMELINE_SUBSCRIPTION = gql(/* GraphQL */ `
  subscription TimelineUpdated {
    timelineUpdated {
      ticker
      price
      updatedAt
      createdAt
    }
  }
`);
