import axios from 'axios'
import { DraftUser, User } from '../types'

export const register = async (user: DraftUser) => {
    try {
        const url = `${process.env.API_BASE_URL}/auth/register` 
        const response = await axios.post(url, user)

        console.log(response)
    } catch (error) {
        console.error(error)
    }
}

export const login = async (email: User['email'], password: User['password']) => {
    try {
        const url = `${process.env.API_BASE_URL}/auth/login`
        const response = await axios.post(url, {email, password}, {
            withCredentials: true
        })
        
        return response

    } catch (error) {
        
    }
}