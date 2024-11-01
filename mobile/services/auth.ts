import axios from 'axios'
import { User } from '../types'

export const register = async (user: User) => {
    try {
        const url = `${process.env.API_BASE_URL}/auth/register` 
        const result = await axios.post(url, user)

        console.log(result)
    } catch (error) {
        console.error(error)
    }
}

export const login = async (email: User['email'], password: User['password']) => {
    try {
        const url = `${process.env.API_BASE_URL}/auth/login`
        const result = await axios.post(url, {email, password})

        console.log(result)
    } catch (error) {
        
    }
}