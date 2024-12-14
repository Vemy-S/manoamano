import { Response, Request } from "express";
import prisma from "../config/prismaconfig";
import { customRequest } from '../middleware/authenticate';

export const updateProfile = (req: customRequest, res: Response) =>  {
    const {usuario_id} =req.user
   

}