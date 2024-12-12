import { View, Text, TouchableOpacity } from 'react-native'

type PrimaryButtonProps = {
    handleSubmit: () => void
    text: string
}

export default function PrimaryButton({ handleSubmit, text }: PrimaryButtonProps) {
  return (
    <TouchableOpacity 
          className="bg-indigo-700 rounded-xl py-4 mt-6"
          onPress={handleSubmit}
        >
        <Text className="text-center font-semibold text-white">
            {text}
        </Text>
    </TouchableOpacity>
  )
}