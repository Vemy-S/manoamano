import { create } from 'zustand';
import type { PostDetails } from '../types';

interface PostIdStore {
  post: PostDetails | null 
  setPost: (post: any) => void
}

export const usePostIdStore = create<PostIdStore>((set) => ({
  post: null,
  setPost: (post) => set({ post }),
}));