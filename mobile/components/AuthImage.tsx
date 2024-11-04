import { View, Image} from 'react-native'

export default function AuthImage() {
  return (
    <View className="items-center mb-8">
          <Image 
            source={{ uri: "https://cdn.pixabay.com/photo/2023/12/13/14/01/woman-8446980_1280.png" }}
            className="w-72 h-72"
            resizeMode="contain"
          />
        </View>
  )
}