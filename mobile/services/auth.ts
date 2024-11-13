import api from '../httpService'
import { DraftUser, User } from '../types'

export const register = async (user: DraftUser) => {
    try {
        const response = await api.post('/auth/register', user);
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}

export const login = async (email: User['email'], password: User['password']) => {
    try {
        const response = await api.post('/auth/login', { email, password }, {
            withCredentials: true
        })
        
        return response;
    } catch (error) {
        console.error(error)
    }
}