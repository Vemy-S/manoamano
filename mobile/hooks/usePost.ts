import { useState } from "react"
import { Alert } from "react-native"
import { createPost } from "../services/posts"
import type { DraftPost } from "../types"
import { useFeed } from "./useFeed"

export const usePost = () => {

    const { onRefresh } = useFeed()
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
          Alert.alert('Error', 'Por favor completa todos los campos.')
          return
        }
        console.log('Submitting post:', { postValues })
    
        console.log('?')
        const result = await createPost(postValues)
        
        if(result !== 200 && result.error === 'You already have the maximum number of publications'){
          Alert.alert('Error', 'Alcanzaste el maximo de publicaciones.')
          return
        }

        console.log(result)
       
        onRefresh()
        Alert.alert('Has publicado')
      }

    return {
        postValues,
        handlePost,
        handleSubmit
    }
}