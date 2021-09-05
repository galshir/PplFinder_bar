import { useState, useEffect } from "react";

export const useFavoritesFetch = () => {
  const [favorites, setFavorites]  = useState([]);
  const [isLoading, setIsLoading]  = useState(false);

  useEffect(() => {
    fetchUsersFavorites();
  }, []);

  async function fetchUsersFavorites() {
    setIsLoading(true);
    const favoritesData = JSON.parse(localStorage.getItem('favorites')) === null ? {} : JSON.parse(localStorage.getItem('favorites'));
    setIsLoading(false);
    setFavorites(favoritesData);
  }

  return { favorites, isLoading, fetchUsersFavorites };
};


