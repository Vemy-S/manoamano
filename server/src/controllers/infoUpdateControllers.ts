import prisma from '../config/prismaconfig';
import { Request, Response } from 'express';

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // ID del usuario extraído de la URL
    const { phone, password } = req.body; // Datos enviados para actualizar
  
    try {
      const userId = parseInt(id, 10);
  
      // Validación de entrada
      if (!phone || !/^[0-9]{9}$/.test(phone)) {
        res.status(400).json({ error: 'El número de teléfono debe contener exactamente 9 dígitos.' });
        return;
      }
  
      if (!password || password.length < 6) {
        res.status(400).json({ error: 'La contraseña debe contener al menos 6 caracteres.' });
        return;
      }
  
      // Verificar si el usuario existe
      const existingUser = await prisma.usuario.findUnique({
        where: { usuario_id: userId },
      });
  
      if (!existingUser) {
        res.status(404).json({ error: 'Usuario no encontrado.' });
        return;
      }
  
      // Actualizar los datos del usuario
      const updatedUser = await prisma.usuario.update({
        where: { usuario_id: userId },
        data: {
          telefono: phone,
          contrasena: password, // En un entorno real, asegúrate de encriptar la contraseña
        },
      });
  
      res.status(200).json({
        message: 'Información del usuario actualizada exitosamente.',
        data: {
          usuario_id: updatedUser.usuario_id,
          telefono: updatedUser.telefono,
        },
      });
    } catch (error) {
      console.error('Error al actualizar la información del usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  };
  