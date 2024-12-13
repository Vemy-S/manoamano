import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, Link } from 'expo-router'
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import { X, User, Calendar, Tag, MessageCircle, Star } from 'lucide-react-native'
import { usePostIdStore } from '../zustand/usePostIdStore'
import { getPostById } from '../services/posts'
import PostulationButton from '../components/PostulationButton'
import { useFeed } from '../hooks/useFeed'
import { useReview } from '../hooks/useReview'
import BackButton from '../components/BackButton'
import { useAuthStore } from '../zustand/useAuthStore'

export default function PostDetail() {
  const { postId } = useLocalSearchParams<{ postId: string }>()
  const postById = usePostIdStore(state => state.post)
  const setPostById = usePostIdStore(state => state.setPost)
  const { handlePostulation } = useFeed()
  const [rating, setRating] = useState(0)
  const { handleInputChange, reviewValues, handleSubmit } = useReview() 
  const user = useAuthStore(state => state.user)

  const isOwner = user?.user_id === postById?.user?.user_id

  useEffect(() => {
    const fetchPostById = async () => {
      const data = await getPostById(Number(postId))
      setPostById(data)
    }

    fetchPostById()
  }, [])

  const handleStarPress = (star: number) => {
    setRating(star)
    handleInputChange('calification', star.toString())
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-800">
      <StatusBar barStyle="light-content" />
      <View className="flex-1 bg-gray-800">
        <View className="flex-row items-center p-5 bg-gray-900">
          <BackButton
            href='/feed'
          />
          <Text className="text-white text-xl font-bold ml-5">Detalles del Post</Text>
        </View>

        <ScrollView className="flex-grow p-5">
          <View className="bg-white rounded-xl shadow-md">
            <View className="p-5">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-2xl font-bold text-gray-800 flex-1">{postById?.title}</Text>
                <View className="flex-row items-center bg-gray-100 px-3 py-1 rounded-full">
                  <Tag color="#4A5568" size={16} />
                  <Text className="ml-1 text-sm font-bold text-gray-600">{postById?.type}</Text>
                </View>
              </View>
              <Text className="text-base text-gray-600 mb-5">{postById?.description}</Text>

              <View className="h-px bg-gray-200 my-5" />

              <View className="mt-1">
                <View className="flex-row items-center mb-3">
                  <User color="#4A5568" size={20} />
                  <Text className="ml-2 text-gray-600 flex-1">{postById?.user?.fullname}</Text>
                  <Link 
                    href={`/review/${postById?.user?.user_id}`} 
                    className="bg-indigo-500 px-4 py-2 rounded-full"
                  >
                    <Text className="text-white text-sm font-bold">Ver Reseñas del usuario</Text>
                  </Link>
                </View>
                <View className="flex-row items-center">
                  <Calendar color="#4A5568" size={20} />
                  <Text className="ml-2 text-gray-600">{postById?.status}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {!isOwner && (
          <View className="p-5 bg-gray-900 rounded-t-3xl">
            <View className="flex-row items-center bg-gray-800 rounded-full px-4 mb-2">
              <MessageCircle color="#A0AEC0" size={20} />
              <TextInput
                className="flex-1 h-12 text-base text-white ml-2"
                placeholder="Escribe una reseña del servicio"
                placeholderTextColor="#A0AEC0"
                value={reviewValues.comment}
                onChangeText={value => handleInputChange('comment', value)}
              />
            </View>
            <View className="flex-row justify-center my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                  <Star
                    size={24}
                    color={star <= rating ? '#F6E05E' : '#A0AEC0'}
                    fill={star <= rating ? '#F6E05E' : 'none'}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              className="bg-blue-500 rounded-full py-3 items-center"
              onPress={handleSubmit}
            >
              <Text className="text-white text-base font-bold">Enviar Reseña</Text>
            </TouchableOpacity>
          </View>
        )}

        {isOwner && (
          <View className="p-5 bg-gray-900 rounded-t-3xl">
            <Text className="text-white text-lg font-bold">No puedes dejar una reseña sobre tu propio post.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}