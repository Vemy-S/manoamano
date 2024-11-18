import { useLocalSearchParams } from 'expo-router'
import { Link } from 'expo-router'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, Button } from 'react-native'
import { X } from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import { usePostIdStore } from '../zustand/usePostIdStore'
import { getPostById } from '../services/posts'
import PostulationButton from '../components/PostulationButton'
import { useFeed } from '../hooks/useFeed'

export default function Post() {
  const { postId } = useLocalSearchParams<{ postId: string }>()
  const postById = usePostIdStore(state => state.post)
  const setPostById = usePostIdStore(state => state.setPost)
  const { handlePostulation } = useFeed()
  const [comment, setComment] = useState('')

  useEffect(() => {
    const fetchPostById = async () => {
      const data = await getPostById(Number(postId))
      console.log(data)
      setPostById(data)
    }

    fetchPostById()
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View className="flex-row justify-between items-center p-4">
            <Link href="/feed">
              <X color="#333" size={24} />
            </Link>
          </View>

          <View style={styles.box}>
            <Text style={styles.title}>{postById?.title}</Text>
            <Text style={styles.text}>Descripción: {postById?.description}</Text>
            <Text style={styles.text}>Autor: {postById?.user?.fullname}</Text>
            <Text style={styles.text}>Estado: {postById?.status}</Text>
            <Text style={styles.text}>Tipo: {postById?.type}</Text>

            {/* Botón de Postulación */}
            <PostulationButton
              applications={postById?.postulation_count || 0}
              maxPostulations={postById?.maxPostulations || 0}
              post_id={postById?.post_id || 0}
              handlePostulation={handlePostulation}
            />
          </View>
        </ScrollView>

        {/* Sección de Comentarios en la parte inferior */}
        <View style={styles.commentSection}>
          <TextInput
            style={styles.commentInput}
            placeholder="Escribe una reseña del servicio"
            value={comment}
            onChangeText={setComment}
          />
          <Button title="Enviar" onPress={() => console.log("Comentario:", comment)} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 100, // Para asegurar espacio al final al hacer scroll
  },
  box: {
    borderWidth: 2,
    borderColor: '#000',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    marginTop: '25%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
  commentSection: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
});
