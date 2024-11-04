import React, { useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl } from 'react-native'
import { Star, UserPlus } from 'lucide-react-native'
import { usePostStore } from '../../zustand/usePostStore'
import { useFeed } from '../../hooks/useFeed'
import HeaderFeed from '../../components/header/HeaderFeed'
import FavoritesFeed from '../../components/FavoritesFeed'

const MAX_APPLICATIONS = 5

export default function Feed() {

  const posts = usePostStore(state => state.posts)
  
  const { refreshing, fetchPost, onRefresh } = useFeed()

  useEffect(() => {
    fetchPost()
  }, [])

  const renderApplicationButton = (applications: number) => (
    <TouchableOpacity 
      className={`flex-row items-center justify-center px-3 py-2 rounded-full ${
        applications >= MAX_APPLICATIONS ? 'bg-gray-200' : 'bg-purple-100'
      }`}
      disabled={applications >= MAX_APPLICATIONS}
    >
      <UserPlus size={16} color={applications >= MAX_APPLICATIONS ? '#666' : '#8B5CF6'} />
      <Text className={`ml-2 font-semibold ${
        applications >= MAX_APPLICATIONS ? 'text-gray-500' : 'text-purple-600'
      }`}>
        {applications >= MAX_APPLICATIONS ? 'Completo' : `Postular (${applications}/${MAX_APPLICATIONS})`}
      </Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }
      >
  
        <HeaderFeed/>
        <FavoritesFeed
          renderApplicationButton={renderApplicationButton}
        />

      
        <View className="mt-6 px-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold">Publicaciones recientes</Text>
            <TouchableOpacity>
              <Text className="text-[#8B5CF6]">Ver todo o nada</Text>
            </TouchableOpacity>
          </View>

          {posts.map(post => (
            <TouchableOpacity 
              key={post.post_id}
              className="mb-4 bg-white rounded-2xl shadow-sm p-4 border border-gray-100"
            >
              <View className="flex-row justify-between items-start mb-2">
                <View className="bg-purple-100 rounded-full px-2 py-1">
                  <Text className="text-purple-600 font-semibold">{post.type}</Text>
                </View>
                <View className="flex-row items-center">
                  <Star size={16} color="#FFD700" fill="#FFD700" />
                  <Text className="ml-1 text-gray-600">{post.reviews}</Text>
                </View>
              </View>

              <Text className="text-xl font-semibold mb-1">{post.title}</Text>
              <Text className="text-gray-500 mb-2">Autor: {post.user.fullname}</Text>
              <Text className="text-gray-600 mb-3 line-clamp-3">{post.description}</Text>

              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-gray-600">{post.tags}</Text>
              </View>
              {renderApplicationButton(post.postulations)}
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

    </SafeAreaView>
  )
}