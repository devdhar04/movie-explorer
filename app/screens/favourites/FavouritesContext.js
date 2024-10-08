import React, { createContext, useState, useEffect } from 'react';
import { loadFavourites, saveFavourites } from '../../storage/storage'

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const add = (restaurant) => {
    setFavourites([...favourites, restaurant]);
  };

  const remove = (restaurant) => {
    const newFavourites = favourites.filter(
      (x) => x.id !== restaurant.id
    );

    setFavourites(newFavourites);
  };

  useEffect(() => {
    loadFavourites().then((result) => {
      setFavourites(result);
    }).catch((error) => {
        console.log(error);
      });

  }, []);

  useEffect(() => {
    saveFavourites(favourites);
  }, [favourites]);

  return (
    <FavouritesContext.Provider
      value={{ favourites, addToFavourites: add, removeFromFavourites: remove }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};