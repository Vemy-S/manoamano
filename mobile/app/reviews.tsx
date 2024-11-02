import React from 'react'
import { View, Text, ScrollView, Pressable, SafeAreaView, Image } from 'react-native'
import { Home, PlusSquare, User, Star, Settings } from 'lucide-react-native'

const reviewsProfile = [
  { id: '1', autor: 'Jeremy Vega', calificacion: 5, comentario: 'Excelente servicio, muy profesional.' },
  { id: '2', autor: 'Damarys Silva', calificacion: 4, comentario: 'Buen trabajo, entregado a tiempo.' },
  { id: '3', autor: 'Diego Saavedra', calificacion: 5, comentario: 'Muy recomendable, volveré a contratar.' },
]

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

export default function reviews() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1">
        <View className="bg-white p-4 items-center">
          <Image
            source={{ uri: '/placeholder.svg?height=100&width=100' }}
            className="w-24 h-24 rounded-full mb-4"
          />
          <Text className="text-2xl font-bold mb-2">Bastian Estay</Text>
          <Text className="text-gray-600 mb-4">Electrico</Text>
          <Pressable 
            className="bg-indigo-500 px-4 py-2 rounded-full"
            onPress={() => console.log('Navegar a Configuración de Cuenta')}
          >
            <Text className="text-white font-semibold">Editar Perfil</Text>
          </Pressable>
        </View>

        <View className="mt-4 p-4 bg-white">
          <Text className="text-xl font-bold mb-4">Reseñas</Text>
          {reviewsProfile.map((review) => (
            <View key={review.id} className="mb-4 pb-4 border-b border-gray-200">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="font-semibold">{review.autor}</Text>
                <RatingStars rating={review.calificacion} />
              </View>
              <Text className="text-gray-600">{review.comentario}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="flex-row justify-around items-center py-2 bg-white border-t border-gray-200">
        <Pressable>
          <Home color="#000" size={24} />
        </Pressable>
        <Pressable>
          <PlusSquare color="#000" size={24} />
        </Pressable>
        <Pressable>
          <User color="#000" size={24} />
        </Pressable>
      </View>
    </SafeAreaView>
  )
}