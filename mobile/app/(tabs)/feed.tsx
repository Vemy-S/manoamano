import React, { useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl, Alert } from 'react-native'
import { Trash2 } from 'lucide-react-native'
import { usePostStore } from '../../zustand/usePostStore'
import { useFeed } from '../../hooks/useFeed'
import HeaderFeed from '../../components/header/HeaderFeed'
import FavoritesFeed from '../../components/FavoritesFeed'
import PostulationButton from '../../components/PostulationButton'
import { Link } from 'expo-router'
import { useAuthStore } from '../../zustand/useAuthStore'
import { Post } from '../../types'
import { deletePost } from '../../services/posts'

export default function Feed() {
  const posts = usePostStore(state => state.posts)
  const getUserPostulations = usePostStore(state => state.getUserPostulations)
  const { refreshing, fetchPost, onRefresh, handlePostulation } = useFeed()
  const user_id = useAuthStore(state => state.user.user_id)

  useEffect(() => {
    fetchPost()
    getUserPostulations()
  }, [])

  const handleDeletePost = (post_id: Post['post_id']) => {
    Alert.alert(
      "Eliminar publicación",
      "¿Estás seguro de que quieres eliminar esta publicación?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          onPress:  async () => {
            const result = await deletePost(post_id)
            if(result.status === 200){
              await onRefresh()
            }
          },
          style: "destructive"
        }
      ]
    )
  }

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
            <View key={post.post_id} className="mb-4 bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
              <View className="flex-row justify-between items-start mb-2">
                <View className="bg-purple-100 rounded-full px-2 py-1">
                  <Text className="text-purple-600 font-semibold">{post.type}</Text>
                </View>
                {post.user.user_id === user_id && (
                  <TouchableOpacity 
                    onPress={() => handleDeletePost(post.post_id)}
                    className="p-2"
                  >
                    <Trash2 size={20} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>
              <Link href={`/${post.post_id}`} asChild>
                <TouchableOpacity onPress={() => console.log(`Navigating to post ${post.post_id}`)}>
                  <Text className="text-xl font-semibold mb-1">{post.title}</Text>
                  <Text className="text-gray-500 mb-2">Autor: {post.user.fullname}</Text>
                  <Text className="text-gray-600 mb-3 line-clamp-3">{post.description}</Text>

                  <View className="flex-row justify-between items-center mb-3">
                    <Text className="text-gray-600">{post.tags}</Text>
                  </View>
                </TouchableOpacity>
              </Link>
              <PostulationButton
                applications={post.postulation_count}
                maxPostulations={post.maxPostulations}
                post_id={post.post_id}
                post_owner_id={post.user.user_id}
                handlePostulation={handlePostulation}
                user_id={user_id}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
