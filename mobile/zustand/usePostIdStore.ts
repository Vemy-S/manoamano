import { create } from 'zustand';

interface PostIdStore {
  postId: number | null;
  setPostId: (id: number) => void;
}

export const usePostIdStore = create<PostIdStore>((set) => ({
  postId: null,
  setPostId: (id) => set({ postId: id }),
}));