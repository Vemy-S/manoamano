import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function Post() {
  const { postId } = useLocalSearchParams();

  console.log(`Rendering post with ID: ${postId}`);

  return (
    <View>
      <Text>Post ID: {postId}</Text>
    </View>
  );
}