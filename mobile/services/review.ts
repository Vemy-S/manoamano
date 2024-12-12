import { Review } from "../hooks/useReview"
import api from "../httpService"
import { User } from "../types"


export const createReview = async (postId: number , data: Review) => {
    try {
        const response = await api.post(`/review/create/${postId}`, data, {
            withCredentials: true,
            validateStatus: (status) => {
              return status < 500
            }
        })
        console.log(response)
        return response.data
    } catch (error) {
        console.error('Error creating post:', error)
        throw error
    }
  }

export const getUserReviews = async (user_id: User['user_id']) => {
    try {
        const response = await api.get(`/review/get/${user_id}`, {
            withCredentials: true,
            validateStatus: (status) => {
              return status < 500
            }
        })
        return response.data
    } catch (error) {
        console.error('Error fetching user reviews:', error)
    }
}