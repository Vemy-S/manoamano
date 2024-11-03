
import React from 'react'
import { View, Text, TextInput, Image, Pressable, ScrollView, Switch, Alert } from 'react-native'
import { useAuthStore } from '../../zustand/useAuthStore'
import { usePost } from '../../hooks/usePost'

export default function CreatePost() {
  const user = useAuthStore(state => state.user)

  const  {handlePost, handleSubmit, postValues} = usePost()

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-4">
        <View className="flex-row items-center mb-6">
          <Image
            className="w-12 h-12 rounded-full mr-4"
          />
          <Text className="text-lg font-semibold">{user.fullname}</Text>
        </View>

        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-lg font-semibold">Tipo de Post:</Text>
          <View className="flex-row items-center">
            <Text className={`mr-2 ${postValues.type === 'OFFER' ? 'text-indigo-600' : 'text-gray-600'}`}>Requiero</Text>
            <Switch
              value={postValues.type === 'OFFER'}
              onValueChange={value => handlePost('type', value ? 'OFFER' : 'REQUEST')}
              trackColor={{ false: '#3b82f6', true: '#374874' }}
            />
            <Text className={`ml-2 ${postValues.type === 'REQUEST' ? 'text-indigo-600' : 'text-gray-600'}`}>Ofrezco</Text>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2">Título:</Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-lg p-2 text-base"
            placeholder="Ingresa un título para tu post..."
            value={postValues.title}
            onChangeText={value => handlePost('title', value)}
          />
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2">Descripción:</Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-lg p-2 h-32 text-base"
            multiline
            numberOfLines={4}
            placeholder="Describe el servicio que ofreces o requieres..."
            value={postValues.description}
            onChangeText={value => handlePost('description', value)}
          />
        </View>

        <Pressable
          className="bg-indigo-600 py-3 px-6 rounded-full"
          onPress={handleSubmit}
        >
          <Text className="text-white font-semibold text-lg text-center">Publicar</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}