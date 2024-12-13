import { Router } from "express";
import { createReview, getUserReviews } from "../controllers/reviewControllers";
import { authenticate } from "../middleware/authenticate";


const router = Router()

router.post('/create/:id', authenticate, createReview)
router.get('/get/:id', authenticate, getUserReviews)

export default router