import { Response, Request } from "express"
import bcrypt from 'bcrypt'
import prisma from "../config/prismaconfig"
import createToken from "../libs/jwt"

export const register = async (req: Request, res: Response): Promise<void> => {
    const { email, fullname, phone, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (user) {
            res.status(400).json({ error: "User exists" })
            return 
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await prisma.user.create({
            data: {
                email,
                fullname,
                phone,
                password: hashedPassword
            }
        });

        const token = await createToken({
            user_id: createdUser.user_id,
            role: createdUser.role,
            email,
            fullname,
        })

        res.cookie('token', token, { httpOnly: true })
        res.status(201).json(createdUser);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}


export const login = async (req:Request, res:Response): Promise<void> => {
    const { email, password } = req.body 
    try {
        const user = await prisma.user.findUnique({
            where: {email}
        })

        if(!user) {
            res.status(404).json({error: "User not found"})
            return
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            res.status(400).json({error: "Invalid password"})
            return
        }

        const token = await createToken(user)
        res.cookie('token', token, { httpOnly: true })

        res.json({
            user_id: user.user_id,
            fullname: user.fullname,
            phone: user.phone,
            email,
            token
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })     
    }
}
