import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { useAuthStore } from '../../zustand/useAuthStore'
import SearchComponent from './SearchComponent'

export default function HeaderFeed() {
    const location = "Chile"
    const newPosts = 25
    const user = useAuthStore(state => state.user)
  return (
    <View className="px-4 pt-2">
      
    <View className="flex-row justify-between items-center">
      <View>
        <Text className="text-gray-500 text-sm">
          {location}
          <Text className="text-gray-400"> • San Felipe</Text>
        </Text>
      </View>
      <View className="w-8 h-8 bg-purple-100 rounded-full items-center justify-center">
        <Text className="text-purple-600 font-semibold">{user.fullname[0]}</Text>
      </View>
    </View>

    <View className="mt-4">
      <Text className="text-3xl font-bold">
        Hola, {user.fullname}
      </Text>
      <Text className="text-xl text-[#8B5CF6] mt-1">
        Hay {newPosts} nuevas publicaciones hoy en tu inicio o puede ir chamuyo
      </Text>
    </View>

   <SearchComponent/>
    
  </View>
  )
} 