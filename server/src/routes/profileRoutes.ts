import { Router} from "express";
import { updateProfile } from "../controllers/profileControllers";
import { authenticate } from "../middleware/authenticate"

const router = Router()

router.patch("/user/me", authenticate, updateProfile)

export default router
