import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { usePostIdStore } from '../zustand/usePostIdStore';
import { getPostById } from '../services/posts';

export default function Post() {
  const { postId } = useLocalSearchParams<{ postId: string }>()
  const postById = usePostIdStore(state => state.post) 
  const setPostById = usePostIdStore(state => state.setPost) 
  
  useEffect(() => {
    const fetchPostById = async () => {
      const data = await getPostById(Number(postId))
      console.log(data)
      setPostById(data)
    }

    fetchPostById()
  }, [])

  return (
    <View>
      <Text>Post ID: {postId}</Text>
      <Text>Aca titulo ? {postById?.title}</Text>
      <Text>Aca descripcion {postById?.description}</Text>
      <Text>Aca postulaciones {postById?.postulation_count}</Text>
      <Text>Aca estado {postById?.status}</Text>
      <Text>Aca type {postById?.type}</Text>
    </View>
  )
}