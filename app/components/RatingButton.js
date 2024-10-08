import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const RatingButton = ({ onPress, title = 'Rate', iconSize = 20 }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{title}</Text>
        <FontAwesome size={iconSize} name="star" color={'#FFC300'}/>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    marginRight: 5,
    borderColor: '#FFC300',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop:2,
    paddingBottom:2,
    alignItems: 'center',
  },
  rating: {
    marginRight: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default RatingButton;
