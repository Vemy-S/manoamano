import { Tabs } from "expo-router";
import { Home, PlusSquare, User } from 'lucide-react-native'
import { useState } from "react";
import CreatePostModal from "./CreatePostModal";
import React from "react";

export default function TabsLayout() {

  const [isModalVisible, setModalVisible] = useState(false)
  const openModal = () => setModalVisible(true)
  const closeModal = () => setModalVisible(false)

  const tabBarStyle = {
    paddingBottom: 5,
    height: 50
  }
  return <>
  <Tabs
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
    name="CreatePostModal"
    listeners={{
      tabPress: (e) => {
        e.preventDefault()
        openModal()
      }
    }}  
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
  <CreatePostModal isVisible={isModalVisible} onClose={closeModal} />
</>
}

