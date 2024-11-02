import { useState } from "react"
import { Alert } from "react-native"
import { createPost } from "../services/posts"
import type { DraftPost } from "../types"

export const usePost = () => {
    const [postValues, setPostValues] = useState<DraftPost>({
        title: '',
        description: '',
        type: 'OFFER'
      })
    
      const handlePost = (field: keyof typeof postValues, value: string) => {
        setPostValues(prev => ({
          ...prev,
          [field]: value
        }))
      }
    
      const handleSubmit = async() => {
        if (!postValues.title || !postValues.description || !postValues.type) {
          Alert.alert('Error', 'Por favor completa todos los campos.');
          return;
        }
        console.log('Submitting post:', { postValues })
    
        await createPost(postValues)
        Alert.alert('Has publicado')
      }

    return {
        postValues,
        handlePost,
        handleSubmit
    }
}