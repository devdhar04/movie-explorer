import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieList from '../components/MovieList';

export default function Tab() {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const loadMoviesFromAsyncStorage = async () => {
          try {
            const jsonValue = await AsyncStorage.getItem('@favorites');
            if (jsonValue != null) {
              setMovies(JSON.parse(jsonValue));
            }
          } catch (e) {
            Alert.alert('Error', 'Failed to load movies.');
          }
        };
    
        loadMoviesFromAsyncStorage();
      }, []);
    // Display a message if no favorite movies are found
    
    return (
        <View style={styles.container}>
             <MovieList movies={movies}  />
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
