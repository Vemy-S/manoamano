import { Request, Response, RequestHandler } from 'express';
import prisma from "../config/prismaconfig"; // Asegúrate de que Prisma esté bien configurado
import { customRequest } from '../middleware/authenticate'; // Este es el tipo extendido para Request

export const updateProfile: RequestHandler = async (req: customRequest, res: Response): Promise<void> => {
  const { usuario_id } = req.user as { usuario_id: number };

  
  const { nombre_completo, correo, telefono } = req.body;

  const foto = req.file ? req.file.filename : null;  // Si no hay archivo, foto será null

  try {
    
    const user = await prisma.usuario.findUnique({
      where: { usuario_id },
    });

    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return; 
    }

    const updatedUser = await prisma.usuario.update({
      where: { usuario_id },
      data: {
        nombre_completo,
        correo,
        telefono,
        foto, // Foto actualizada (si se envió una nueva foto)
        fechaActualizacion: new Date(), 
      },
    });

    res.status(200).json({
      message: 'Perfil actualizado correctamente',
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el perfil' });
  }
};
