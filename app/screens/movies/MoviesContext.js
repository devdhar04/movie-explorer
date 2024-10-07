import React, { createContext, useState, useEffect } from 'react';
import { getGenre } from '../../services/api';
import { saveGenreList } from '../../storage/storage';

export const MoviesContext = createContext();

export const MoviesContextProvider = ({ children }) => {
  const [genres, setGenre] = useState([]);

  /*
    Fetch genres and save them to the local storage
  */
  const fetchGenreList = async () => {
    try {
      const data = await getGenre();
      if (data && data.genres) {
        await saveGenreList(data.genres); 
        setGenre(data.genres); 
      }
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  useEffect(() => {
    fetchGenreList();    
  }, []);

  return (
    <MoviesContext.Provider value={{ genres }}>
      {children}
    </MoviesContext.Provider>
  );
};
