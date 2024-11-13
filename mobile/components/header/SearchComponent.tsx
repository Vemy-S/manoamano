import React, {useState} from 'react'
import { View, TextInput, FlatList, Text, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Search } from 'lucide-react-native'
import { useSearchStore } from '../../zustand/useSearchStore';
import  useFilteredPost  from '../../hooks/useFilteredPost';

const SearchComponent: React.FC = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);
  const { filteredPosts, loading, error } = useFilteredPost();

  const handleFocus = () => {
    setIsSearchActive(true);
  };

  const handleBlur = () => {
    setIsSearchActive(false);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <View className="flex-row items-center bg-gray-100 rounded-full mt-4 px-4 py-2">
          <Search size={20} color="#666" />
          <TextInput
            placeholder="Busca tu servicio..."
            className="flex-1 ml-2 text-base"
            placeholderTextColor="#666"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
        {isSearchActive && (
          <FlatList
            data={filteredPosts}
            keyExtractor={(item) => item.post_id.toString()}
            renderItem={({ item }) => <Text>{item.title}</Text>}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchComponent;