import { Router } from "express"
import { createPost, deletePost, getPostById, getPosts, getUserPostulations, postulationPost, removePostulation } from "../controllers/postControllers"
import { authenticate } from "../middleware/authenticate"

const router = Router()

router.post('/create', authenticate, createPost)
router.delete('/delete/:id', authenticate, deletePost)
router.post('/postulation/:id', authenticate, postulationPost)
router.delete('/postulation/:id', authenticate, removePostulation)
router.get('/get/:id', authenticate, getPostById)
router.get('/get', getPosts)
router.get('/getpostulations', authenticate, getUserPostulations)

export default router