import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ input, setInput, searchMoviesList }) => {
  return (
    <TextInput
      style={styles.searchInput}
      placeholder="Search Movies"
      value={input}
      onChangeText={(text) => {
        setInput(text);
        searchMoviesList(text);
      }}
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
