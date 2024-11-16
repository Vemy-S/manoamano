import React, { useState } from 'react'
import { View, TextInput, ScrollView, Text, ActivityIndicator, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { Search } from 'lucide-react-native'
import { useSearchStore } from '../../zustand/useSearchStore'
import useFilteredPost from '../../hooks/useFilteredPost'
import { useRouter } from 'expo-router'

const SearchComponent: React.FC = () => {
  const [isSearchActive, setIsSearchActive] = useState(false)
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery)
  const searchQuery = useSearchStore((state) => state.searchQuery)
  const { filteredPosts, loading, error } = useFilteredPost()
  const router = useRouter()

  const handleFocus = () => {
    setIsSearchActive(true)
  };

  const handleBlur = () => {
    setIsSearchActive(false)
    Keyboard.dismiss()
  };

  const handleChangeText = (text: string) => {
    setSearchQuery(text)
    setIsSearchActive(text.length > 0)
  };

  const handlePostPress = (postId: number) => {
    router.push(`/${postId}`)
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>
  }

  return (
    <TouchableWithoutFeedback onPress={handleBlur}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#666" />
          <TextInput
            placeholder="Busca tu servicio..."
            style={styles.textInput}
            placeholderTextColor="#666"
            onFocus={handleFocus}
            onChangeText={handleChangeText}
            value={searchQuery}
          />
        </View>
        {isSearchActive && searchQuery.length > 0 && (
          <ScrollView style={styles.scrollView}>
            <Text style={styles.listHeader}>Resultados de búsqueda</Text>
            {filteredPosts.slice(0, 4).map((item) => (
              <TouchableOpacity key={item.post_id} onPress={() => handlePostPress(item.post_id)}>
                <Text style={styles.postItem}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  scrollView: {
    maxHeight: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1,
  },
  listHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  postItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
})

export default SearchComponent