import React, { createContext, useState, useEffect } from 'react';

export const MoviesContext = createContext();

export const MoviesContextProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([]);
    const STORAGE_KEY = '@favorites';
  
     const loadFavourites = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
      } catch (e) {
        console.error('Error loading favorites:', e);
        return [];
      }
    };
    
    // Save items to AsyncStorage
     const saveFavourites = async (favorites) => {
      try {
        const jsonValue = JSON.stringify(favorites);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      } catch (e) {
        console.error('Error saving favorites:', e);
      }
    };
  
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
      loadFavourites();
    }, []);
  
    useEffect(() => {
      
      saveFavourites(favourites);
      
    }, [favourites]);
  
    return (
      <MoviesContextProvider.Provider
        value={{ favourites, addToFavourites: add, removeFromFavourites: remove }}
      >
        {children}
      </MoviesContextProvider.Provider>
    );
  };