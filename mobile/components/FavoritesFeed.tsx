import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { usePostStore } from '../zustand/usePostStore'
import { Star } from 'lucide-react-native'
import { Post } from '../types'
import PostulationButton from './PostulationButton'
import { Link } from 'expo-router'

type FavoritesFeedProps = {
  handlePostulation: (post_id: Post['post_id']) => void;
};

export default function FavoritesFeed({ handlePostulation }: FavoritesFeedProps) {
  const posts = usePostStore(state => state.posts)

  return (
    <View className="mt-6">
      <View className="flex-row justify-between items-center px-4 mb-4">
        <Text className="text-lg font-semibold">Te puede interesar O Favoritos</Text>
        <TouchableOpacity>
          <Text className="text-[#8B5CF6]">Ver todo o nada</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="px-4"
      >
        {posts.map(post => (
          <Link key={post.post_id} href={`/${post.post_id}`} asChild>
            <TouchableOpacity 
              className="mr-4 bg-white rounded-2xl shadow-sm w-72 p-4 border border-gray-100"
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
              <Text className="text-lg font-semibold mb-1">{post.title}</Text>
              <Text className="text-gray-500 mb-2">por {post.user.fullname}</Text>
              <Text className="text-gray-600 mb-2 line-clamp-2">{post.description}</Text>
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
      </ScrollView>
    </View>
  )
}
