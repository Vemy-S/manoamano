import { create } from "zustand"
import type { Post, PostDetails } from '../types'
import { getPosts, getUserPostulations } from "../services/posts"

type usePostStore = {
    userPostulations: PostDetails[]
    posts: Post[]
    setPosts: () => Promise<void>
    getUserPostulations: () => Promise<void>
}

export const usePostStore = create<usePostStore>((set)=> ({
    userPostulations: [],
    posts: [],
    setPosts: async () => {
        try {
            const data = await getPosts()
            set({posts: data})
        } catch (error) {
            console.error(error)
        }
    },
    getUserPostulations: async () => {
        try {
            const data = await getUserPostulations()  
            set({ userPostulations: data }) 
        } catch (error) {
            console.error(error)
        }
    }
}))
