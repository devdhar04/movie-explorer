import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

export default function LabelValueView({ label, value ,onPress}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
    <View style={styles.container} >
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Align label and value in a row
    marginVertical: 5,   // Space between each label-value pair
  },
  label: {
    fontWeight: 'bold',    // Make the label bold
    marginRight: 10,       // Space between label and value
    color: '#333',         // Label color
  },
  value: {
    color: '#666', 
    paddingRight: 20,          // Value color
  },
});
