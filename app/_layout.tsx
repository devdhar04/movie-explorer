import { Stack } from 'expo-router/stack';
import { FavouritesContextProvider } from './screens/favourites/FavouritesContext'
import { SearchContextProvider } from './screens/search/SearchContext'
import { MoviesContextProvider } from './screens/movies/MoviesContext'

export default function Layout() {
  return (
    <SearchContextProvider>
      <FavouritesContextProvider>
        <MoviesContextProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="screens/details/MovieDetailScreen" options={{title :'Movie Detail'}}/>
        </Stack>
        </MoviesContextProvider>
      </FavouritesContextProvider>
    </SearchContextProvider>
  );
}
