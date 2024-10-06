import React, { useContext } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FavouritesContext } from '../screens/favourites/FavouritesContext';

const FavoriteButton = ({ movie }) => {

  const { favourites, addToFavourites, removeFromFavourites } = useContext(FavouritesContext);

  const isFavourite = favourites.find(
    (res) => res.id === movie.id
  );

  return (

    <TouchableOpacity onPress={() =>
      !isFavourite
        ? addToFavourites(movie)
        : removeFromFavourites(movie)
    }>
      <Image
        source={
          isFavourite
            ? require('../../assets/images/favourite_on.png')  // "Favorite" icon
            : require('../../assets/images/favourite_off.png') // "Not favorite" icon
        }
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default FavoriteButton;
