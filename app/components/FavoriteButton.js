import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const FavoriteButton = ({ isFavorite, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={
          isFavorite
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
