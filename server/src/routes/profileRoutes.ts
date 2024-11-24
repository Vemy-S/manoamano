import { Router} from "express";
import { updateProfile } from "../controllers/profileControllers";


router.patch("/user/me", authenticate, updateProfile);
