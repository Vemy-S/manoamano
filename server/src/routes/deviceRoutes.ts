import { Router } from "express"
import { getDevices } from "../controllers/deviceControllers"
import { authenticate } from "../middleware/authenticate"


const router = Router()


router.get('/get', authenticate, getDevices)

export default router