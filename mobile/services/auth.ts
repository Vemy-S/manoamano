import api from '../httpService'
import { DraftUser, User } from '../types'

export const register = async (user: DraftUser) => {
    try {
        const response = await api.post('/auth/register', user, {
            validateStatus: (status) => {
                return status < 500
            }
        })

        return {
            status: response.status,
            data: response.data
        }
    } catch (error) {
        console.error(error)
    }
}

export const login = async (email: User['email'], password: User['password']) => {
    try {
        const response = await api.post('/auth/login', { email, password }, {
            withCredentials: true,
            validateStatus:(status) => {
                return status < 500
            },
        })

        return {
            status: response.status,
            data: response.data
        }
    } catch (error) {
        console.error(error)
    }
}

export const logout = async () => {
    try {
        const response = await api.post('/auth/logout', {}, {
            withCredentials: true,
            validateStatus: (status) => {
                return status < 500
            },
        })

        return {
            status: response.status,
            data: response.data
        }
    } catch (error) {
        console.error(error)
    }
}