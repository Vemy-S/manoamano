import api from '../httpService'
import * as Device from 'expo-device'
import { DraftUser, User } from '../types'
import { useAuthStore } from '../zustand/useAuthStore'
import { useRouter } from 'expo-router'

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
    const device_identifier = Device.modelName 
    const platform = Device.osName || "Unknown"
    const device_type = Device.deviceType
    const device_version = Device.osVersion
    try {
        const response = await api.post('/auth/login', { 
            email,
            password,
            device_identifier,
            platform,
            device_type,
            device_version
         }, {
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

export const logoutExternalDevice = async (device_id: number, myDevice: number) => {
    try {
        console.log('Dispositivo actual:', myDevice)

       
        const response = await api.post('/auth/logout-external', { logout_device_id: device_id }, {
            withCredentials: true,
            validateStatus: (status) => status < 500 
        })

        console.log(response)

        return response

    } catch (error) {
        console.error('Error al hacer logout del dispositivo:', error)
        throw error 
    }
}