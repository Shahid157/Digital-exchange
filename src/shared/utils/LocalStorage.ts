/* eslint-disable class-methods-use-this */
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LocalStorageInterface<T> {
  getItem(): Promise<T | undefined>;

  modifyItem(value: T): Promise<void>;

  deleteItem(): Promise<void>;
}

// eslint-disable-next-line no-shadow
export enum StorageKeyNamesEnum {
  FAVORITE_COINS = 'FAVORITE_COINS',
}

class FavoritesStorageClass implements LocalStorageInterface<string[]> {
  async getItem(): Promise<string[] | undefined> {
    const res = await AsyncStorage.getItem(StorageKeyNamesEnum.FAVORITE_COINS);
    if (!res) return;
    // eslint-disable-next-line consistent-return
    return JSON.parse(res) as string[];
  }

  async modifyItem(value: string[]): Promise<void> {
    await AsyncStorage.setItem(
      StorageKeyNamesEnum.FAVORITE_COINS,
      JSON.stringify(value)
    );
  }

  async deleteItem(): Promise<void> {
    await AsyncStorage.removeItem(StorageKeyNamesEnum.FAVORITE_COINS);
  }
}

export const favoritesStorage = new FavoritesStorageClass();
