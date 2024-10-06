import { Stack } from 'expo-router/stack';
import { FavouritesContextProvider }  from './screens/favourites/FavouritesContext'
import { SearchContextProvider }  from './screens/search/SearchContext'

export default function Layout() {
  return (
    <SearchContextProvider>
    <FavouritesContextProvider>
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="screens/MovieDetailScreen" />
    </Stack>
    </FavouritesContextProvider>
    </SearchContextProvider>
  );
}
