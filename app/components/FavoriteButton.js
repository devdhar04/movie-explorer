import React, { useContext } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FavouritesContext } from '../screens/favourites/FavouritesContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';

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
      {isFavourite ? 
      <FontAwesome size={24} name="heart" color={'#c0392b'}/> : <FontAwesome size={24} name="heart-o" /> }
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
