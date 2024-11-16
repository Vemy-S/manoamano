import { Router } from "express";
import { createReview } from "../controllers/reviewControllers";


const router = Router()

router.post('/create', createReview)

export default router