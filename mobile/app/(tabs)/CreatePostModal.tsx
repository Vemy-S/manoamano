import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView, Switch } from 'react-native'
import { X } from 'lucide-react-native'
import { usePost } from '../../hooks/usePost'

const categories = [
  "Desarrollo Web",
  "Diseño Gráfico",
  "Marketing Digital",
  "Traducción",
  "Redacción",
  "Desarrollo Móvil",
  "Análisis de Datos",
  "Soporte Técnico"
]

export default function CreatePostModal({ isVisible, onClose }: any) {
  const  {handlePost, handleSubmit, postValues} = usePost()

  const [category, setCategory] = useState('')
  const [isOffer, setIsOffer] = useState(true)
  const [showCategories, setShowCategories] = useState(false)

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        <View className="bg-white rounded-t-3xl shadow-lg p-6 h-5/6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold">Crear Publicacion</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-semibold">Título</Text>
              <TextInput
                className="bg-gray-100 rounded-lg p-3 text-base"
                placeholder="Ingrese el título de su post"
                value={postValues.title}
                onChangeText={(value) => handlePost('title', value)}
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-semibold">Descripción</Text>
              <TextInput
                className="bg-gray-100 rounded-lg p-3 text-base h-32"
                placeholder="Describa su oferta o solicitud"
                multiline
                textAlignVertical="top"
                value={postValues.description}
                onChangeText={(value) => handlePost('description', value)}
              />
            </View>

          
     {/*        <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-semibold">Categoría</Text>
              <TouchableOpacity
                className="bg-gray-100 rounded-lg p-3 flex-row justify-between items-center"
                onPress={() => setShowCategories(!showCategories)}
              >
                <Text className={category ? "text-base" : "text-gray-500"}>
                  {category || "Seleccione una categoría"}
                </Text>
                <ChevronDown size={20} color="#666" />
              </TouchableOpacity>
              {showCategories && (
                <View className="bg-white rounded-lg mt-2 shadow-md">
                  {categories.map((cat) => (
                    <TouchableOpacity
                      key={cat}
                      className="p-3 border-b border-gray-100"
                      onPress={() => {
                        setCategory(cat)
                        setShowCategories(false)
                      }}
                    >
                      <Text>{cat}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View> */}

            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-lg font-semibold">Tipo de publicacion:</Text>
              <View className="flex-row items-center">
                <Text className={`mr-2 ${postValues.type === 'OFFER' ? 'text-gray-600' : 'text-amber-600'}`}>Requiero</Text>
                <Switch
                  value={postValues.type === 'OFFER'}
                  onValueChange={value => handlePost('type', value ? 'OFFER' : 'REQUEST')}
                  trackColor={{ false: '#3b82f6', true: '#374874' }}
                />
                <Text className={`ml-2 ${postValues.type === 'REQUEST' ? 'text-gray-600' : 'text-amber-600'}`}>Ofrezco</Text>
              </View>
            </View>

            <TouchableOpacity
              className="bg-amber-600 rounded-full py-3 items-center"
              onPress={handleSubmit}
            >
              <Text className="text-white font-semibold text-lg">Publicar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}