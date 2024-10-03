import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet ,View,Text} from 'react-native';
import MovieItem from './MovieItem';
import { saveFavorites, getFavorites } from '../storage/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteMovieList = ({ movies }) => {
  const [favorites, setFavorites] = useState([]);

  /*
    Load favorites from AsyncStorage when the component mounts
  */
   const loadFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@favorites');
      if (jsonValue != null) {
        setFavorites(JSON.parse(jsonValue));
        console.log('Error loading favorites:', JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Error loading favorites:', e);
    }
  };

  /* 
  Add or remove a movie from favorites
  */
  const toggleFavorite = (movie) => {
    let updatedFavorites = [...favorites];
    if (favorites.some((fav) => fav.id === movie.id)) {
      // Remove movie if it's already in favorites
      updatedFavorites = updatedFavorites.filter((fav) => fav.id !== movie.id);
    } else {
      // Add movie to favorites if it's not already
      updatedFavorites.push(movie);
    }
    saveFavorites(updatedFavorites); 
    loadFavorites();// Update state with the new favorites list
    // Save updated favorites to AsyncStorage
  };

  /* 
  Load favorites when the component mounts
  */
  useEffect(() => {
    loadFavorites();
  }, []);

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text>No movies found!</Text>
    </View>
  );
  
  return (
    <FlatList
      data={favorites}
      ListEmptyComponent={renderEmptyList}
      renderItem={({ item }) => {
        // Check if movie is in favorites
        const isFavorite = favorites.some((fav) => fav.id === item.id);
        return (
          <MovieItem
            movie={item}
            isFavorite={isFavorite} // Pass favorite status to child component
            onPress={() => toggleFavorite(item)} // Pass toggle function to child component
          />
        );
      }}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  // You can add styles specific to MovieList here
});

export default FavoriteMovieList;
