import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="film" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favouriteListScreen"
        options={{
          title: 'Favourite',
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="heart" color={color} />,
        }}
      />
    </Tabs>
  );
}
