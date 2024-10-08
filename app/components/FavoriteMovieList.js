import React, {useContext,useEffect} from 'react';
import { FlatList, StyleSheet ,View,Text} from 'react-native';
import MovieItem from './MovieItem';
import { useNavigation} from 'expo-router';
import { FavouritesContext } from '../screens/favourites/FavouritesContext'; 
import {MoviesContext} from '../screens/movies/MoviesContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {shareFavouriteMoviesList } from '../utils/utils'

const FavoriteMovieList = ({ }) => {
  
  const { favourites} = useContext(FavouritesContext);
  const { genres} = useContext(MoviesContext);

  const navigation = useNavigation();

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text>No movies found!</Text>
    </View>
  );

  const onShare = () => {
    shareFavouriteMoviesList(favourites);
  };

  useEffect(() => {
  
    navigation.setOptions({
     
      headerRight: () => (
        <FontAwesome
          name="share-alt-square"
          size={26}
          color={'#5dade2'}
          onPress={() => onShare()}
          style={{marginRight:10}}
        />
      ),
    });
  }, []);

  
  return (
    <FlatList
      data={favourites}
      ListEmptyComponent={renderEmptyList}
      renderItem={({ item }) => {
        return (
          <MovieItem
            movie={item}
            genres = {genres}
          />
        );
      }}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer : {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default FavoriteMovieList;
