import { create } from "zustand";
import type { Post } from '../types';


type usePostStore = {
    posts: Post[]
    
}

export const usePostStore = create<usePostStore>((set)=> ({
    posts: [],
    
}))