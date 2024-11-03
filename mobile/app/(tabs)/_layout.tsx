import { Tabs } from "expo-router";
import { Home, PlusSquare, User } from 'lucide-react-native'


export default function TabsLayout() {
  return <Tabs
    screenOptions={{
        headerShown: false,
        /* tabBarStyle: {backgroundColor: "#4e4260"} */ // tabs color
    }}
  >
  <Tabs.Screen
    name="feed"
    options={{
      title: 'Inicio',
      tabBarIcon: ({ size, color }) => (
        <Home color="#000" size={24} />
      )
    }}
  />
  
  <Tabs.Screen
    name="profile"
    options={{
      title: 'Mi Perfil',
      tabBarIcon: ({ size, color }) => (
        <PlusSquare color="#000" size={24} />
      )
    }}
  />
  
  <Tabs.Screen
    name="createPost"
    options={{
      title: 'Crear Post',
      tabBarIcon: ({ size, color }) => (
        <User color="#000" size={24} />
      )
    }}
  />

</Tabs>
}