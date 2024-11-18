import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, Link } from 'expo-router';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, StatusBar } from 'react-native';
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Link href="/feed" style={styles.backButton}>
            <X color="#fff" size={24} />
          </Link>
          <Text style={styles.headerTitle}>Detalles del Post</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{postById?.title}</Text>
                <View style={styles.typeContainer}>
                  <Tag color="#4A5568" size={24} />
                  <Text style={styles.typeText}>{postById?.type}</Text>
                </View>
              </View>
              <Text style={styles.description}>{postById?.description}</Text>

              <View style={styles.separator} />

              <View style={styles.infoContainer}>
                <View style={styles.infoItem}>
                  <User color="#4A5568" size={30} />
                  <Text style={styles.infoText}>{postById?.user?.fullname}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Calendar color="#4A5568" size={30} />
                  <Text style={styles.infoText}>{postById?.status}</Text>
                </View>
              </View>
            </View>

            <View style={styles.postulationButtonContainer}>
              <PostulationButton
                applications={postById?.postulation_count || 0}
                maxPostulations={postById?.maxPostulations || 0}
                post_id={postById?.post_id || 0}
                handlePostulation={handlePostulation}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.commentSection}>
          <View style={styles.commentInputContainer}>
            <MessageCircle color="#4A5568" size={20} style={styles.commentIcon} />
            <TextInput
              style={styles.commentInput}
              placeholder="Escribe una reseña del servicio"
              placeholderTextColor="#A0AEC0"
              value={comment}
              onChangeText={setComment}
            />
          </View>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => console.log("Comentario:", comment)}
          >
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2D3748',
  },
  container: {
    flex: 1,
    backgroundColor: '#2D3748',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: '#1A202C',
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
    justifyContent: 'space-between',
  },
  cardContent: {
    padding: 20,
    flex: 0.6,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 20,
  },
  infoContainer: {
    marginTop: 5,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 10,
    color: '#4A5568',
    fontSize: 16,
  },
  postulationButtonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    marginTop: 'auto',
  },
  commentSection: {
    padding: 20,
    backgroundColor: '#1A202C',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D3748',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  commentIcon: {
    marginRight: 10,
  },
  commentInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#fff',
  },
  sendButton: {
    backgroundColor: '#4299E1',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  typeText: {
    marginLeft: 5,
    color: '#4A5568',
    fontSize: 14,
    fontWeight: 'bold',
  },
});