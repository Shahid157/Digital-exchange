import { gql } from '../../../__generated__';

export const GET_MAIN_WALLET = gql(`
  query GetMainWallet {
    mainWallet {
      id
      userId
      coins {
        id
        ticker
        network
        amount
        pendingAmount
      }
      createdAt
      updatedAt
    }
  }
`);

export const WALLET_UPDATED_SUBSCRIPTION = gql(`
  subscription WalletUpdated($walletUpdatedId: String!) {
    walletUpdated(id: $walletUpdatedId) {
      id
      userId
      coins {
        id
        ticker
        network
        amount
        pendingAmount
      }
      createdAt
      updatedAt
    }
  }
`);
