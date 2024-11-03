import { Tabs } from "expo-router";
import { Home, PlusSquare, User } from 'lucide-react-native'


export default function TabsLayout() {

  const tabBarStyle = {
    paddingBottom: 5,
    height: 50
  };
  return <Tabs
    screenOptions={{
        headerShown: false,
        /* tabBarStyle: {backgroundColor: "#4e4260"} */ // tabs color
        tabBarStyle: tabBarStyle,
        tabBarLabelStyle: {display: "none"}
    }}
  >
  <Tabs.Screen
    name="feed"
    options={{
      tabBarIcon: ({ size, color }) => (
        <Home color="#000" size={24} />
      )
    }}
  />
  
  <Tabs.Screen
    name="createPost"
    options={{
      tabBarIcon: ({ size, color }) => (
        <PlusSquare color="#000" size={24} />
      )
    }}
  />
  
  <Tabs.Screen
    name="profile"
    options={{
      tabBarIcon: ({ size, color }) => (
        <User color="#000" size={24} />
      )
    }}
  />

</Tabs>
}