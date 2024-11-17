import React, { useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl } from 'react-native'
import { Star } from 'lucide-react-native'
import { usePostStore } from '../../zustand/usePostStore'
import { useFeed } from '../../hooks/useFeed'
import HeaderFeed from '../../components/header/HeaderFeed'
import FavoritesFeed from '../../components/FavoritesFeed'
import PostulationButton from '../../components/PostulationButton'
import { Link } from 'expo-router'

export default function Feed() {
  const posts = usePostStore(state => state.posts)
  const getUserPostulations = usePostStore(state => state.getUserPostulations)
  const { refreshing, fetchPost, onRefresh, handlePostulation } = useFeed()

  useEffect(() => {
    fetchPost()
    getUserPostulations()
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <HeaderFeed />
        <FavoritesFeed handlePostulation={handlePostulation} />

        <View className="mt-6 px-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold">Publicaciones recientes</Text>
            <TouchableOpacity>
              <Text className="text-[#8B5CF6]">Ver todo o nada</Text>
            </TouchableOpacity>
          </View>

          {posts.map(post => (
            <Link key={post.post_id} href={`/${post.post_id}`} asChild>
              <TouchableOpacity 
                className="mb-4 bg-white rounded-2xl shadow-sm p-4 border border-gray-100"
                onPress={() => console.log(`Navigating to post ${post.post_id}`)}
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

                <PostulationButton
                  applications={post.postulation_count}
                  maxPostulations={post.maxPostulations}
                  post_id={post.post_id}
                  handlePostulation={handlePostulation}
                />
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
