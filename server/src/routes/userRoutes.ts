import { Router } from "express";
import { updateUser } from "../controllers/userControllers";


const router = Router()

router.put('/update', updateUser) // agregar middleware


export default router