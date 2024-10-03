import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavoriteMovieList from '../components/FavoriteMovieList';
import {getFavorites} from '../storage/storage';

export default function Tab() {
    const [movies, setMovies] = useState([]);

    const loadFavorites = async () => {
      const loadedFavorites = await getFavorites();
      setMovies(loadedFavorites);
    };

    useEffect(() => {
        loadFavorites();
      }, []);
    // Display a message if no favorite movies are found
    
    return (
        <View style={styles.container}>
             <FavoriteMovieList movies={movies}  />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    emptyContainer: {
        marginTop: 20,
        alignItems: 'center',
      },
});
