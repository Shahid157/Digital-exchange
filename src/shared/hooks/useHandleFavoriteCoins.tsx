/* eslint-disable import/prefer-default-export */
import { useState, useEffect } from 'react';
import { favoritesStorage } from 'shared/utils/LocalStorage';

export const useHandleFavoriteCoins = () => {
  const [favoritesCoins, setFavoritesCoins] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const res = await favoritesStorage.getItem();
      setFavoritesCoins(res || []);
    })();
  }, []);

  useEffect(() => {
    favoritesStorage.modifyItem(favoritesCoins);
  }, [favoritesCoins]);

  const onFavorite = (name: string) =>
    setFavoritesCoins((prev) => [...prev, name]);

  const onUnFavorite = (name: string) =>
    setFavoritesCoins((prev) => [...prev.filter((i) => i !== name)]);

  return { favoritesCoins, onFavorite, onUnFavorite };
};
