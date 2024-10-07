import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const RatingButton = ({ onPress, title = 'Add Rating', iconSize = 24 }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{title}</Text>
        <FontAwesome size={iconSize} name="star" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    marginRight: 5,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
    alignItems: 'center',
  },
  rating: {
    marginRight: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RatingButton;
