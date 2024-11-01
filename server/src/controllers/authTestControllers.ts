import { Response } from "express"
import prisma from "../config/prismaconfig"
import { customRequest } from "../middleware/authenticate"

export const test = async (req:customRequest, res:Response) => {
    const { email } = req.user
    try {
        const user = await prisma.user.findUnique({where: {email}})
        console.log('email desde token', email)
        if(!user){
            res.status(404).json({error: "User not found"})
            return 
        }
        const info = req.user

        res.json({
            user
        
        })
    } catch (error) {
        console.error(error)
    }
}
