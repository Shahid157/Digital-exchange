/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** Date custom scalar type */
  DateTime: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
};

export type AdminLoginInput = {
  deviceId: Scalars['String']['input'];
  newIpVerificationCode: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type AdminRole = {
  __typename?: 'AdminRole';
  createdAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  permissions: Array<Scalars['String']['output']>;
  readOnly: Scalars['Boolean']['output'];
  status: AdminRolesStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type AdminRoleCreateInput = {
  name: Scalars['String']['input'];
  permissions: Array<Scalars['String']['input']>;
  readOnly: Scalars['Boolean']['input'];
};

export type AdminRoleUpdateInput = {
  name: Scalars['String']['input'];
  permissions: Array<Scalars['String']['input']>;
  readOnly: Scalars['Boolean']['input'];
};

export enum AdminRolesStatus {
  Created = 'Created',
  Deleted = 'Deleted',
}

export type AdminUser = {
  __typename?: 'AdminUser';
  createdBy: AdminUserCreatedBy;
  email: Scalars['String']['output'];
  lastLogin: Scalars['DateTime']['output'];
  password: Scalars['String']['output'];
  profile: AdminUserProfile;
  readOnly: Scalars['Boolean']['output'];
  roles: Array<AdminRole>;
  username: Scalars['String']['output'];
};

export type AdminUserCreatedBy = {
  __typename?: 'AdminUserCreatedBy';
  fullName?: Maybe<Scalars['String']['output']>;
  userId: AdminUser;
  username?: Maybe<Scalars['String']['output']>;
};

export type AdminUserProfile = {
  __typename?: 'AdminUserProfile';
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  photo?: Maybe<Scalars['DateTime']['output']>;
};

export type Coin = {
  __typename?: 'Coin';
  amount: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  network: Scalars['String']['output'];
  pendingAmount: Scalars['Float']['output'];
  ticker: Scalars['String']['output'];
};

export type CreateAdminUserInput = {
  dateOfBirth: Scalars['DateTime']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  roles: Array<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

export type CreateDepositInput = {
  amount: Scalars['Float']['input'];
  legacyTicker: Scalars['String']['input'];
  network: Scalars['String']['input'];
  ticker: Scalars['String']['input'];
};

export type Currency = {
  __typename?: 'Currency';
  buy: Scalars['Boolean']['output'];
  enabled: Scalars['Boolean']['output'];
  featured: Scalars['Boolean']['output'];
  hasExternalId: Scalars['Boolean']['output'];
  image: Scalars['String']['output'];
  icon: Scalars['String']['output'];
  isFiat: Scalars['Boolean']['output'];
  isLocal: Scalars['Boolean']['output'];
  isStable: Scalars['Boolean']['output'];
  lastPriceUpdated?: Maybe<Scalars['DateTime']['output']>;
  legacyTicker: Scalars['String']['output'];
  name: Scalars['String']['output'];
  network: Scalars['String']['output'];
  price?: Maybe<Scalars['Float']['output']>;
  sell: Scalars['Boolean']['output'];
  supportsFixedRate: Scalars['Boolean']['output'];
  ticker: Scalars['String']['output'];
  tokenContract?: Maybe<Scalars['String']['output']>;
};

export type CurrencyBalance = {
  __typename?: 'CurrencyBalance';
  db: Scalars['Float']['output'];
  diff: Scalars['Float']['output'];
  legacyTicker: Scalars['String']['output'];
  pool: Scalars['Float']['output'];
};

export type CurrencyTimeline = {
  __typename?: 'CurrencyTimeline';
  createdAt: Scalars['DateTime']['output'];
  price: Array<Scalars['Float']['output']>;
  ticker: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type File = {
  __typename?: 'File';
  name: Scalars['String']['output'];
  size: Scalars['Float']['output'];
  type: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Foo = {
  __typename?: 'Foo';
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAdminRole: AdminRole;
  createAdminUser: AdminUser;
  createDepositTransaction: Transaction;
  deleteAdminRole: AdminRole;
  login: AdminUser;
  refreshToken: AdminUser;
  remove: AdminUser;
  update: AdminUser;
  updateAdminRole: AdminRole;
  updateFoo: Foo;
  updateWallet: Wallet;
};

export type MutationCreateAdminRoleArgs = {
  body: AdminRoleCreateInput;
};

export type MutationCreateAdminUserArgs = {
  body: CreateAdminUserInput;
};

export type MutationCreateDepositTransactionArgs = {
  createDepositData: CreateDepositInput;
};

export type MutationDeleteAdminRoleArgs = {
  id: Scalars['String']['input'];
};

export type MutationLoginArgs = {
  body: AdminLoginInput;
  ip: Scalars['String']['input'];
};

export type MutationRefreshTokenArgs = {
  ip: Scalars['String']['input'];
  refreshToken: Scalars['String']['input'];
};

export type MutationRemoveArgs = {
  id: Scalars['String']['input'];
};

export type MutationUpdateArgs = {
  body: UpdateAdminUserInput;
  id: Scalars['String']['input'];
};

export type MutationUpdateAdminRoleArgs = {
  body: AdminRoleUpdateInput;
  id: Scalars['String']['input'];
};

export type MutationUpdateFooArgs = {
  message: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  currencies: Array<Currency>;
  getAdminUserById: AdminUser;
  getAdminUserByUsername: Array<AdminUser>;
  getAllAdminRoles: Array<AdminRole>;
  getAllAdminUser: Array<AdminUser>;
  getCurrencyTimelines: Array<CurrencyTimeline>;
  getFoo: Foo;
  getRolesById: AdminRole;
  mainWallet: Wallet;
  tokens: Array<Token>;
  transaction: Transaction;
  wallets: Array<Wallet>;
};

export type QueryGetAdminUserByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryGetAdminUserByUsernameArgs = {
  username: Scalars['String']['input'];
};

export type QueryGetRolesByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryTransactionArgs = {
  id: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  currenciesUpdated: Array<Currency>;
  fooUpdated: Foo;
  timelineUpdated: Array<CurrencyTimeline>;
  tokenPrices: Array<TokenPrice>;
  transactionUpdated: Transaction;
  walletUpdated: Wallet;
};

export type SubscriptionTransactionUpdatedArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionWalletUpdatedArgs = {
  id: Scalars['String']['input'];
};

export type Token = {
  __typename?: 'Token';
  featured: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  lastUpdate: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  symbol: Scalars['String']['output'];
};

export type TokenPrice = {
  __typename?: 'TokenPrice';
  id: Scalars['String']['output'];
  price: Scalars['Float']['output'];
};

export type Transaction = {
  __typename?: 'Transaction';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  movements: Array<TransactionMovement>;
  payload?: Maybe<Scalars['JSON']['output']>;
  status: TransactionStatus;
  type: TransactionTypes;
  updatedAt: Scalars['DateTime']['output'];
};

export type TransactionMovement = {
  __typename?: 'TransactionMovement';
  amount: Scalars['Float']['output'];
  coinId: Scalars['String']['output'];
  type: TransactionMovementTypes;
  wallet: Scalars['ID']['output'];
};

export enum TransactionMovementTypes {
  Credit = 'Credit',
  Debit = 'Debit',
}

export enum TransactionStatus {
  Completed = 'Completed',
  Created = 'Created',
  Failed = 'Failed',
  InProgress = 'InProgress',
  PendingToApproval = 'PendingToApproval',
  PendingToClaim = 'PendingToClaim',
  Rejected = 'Rejected',
}

export enum TransactionTypes {
  BankStakingDeposit = 'BankStakingDeposit',
  BankStakingEarning = 'BankStakingEarning',
  BankStakingWithdraw = 'BankStakingWithdraw',
  CopyTradingDeposit = 'CopyTradingDeposit',
  CopyTradingEarning = 'CopyTradingEarning',
  CopyTradingWithdraw = 'CopyTradingWithdraw',
  Deposit = 'Deposit',
  ReferralReward = 'ReferralReward',
  Swap = 'Swap',
  Transfer = 'Transfer',
  Withdraw = 'Withdraw',
}

export type UpdateAdminUserInput = {
  dateOfBirth: Scalars['DateTime']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  roles: Array<Scalars['String']['input']>;
};

export type Wallet = {
  __typename?: 'Wallet';
  coins: Array<Coin>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  transactions: Array<Transaction>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
};

export type GetCurrencyTimelinesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetCurrencyTimelinesQuery = {
  __typename?: 'Query';
  getCurrencyTimelines: Array<{
    __typename?: 'CurrencyTimeline';
    ticker: string;
    price: Array<number>;
    updatedAt: any;
    createdAt: any;
  }>;
};

export type TimelineUpdatedSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type TimelineUpdatedSubscription = {
  __typename?: 'Subscription';
  timelineUpdated: Array<{
    __typename?: 'CurrencyTimeline';
    ticker: string;
    price: Array<number>;
    updatedAt: any;
    createdAt: any;
  }>;
};

export type GetCurrenciesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrenciesQuery = {
  __typename?: 'Query';
  currencies: Array<{
    __typename?: 'Currency';
    ticker: string;
    name: string;
    image: string;
    hasExternalId: boolean;
    isFiat: boolean;
    featured: boolean;
    isStable: boolean;
    supportsFixedRate: boolean;
    network: string;
    tokenContract?: string | null;
    buy: boolean;
    sell: boolean;
    legacyTicker: string;
    price?: number | null;
    lastPriceUpdated?: any | null;
    enabled: boolean;
    isLocal: boolean;
  }>;
};

export type CurrenciesUpdatedSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type CurrenciesUpdatedSubscription = {
  __typename?: 'Subscription';
  currenciesUpdated: Array<{
    __typename?: 'Currency';
    ticker: string;
    name: string;
    image: string;
    hasExternalId: boolean;
    isFiat: boolean;
    featured: boolean;
    isStable: boolean;
    supportsFixedRate: boolean;
    network: string;
    tokenContract?: string | null;
    buy: boolean;
    sell: boolean;
    legacyTicker: string;
    price?: number | null;
    lastPriceUpdated?: any | null;
    enabled: boolean;
    isLocal: boolean;
  }>;
};

export type GetMainWalletQueryVariables = Exact<{ [key: string]: never }>;

export type GetMainWalletQuery = {
  __typename?: 'Query';
  mainWallet: {
    __typename?: 'Wallet';
    id: string;
    userId: string;
    createdAt: any;
    updatedAt: any;
    coins: Array<{
      __typename?: 'Coin';
      id: string;
      ticker: string;
      network: string;
      amount: number;
      pendingAmount: number;
    }>;
  };
};

export type WalletUpdatedSubscriptionVariables = Exact<{
  walletUpdatedId: Scalars['String']['input'];
}>;

export type WalletUpdatedSubscription = {
  __typename?: 'Subscription';
  walletUpdated: {
    __typename?: 'Wallet';
    id: string;
    userId: string;
    createdAt: any;
    updatedAt: any;
    coins: Array<{
      __typename?: 'Coin';
      id: string;
      ticker: string;
      network: string;
      amount: number;
      pendingAmount: number;
    }>;
  };
};

export const GetCurrencyTimelinesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCurrencyTimelines' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getCurrencyTimelines' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'ticker' } },
                { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCurrencyTimelinesQuery,
  GetCurrencyTimelinesQueryVariables
>;
export const TimelineUpdatedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'TimelineUpdated' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'timelineUpdated' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'ticker' } },
                { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TimelineUpdatedSubscription,
  TimelineUpdatedSubscriptionVariables
>;
export const GetCurrenciesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCurrencies' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currencies' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'ticker' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'hasExternalId' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'isFiat' } },
                { kind: 'Field', name: { kind: 'Name', value: 'featured' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isStable' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'supportsFixedRate' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'network' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tokenContract' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'buy' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sell' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'legacyTicker' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'lastPriceUpdated' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isLocal' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCurrenciesQuery, GetCurrenciesQueryVariables>;
export const CurrenciesUpdatedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'CurrenciesUpdated' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currenciesUpdated' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'ticker' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'hasExternalId' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'isFiat' } },
                { kind: 'Field', name: { kind: 'Name', value: 'featured' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isStable' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'supportsFixedRate' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'network' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tokenContract' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'buy' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sell' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'legacyTicker' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'lastPriceUpdated' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isLocal' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CurrenciesUpdatedSubscription,
  CurrenciesUpdatedSubscriptionVariables
>;
export const GetMainWalletDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMainWallet' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'mainWallet' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'coins' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'ticker' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'network' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'amount' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pendingAmount' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMainWalletQuery, GetMainWalletQueryVariables>;
export const WalletUpdatedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'WalletUpdated' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'walletUpdatedId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'walletUpdated' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'walletUpdatedId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'coins' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'ticker' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'network' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'amount' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pendingAmount' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  WalletUpdatedSubscription,
  WalletUpdatedSubscriptionVariables
>;
