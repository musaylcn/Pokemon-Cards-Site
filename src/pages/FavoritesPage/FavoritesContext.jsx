import { createContext, useState } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (pokemon) => {
    const alreadyExists = favorites.some(fav => fav.id === pokemon.id);
    if (!alreadyExists) {
      setFavorites([...favorites, pokemon]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter(p => p.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
