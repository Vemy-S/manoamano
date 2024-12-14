import { create } from "zustand";
import type { User } from "../types";

type useAuthStore = {
    user: User
    setUser: (user: User) => void
    externalLogout: () => void
}

export const useAuthStore = create<useAuthStore>((set)=> ({
    user: {
        user_id: null,
        fullname: '',
        email: '',
        password: '',
        phone: '',
        photo: '',
        status: '',
        device_id: null
    },
    setUser: (user) => set({user}),
    externalLogout: () => set({
        user: {
            user_id: null,
            fullname: '',
            email: '',
            password: '',
            phone: '',
            photo: '',
            status: '',
            device_id: null
        }
    })
}))







