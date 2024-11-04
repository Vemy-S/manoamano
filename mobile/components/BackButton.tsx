import { View, Text, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'

type BackButtonProps = {
    href: string
}

export default function BackButton({href}: BackButtonProps) {
  return (
    <View className="p-4">
      <Link 
        className="w-8 h-8 justify-center"
        href={href}>
          <ArrowLeft size={24} color="#000" />
      </Link>
    </View>
  )
}