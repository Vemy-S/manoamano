import api from '../httpService';
import { UpdateUser, User } from '../types';

export const updateUser = async (userId: User['user_id'], updatedData: UpdateUser) => {
  try {
    const response = await api.put(`/users/${userId}`, updatedData, {
      withCredentials: true, // Si necesitas enviar cookies en la solicitud
      validateStatus: (status) => status < 500, // Maneja cualquier error del servidor
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw new Error('Error al actualizar el usuario.');
  }
};