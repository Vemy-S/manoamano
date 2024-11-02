import { Response, Request } from "express"
import bcrypt from 'bcrypt'
import prisma from "../config/prismaconfig"

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params // cambiar por el req.user
    const { email, fullname, phone, password } = req.body

    try {
     
        const user = await prisma.user.findUnique({
            where: { user_id: Number(userId) }
        });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const updatedData: any = {
            email: email || user.email,
            fullname: fullname || user.fullname,
            phone: phone || user.phone,
            password: password ? await bcrypt.hash(password, 10) : user.password 
        };

        const updatedUser = await prisma.user.update({
            where: { user_id: Number(userId) },
            data: updatedData
        });

       
        res.json({
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}


