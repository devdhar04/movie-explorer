import React from 'react';
import { View, StyleSheet } from 'react-native';
import FavoriteMovieList from '../components/FavoriteMovieList';

export default function Tab() {
    
    return (
        <View style={styles.container}>
             <FavoriteMovieList />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    emptyContainer: {
        marginTop: 20,
        alignItems: 'center',
      },
});
