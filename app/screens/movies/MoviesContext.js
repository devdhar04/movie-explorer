import React, { createContext, useState, useEffect } from 'react';
import { fetchGenres,postRating } from '../../services/api';
import { saveGenreList } from '../../storage/storage';

export const MoviesContext = createContext();

export const MoviesContextProvider = ({ children }) => {
  const [genres, setGenre] = useState([]);

  /*
    Fetch genres and save them to the local storage
  */
  const fetchGenreList = async () => {
    try {
      const data = await fetchGenres();
      if (data && data.genres) {
        await saveGenreList(data.genres); 
        setGenre(data.genres); 
      }
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  /*
    Fetch genres and save them to the local storage
  */
    const addRating = async (movieId, rating) => {
      try {
        const data = await postRating(movieId, rating);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

  useEffect(() => {
    fetchGenreList();    
  }, []);

  return (
    <MoviesContext.Provider value={{ genres ,postRating: addRating}}>
      {children}
    </MoviesContext.Provider>
  );
};
