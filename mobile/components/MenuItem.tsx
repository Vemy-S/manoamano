import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ChevronRight } from 'lucide-react-native'

interface MenuItemProps {
    icon: React.ReactNode
    title: string
}

export default function MenuItem({icon, title}: MenuItemProps) {
    return (
        <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-800">
          <View className="w-8">{icon}</View>
          <Text className="flex-1 text-gray-800 ml-2">{title}</Text>
          <ChevronRight color="#666" size={20} />
        </TouchableOpacity>
      )
}