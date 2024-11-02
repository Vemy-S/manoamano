import axios from 'axios';
import type { DraftPost } from '../types';

export const createPost = async (postData: DraftPost) => {
    try {
        const url1 = 'http://localhost:3000/api/post/create' 
        const url = `${process.env.API_BASE_URL}/post/create`
        console.log(postData)
        const response = await axios.post(url1, postData , {
            withCredentials: true
        });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};