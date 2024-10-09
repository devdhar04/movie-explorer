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
    flexDirection: 'row',  
    marginVertical: 5,    
  },
  label: {
    fontWeight: 'bold',    
    marginRight: 5,       
    color: '#333',         
  },
  value: {
    color: '#666', 
    paddingRight: 20,        
  },
});
