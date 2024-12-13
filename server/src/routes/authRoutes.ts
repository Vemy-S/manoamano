import { Router } from "express";
import { login, logout, logoutExternalDevice, register } from "../controllers/authControllers";
import { authenticate } from "../middleware/authenticate";


const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', authenticate, logout)
router.post('/logout-external', authenticate, logoutExternalDevice)

export default router