import { create } from "zustand";
import type { User } from "../types";

type useAuthStore = {
    login: () => void
}

export const useAuthStore = create<useAuthStore>((set)=> ({
    login: () => {
        
    }

    
}))