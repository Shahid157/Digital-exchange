/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetCurrencyTimelines {\n    getCurrencyTimelines {\n      ticker\n      price\n      updatedAt\n      createdAt\n    }\n  }\n": types.GetCurrencyTimelinesDocument,
    "\n  subscription TimelineUpdated {\n    timelineUpdated {\n      ticker\n      price\n      updatedAt\n      createdAt\n    }\n  }\n": types.TimelineUpdatedDocument,
    "\n  query GetCurrencies {\n    currencies {\n      ticker\n      name\n      image\n      hasExternalId\n      isFiat\n      featured\n      isStable\n      supportsFixedRate\n      network\n      tokenContract\n      buy\n      sell\n      legacyTicker\n      price\n      lastPriceUpdated\n      enabled\n      isLocal\n    }\n  }\n": types.GetCurrenciesDocument,
    "\n  subscription CurrenciesUpdated {\n    currenciesUpdated {\n      ticker\n      name\n      image\n      hasExternalId\n      isFiat\n      featured\n      isStable\n      supportsFixedRate\n      network\n      tokenContract\n      buy\n      sell\n      legacyTicker\n      price\n      lastPriceUpdated\n      enabled\n      isLocal\n    }\n  }\n": types.CurrenciesUpdatedDocument,
    "\n  query GetMainWallet {\n    mainWallet {\n      id\n      userId\n      coins {\n        id\n        ticker\n        network\n        amount\n        pendingAmount\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetMainWalletDocument,
    "\n  subscription WalletUpdated($walletUpdatedId: String!) {\n    walletUpdated(id: $walletUpdatedId) {\n      id\n      userId\n      coins {\n        id\n        ticker\n        network\n        amount\n        pendingAmount\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.WalletUpdatedDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCurrencyTimelines {\n    getCurrencyTimelines {\n      ticker\n      price\n      updatedAt\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetCurrencyTimelines {\n    getCurrencyTimelines {\n      ticker\n      price\n      updatedAt\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription TimelineUpdated {\n    timelineUpdated {\n      ticker\n      price\n      updatedAt\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  subscription TimelineUpdated {\n    timelineUpdated {\n      ticker\n      price\n      updatedAt\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCurrencies {\n    currencies {\n      ticker\n      name\n      image\n      hasExternalId\n      isFiat\n      featured\n      isStable\n      supportsFixedRate\n      network\n      tokenContract\n      buy\n      sell\n      legacyTicker\n      price\n      lastPriceUpdated\n      enabled\n      isLocal\n    }\n  }\n"): (typeof documents)["\n  query GetCurrencies {\n    currencies {\n      ticker\n      name\n      image\n      hasExternalId\n      isFiat\n      featured\n      isStable\n      supportsFixedRate\n      network\n      tokenContract\n      buy\n      sell\n      legacyTicker\n      price\n      lastPriceUpdated\n      enabled\n      isLocal\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription CurrenciesUpdated {\n    currenciesUpdated {\n      ticker\n      name\n      image\n      hasExternalId\n      isFiat\n      featured\n      isStable\n      supportsFixedRate\n      network\n      tokenContract\n      buy\n      sell\n      legacyTicker\n      price\n      lastPriceUpdated\n      enabled\n      isLocal\n    }\n  }\n"): (typeof documents)["\n  subscription CurrenciesUpdated {\n    currenciesUpdated {\n      ticker\n      name\n      image\n      hasExternalId\n      isFiat\n      featured\n      isStable\n      supportsFixedRate\n      network\n      tokenContract\n      buy\n      sell\n      legacyTicker\n      price\n      lastPriceUpdated\n      enabled\n      isLocal\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMainWallet {\n    mainWallet {\n      id\n      userId\n      coins {\n        id\n        ticker\n        network\n        amount\n        pendingAmount\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetMainWallet {\n    mainWallet {\n      id\n      userId\n      coins {\n        id\n        ticker\n        network\n        amount\n        pendingAmount\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription WalletUpdated($walletUpdatedId: String!) {\n    walletUpdated(id: $walletUpdatedId) {\n      id\n      userId\n      coins {\n        id\n        ticker\n        network\n        amount\n        pendingAmount\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  subscription WalletUpdated($walletUpdatedId: String!) {\n    walletUpdated(id: $walletUpdatedId) {\n      id\n      userId\n      coins {\n        id\n        ticker\n        network\n        amount\n        pendingAmount\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;