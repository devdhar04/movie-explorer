import React from 'react';
import { View, Image, FlatList, Dimensions, StyleSheet } from 'react-native';

const MovieCarousel = ({ movie }) => {
    const { width } = Dimensions.get('window');

    const renderItem = ({ item }) => (

        <View style={styles.itemContainer}>
            <Image
                source={{ uri: `${item}` }}
                style={[styles.poster, { width: width * 0.8, height: width * 1.2 }]}
            />

        </View>
    );

    return (
        <FlatList
            data={movie}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
        />
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        marginStart: 10,
        alignItems: 'flex-start',

    },
    poster: {
        borderRadius: 10,
    }
});

export default MovieCarousel;
