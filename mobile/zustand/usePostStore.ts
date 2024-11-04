import { create } from "zustand";
import type { Post } from '../types';
import { getPosts } from "../services/posts";


type usePostStore = {
    posts: Post[]
    setPosts: () => Promise<void>
}

export const usePostStore = create<usePostStore>((set)=> ({
    posts: [],
    setPosts: async () => {
        try {
            const data = await getPosts()
            set({posts: data})
        } catch (error) {
            console.error(error)
        }
    }
}))