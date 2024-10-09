import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { convertToPercentage } from '../utils/utils'

const RatingCircle = ({ rating }) => {
  const getBorderColor = (rating) => {
    if (rating >= 7) {
      return '#21d07a'; 
    } else if (rating >= 5) {
      return '#d2d531'; 
    } else {
      return '#db2360';    
    }
  };

  const borderColor = getBorderColor(rating);

  return (
    <View style={styles.container}>
      <View style={[styles.circle, { borderColor }]}>
        <Text style={styles.ratingText}>{convertToPercentage(rating)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginRight:10
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
     backgroundColor:'#252926'
  },
  ratingText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default RatingCircle;
