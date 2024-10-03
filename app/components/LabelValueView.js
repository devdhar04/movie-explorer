import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LabelValueView({ label, value }) {
  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>{label}</Text>
      {/* Value */}
      <Text style={styles.value}>{value}</Text>
    </View>
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
