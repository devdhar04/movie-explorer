import React from 'react';
import { TextInput, StyleSheet ,View} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const SearchBar = ({ value,onChangeText }) => {
  return (
    <View style={styles.container}>
    <FontAwesome name="search" size={20} color="#888" style={styles.icon} />
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder="Search"
    />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default SearchBar;
