import { useState } from "react";

const LOCAL_STORAGE_FAVORITE_KEY = "favorites";

export const useLocalStorage = () => {
  const [favorites, setFavorites] = useState<Record<number, boolean>>(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITE_KEY) || "{}")
  );

  const toggleFavorite = (flight_number: number) => {
    const newFavs = {
      ...favorites,
      [flight_number]: !favorites[flight_number]
    };
    setFavorites(newFavs);
    localStorage.setItem(LOCAL_STORAGE_FAVORITE_KEY, JSON.stringify(newFavs));
  };

  return {
    toggleFavorite,
    favorites
  };
};
