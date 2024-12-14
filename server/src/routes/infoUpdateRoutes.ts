import { Router } from 'express';
import { updateUser } from '../controllers/infoUpdateControllers';

const router = Router();

// Ruta para actualizar la información del usuario
router.put('/:id', updateUser);

export default router;
