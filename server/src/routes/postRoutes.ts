import { Router } from "express"
import { createPost } from "../controllers/postControllers"
import { authenticate } from "../middleware/authenticate"

const router = Router()

router.post('/create', authenticate, createPost)

export default router