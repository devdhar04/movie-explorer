import { Stack } from 'expo-router/stack';
import { FavouritesContextProvider }  from './screens/favourites/FavouritesContext'

export default function Layout() {
  return (
    <FavouritesContextProvider>
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="screens/MovieDetailScreen" />
    </Stack>
    </FavouritesContextProvider>
  );
}
