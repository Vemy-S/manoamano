import { Router } from "express"
import { createPost, getPosts, postulationPost } from "../controllers/postControllers"
import { authenticate } from "../middleware/authenticate"

const router = Router()

router.post('/create', authenticate, createPost)
router.post('/postulation/:id', authenticate, postulationPost)
router.get('/get', getPosts)

export default router