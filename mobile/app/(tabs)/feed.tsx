import React, { useEffect } from 'react'
import { View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native'
import { Star, Bookmark } from 'lucide-react-native'
import { usePostStore } from '../../zustand/usePostStore'


const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <View className="flex-row">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          color={star <= Math.round(rating) ? "#FFD700" : "#D3D3D3"}
          fill={star <= Math.round(rating) ? "#FFD700" : "none"}
        />
      ))}
    </View>
  )
}

export default function feed() {
  const setPost = usePostStore(state => state.setPosts)
  const posts = usePostStore(state => state.posts)

  useEffect(() => {
    setPost()
  }, [setPost])

  return (
    <SafeAreaView className="flex-1 bg-gray-100">

      <ScrollView className="px-4">
        {posts.map(post => (
          <View key={post.user_id} className="bg-white my-4 p-4 rounded-lg shadow">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="font-semibold text-lg flex-1">{post.title}</Text>
              <View className="px-2 py-1 bg-gray-200 rounded-full">
                <Text className={post.type === 'OFFER' ? "text-indigo-600" : "text-indigo-900"}>
                  {post.type === 'OFFER' ? "Ofrece" : "Requiere"}
                </Text>
              </View>
            </View>
            <Text className="text-gray-700 mb-3 text-center">{post.description}</Text>
            <View className="flex-row justify-between items-center mb-3">
              <View>
                {/* {post.rating > 0 ? (
                  <View className="flex-row items-center">
                    <RatingStars rating={post.rating} />
                    <Text className="ml-2 text-gray-600">({post.reviews} reseñas)</Text>
                  </View>
                ) : (
                  <Text className="text-gray-500">Sin reseñas aún</Text>
                )} */}
                <Text>RATING</Text>
              </View>
              <Pressable className="p-2">
                <Bookmark color="#000" size={24} />
              </Pressable>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">
                Postulados: ({post.postulations}/5)
              </Text>
              <Pressable 
                className={`px-4 py-2 rounded-full ${
                  post.maxPostulations >= 5 ? 'bg-gray-300' : 'bg-indigo-400'
                }`}
                disabled={post.maxPostulations >= 5}
              >
                <Text className="text-white font-semibold">
                  {post.maxPostulations >= 5 ? 'Completo' : 'Postularse'}
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>

    </SafeAreaView>
  )
}