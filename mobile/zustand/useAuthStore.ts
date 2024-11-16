import { create } from "zustand";
import type { User } from "../types";

type useAuthStore = {
    user: User
    setUser: (user: User) => void
}

export const useAuthStore = create<useAuthStore>((set)=> ({
    user: {
        user_id: null,
        fullname: '',
        email: '',
        password: '',
        phone: '',
        photo: ''
    },
    setUser: (user) => set({user})
}))







