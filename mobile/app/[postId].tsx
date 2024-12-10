import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import { X, User, Calendar, Tag, MessageCircle } from 'lucide-react-native';
import { usePostIdStore } from '../zustand/usePostIdStore';
import { getPostById } from '../services/posts';
import PostulationButton from '../components/PostulationButton';
import { useFeed } from '../hooks/useFeed';

export default function Post() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const postById = usePostIdStore(state => state.post);
  const setPostById = usePostIdStore(state => state.setPost);
  const { handlePostulation } = useFeed();
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchPostById = async () => {
      const data = await getPostById(Number(postId));
      console.log(data);
      setPostById(data);
    };

    fetchPostById();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <View className="flex-1 bg-white">
        <View className="flex-row items-center p-5 pt-[30px] border-b border-purple-100">
          <Link href="/feed" className="p-2.5">
            <X color="#6B46C1" size={24} />
          </Link>
          <Text className="text-purple-800 text-xl font-bold ml-5">Detalles del Post</Text>
        </View>

        <ScrollView className="flex-grow p-5">
          <View className="bg-white rounded-[15px] shadow-sm flex-1 justify-between border border-purple-100">
            <View className="p-5 flex-[0.6]">
              <View className="flex-row justify-between items-center mb-2.5">
                <Text className="text-2xl font-bold text-gray-900 flex-1">{postById?.title}</Text>
                <View className="flex-row items-center bg-purple-50 px-2.5 py-1.5 rounded-[15px]">
                  <Tag color="#6B46C1" size={24} />
                  <Text className="ml-1.5 text-purple-800 text-sm font-bold">{postById?.type}</Text>
                </View>
              </View>
              <Text className="text-base text-gray-700 mb-5">{postById?.description}</Text>

              <View className="h-px bg-purple-100 my-5" />

              <View className="mt-1.5">
                <View className="flex-row items-center mb-3.5">
                  <User color="#6B46C1" size={30} />
                  <Text className="ml-2.5 text-gray-700 text-base">{postById?.user?.fullname}</Text>
                </View>
                <View className="flex-row items-center mb-3.5">
                  <Calendar color="#6B46C1" size={30} />
                  <Text className="ml-2.5 text-gray-700 text-base">{postById?.status}</Text>
                </View>
              </View>
            </View>

            <View className="p-5 border-t border-purple-100 mt-auto">
              <PostulationButton
                applications={postById?.postulation_count || 0}
                maxPostulations={postById?.maxPostulations || 0}
                post_id={postById?.post_id || 0}
                handlePostulation={handlePostulation}
              />
            </View>
          </View>
        </ScrollView>

        <View className="p-5 bg-white border-t border-purple-100">
          <View className="flex-row items-center bg-purple-50 rounded-[25px] px-3.5 mb-2.5">
            <MessageCircle color="#6B46C1" size={20} className="mr-2.5" />
            <TextInput
              className="flex-1 h-[50px] text-base text-gray-700"
              placeholder="Escribe una reseña del servicio"
              placeholderTextColor="#A0AEC0"
              value={comment}
              onChangeText={setComment}
            />
          </View>
          <TouchableOpacity
            className="bg-purple-600 rounded-[25px] py-3 items-center"
            onPress={() => console.log("Comentario:", comment)}
          >
            <Text className="text-white text-base font-bold">Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}