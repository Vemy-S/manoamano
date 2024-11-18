import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { usePostIdStore } from '../zustand/usePostIdStore';

export default function Post() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const setPostId = usePostIdStore((state) => state.setPostId);

  useEffect(() => {
    if (postId) {
      setPostId(Number(postId));
    }
  }, [postId]);

const storedPostId = usePostIdStore((state) => state.postId);

  console.log(`Rendering post with ID: ${storedPostId}`);

  return (
    <View>
      <Text>Post ID: {storedPostId}</Text>
    </View>
  );
}