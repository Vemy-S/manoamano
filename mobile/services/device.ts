import api from '../httpService';

export const getDevices = async () => {
    try {
        const response = await api.get('/device/get', {
            withCredentials: true,
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