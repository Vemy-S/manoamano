import { create } from "zustand";
import type { User } from "../types";

type useAuthStore = {
    user: User
    setUser: (user: User) => void
}

export const useAuthStore = create<useAuthStore>((set)=> ({
    user: {
        fullname: '',
        email: '',
        password: '',
        phone: ''
    },
    setUser: (user) => set({user})
}))