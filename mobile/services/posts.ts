import api from '../httpService';
import type { DraftPost, Post } from '../types';

export const createPost = async (postData: DraftPost) => {
  try {
      console.log(postData)
      const response = await api.post('/post/create', postData, {
          withCredentials: true
      })
      console.log(response)
      return response.data
  } catch (error) {
      console.error('Error creating post:', error)
      throw error
  }
}

export const getPostById = async (postId: number) => {
    try {
      const response = await api.get(`/post/get/${postId}`, {
        withCredentials: true
      })
      return response.data
    } catch (error) {
      console.error('Error fetching post details:', error)
      throw error
    }
}

export const getPosts = async () => {
  try {
      const response = await api.get('/post/get')
      console.log(response.data)
      return response.data
  } catch (error) {
      console.error(error)
      throw error
  }
}

export const postulation = async (id: Post['post_id']) => {
  try {
      const response = await api.post(`/post/postulation/${id}`, {}, {
          withCredentials: true,
          validateStatus: (status) => {
              return status < 500
          }
      });

      return {
          status: response.status,
          data: response.data
      };
  } catch (error) {
      throw error
  }
}