import axios from 'axios';
import type { DraftPost } from '../types';

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
        console.error('Error creating post:', error);
        throw error;
    }
}


export const getPosts = async () => {
    try {
        const url = `${process.env.API_BASE_URL}/post/get`
        const response = await axios(url)
        return response.data
    } catch (error) {
        console.error(error);
        throw error;
    }
}