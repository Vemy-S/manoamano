import { Router } from "express"
import { createPost, getPosts } from "../controllers/postControllers"
import { authenticate } from "../middleware/authenticate"

const router = Router()

router.post('/create', authenticate, createPost)
router.get('/get', getPosts)

export default router