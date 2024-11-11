import axios, { Axios, AxiosError } from 'axios';
import type { DraftPost, Post } from '../types';

export const createPost = async (postData: DraftPost) => {
    try {
        const url = `${process.env.API_BASE_URL}/post/create`
        console.log(postData)
        const response = await axios.post(url, postData , {
            withCredentials: true
        });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error creating post:', error)
        throw error;
    }
}

export const getPosts = async () => {
    try {
        const url = `${process.env.API_BASE_URL}/post/get`
        const response = await axios(url)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const postulation = async (id: Post['post_id']) => {
    try {
      const url = `${process.env.API_BASE_URL}/post/postulation/${id}`
      const response = await axios.post(url, {}, {
        withCredentials: true,
        validateStatus: (status) => {
            return status < 500
          }
      })
  
      return {
        status: response.status,
        data: response.data
      }
    } catch (error) {
      throw error
    }
  }