import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ value,onChangeText }) => {
  return (
    <TextInput
      style={styles.searchInput}
      placeholder="Search Movies"
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});

export default SearchBar;
