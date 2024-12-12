import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { View, Text, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native'
import { Star } from 'lucide-react-native'
import { getUserReviews } from '../../services/review'
import BackButton from '../../components/BackButton'

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <View className="flex-row">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          color={star <= rating ? "#FFD700" : "#D3D3D3"}
          fill={star <= rating ? "#FFD700" : "none"}
        />
      ))}
    </View>
  )
}

export default function Reviews() {
  const { userId } = useLocalSearchParams<{ userId: string }>()
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (userId) {
          const result = await getUserReviews(Number(userId))
          setReviews(result)
        }
      } catch (error) {
        console.error('Error fetching reviews:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [userId])

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <BackButton
        href='/feed'
      />
      <ScrollView className="flex-1">
        <View className="p-4 bg-white">
          {loading ? (
            <ActivityIndicator size="large" color="#FFD700" />
          ) : reviews && reviews.length > 0 ? (
            reviews.map((review, index) => (
              <View key={index} className="mb-4 pb-4 border-b border-gray-200">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="font-semibold">{review.fullname}</Text>
                  <Text className="font-semibold">Anonimo</Text>
                  <RatingStars rating={review.rating} />
                </View>
                <Text className="text-gray-600">Servicio: {review.publicationTitle}</Text>
                <Text className="text-gray-500 mt-2">Comentario: {review.comment}</Text>
                <Text className="text-gray-400 text-sm">{review.date}</Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-600">No hay reseñas disponibles</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
