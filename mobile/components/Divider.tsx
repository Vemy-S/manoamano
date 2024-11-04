import { View } from 'react-native'

export default function Divider() {
  return (
    <View className="flex-row items-center my-6">
        <View className="flex-1 h-[1px] bg-gray-200" />
        <View className="flex-1 h-[1px] bg-gray-200" />
    </View>
  )
}