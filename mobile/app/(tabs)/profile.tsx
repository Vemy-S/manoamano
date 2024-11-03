import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'
import { ChevronRight, Settings, User2, X, MoreVertical, HandHelping, Star, Newspaper } from 'lucide-react-native'
import MenuItem from '../../components/MenuItem'
import { Link } from 'expo-router'

export default function Profile() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">

        <View className="flex-row justify-between items-center p-4">
          <Link href="/feed">
            <X color="#333" size={24} />
          </Link>
          <Text className="text-gray-900 text-xl font-bold">Perfil</Text>
          <TouchableOpacity>
            <MoreVertical color="#333" size={24} />
          </TouchableOpacity>
        </View>

      
        <View className="px-4 py-6">
          <View className="flex-row items-center mb-6">
            <Image
              source={{ uri: 'https://via.placeholder.com/60' }}
              className="w-12 h-12 rounded-full mr-3"
            />
            <View>
              <Text className="text-gray-500 text-sm">Bienvenido</Text>
              <Text className="text-gray-900 text-lg font-semibold">Jeremy Vega</Text>
            </View>
          </View>

          {/* Help Button */}
          <TouchableOpacity className="bg-[#8B5CF6] rounded-xl p-4 flex-row items-center mb-6">
            <HandHelping color="white" size={20} />
            <Text className="text-white ml-2 flex-1">Podemos ayudarte</Text>
            <ChevronRight color="white" size={20} />
          </TouchableOpacity>
        </View>


        <View className="px-4">
          <MenuItem
            icon={<User2 color="#8B5CF6" size={20} />}
            title="Cuenta"
          />
          <MenuItem
            icon={<Newspaper color="#8B5CF6" size={20} />}
            title="Mis publicaciones"
          />
          <MenuItem
            icon={<Star color="#8B5CF6" size={20} />}
            title="Favoritos"
          />

          <MenuItem
            icon={<Settings color="#8B5CF6" size={20} />}
            title="Configuracion"
          />

        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

