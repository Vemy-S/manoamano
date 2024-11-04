import { View, TextInput } from 'react-native'
import { Search } from 'lucide-react-native'

export default function SearchComponent() {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-full mt-4 px-4 py-2">
    <Search size={20} color="#666" />
    <TextInput
      placeholder="Busca tu servicio..."
      className="flex-1 ml-2 text-base"
      placeholderTextColor="#666"
    />
  </View>
    
  )
}