import { View, Text, TouchableOpacity } from 'react-native'

type PrimaryButtonProps = {
    handleSubmit: () => void
    text: string
}

export default function PrimaryButton({ handleSubmit, text }: PrimaryButtonProps) {
  return (
    <TouchableOpacity 
          className="bg-amber-400 rounded-xl py-4 mt-6"
          onPress={handleSubmit}
        >
        <Text className="text-center font-semibold text-gray-900">
            {text}
        </Text>
    </TouchableOpacity>
  )
}