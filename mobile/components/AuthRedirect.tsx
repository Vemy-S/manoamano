import { View, Text } from 'react-native'
import { Link } from 'expo-router'

type AuthRedirectProps = {
    message: string,
    href: string,
    linkText: string
}

export default function AuthRedirect({message, href, linkText}: AuthRedirectProps) {
  return (
    <View className="flex-row justify-center mt-6">
        <Text className="text-gray-600">
            {message}{' '}
        </Text>  
        <Link href={href}>
            <Text className="text-amber-500 font-semibold">
                {linkText}
            </Text>
        </Link>
    </View>
  )
}