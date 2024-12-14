import { useState } from "react"
import { useLocalSearchParams } from "expo-router"
import { createReview } from "../services/review"
import { Alert } from "react-native"

export type Review = {
    comment: string
    calification: number
}


export const useReview = () => {
    const { postId } = useLocalSearchParams<{ postId: string }>()

    const [reviewValues, setReviewValues] = useState<Review>({
        comment: '',
        calification: 0,
    })

    const handleInputChange = (field: keyof typeof reviewValues, value: string) => {
        setReviewValues(prev => ({
        ...prev,
        [field]: value
        }))
    } 

    const handleSubmit = async () => {
        console.log('Submitting with postId:', postId) 
        console.log('Review Values:', reviewValues)
        const result = await createReview(Number(postId), reviewValues)
        console.log('probando', result)

        if(result.status === 201){
            Alert.alert('Has creado una resenia extiosa')
        }
        
    }

    return {
        handleInputChange,
        setReviewValues,
        handleSubmit,
        reviewValues
    }
}