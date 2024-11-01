import { View, Text, SafeAreaView, Image, Pressable } from 'react-native'
import { Link } from 'expo-router'

export default function index() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
    <View className="flex-1 justify-center items-center p-6">
      <Text className="text-4xl font-bold text-indigo-500 mb-2">Mano a Mano</Text>
      <Text className="text-xl text-gray-600 mb-8 text-center">Haz todo de un toque</Text>

      <Image
        source={{ uri: '/placeholder.svg?height=200&width=200' }}
        className="w-64 h-64 mb-8"
        resizeMode="contain"
      />

      <Text className="text-base text-gray-700 mb-6 text-center">
        Ofrece tus servicios o encuentra lo que necesitas en nuestra comunidad.
      </Text>

      <View className="w-full flex-row justify-around">

        <Pressable
          className="bg-indigo-500 py-3 px-6 rounded-full"
          onPress={() => console.log('Navigate to Login')}
          
        >
          <Link 
            href='/login'>
            <Text className="text-white font-semibold text-lg">Iniciar sesión</Text>
          </Link>
        </Pressable>
        

        <Pressable
          className="bg-indigo-700/60 py-3 px-6 rounded-full"
          onPress={() => console.log('Navigate to Register')}
        >
          <Text className="text-white font-semibold text-lg">Registrarse</Text>
        </Pressable>
      </View>
    </View>
  </SafeAreaView>
  )
}