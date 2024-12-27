import { Router } from 'express';
import { updateProfile } from '../controllers/editProfileControllers';
import { authenticate } from '../middleware/authenticate';
import multer from 'multer';

const router = Router();

// Ruta para actualizar el perfil con la foto
router.put("/user", authenticate, updateProfile);

export default router;








