import { Response, Request } from "express"
import bcrypt from 'bcrypt'
import prisma from "../config/prismaconfig"
import createToken from "../libs/jwt"

export const register = async (req: Request, res: Response): Promise<void> => {
    const { email, fullname, phone, password } = req.body
    try {
        const user = await prisma.usuario.findUnique({
            where: { correo: email } 
        })

        if (user) {
            res.status(400).json({ error: "User already exists" })
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const createdUser = await prisma.usuario.create({
            data: {
                correo: email,        
                nombre_completo: fullname, 
                telefono: phone,  
                contrasena: hashedPassword
            }
        })

        const token = await createToken({
            usuario_id: createdUser.usuario_id,
            rol: createdUser.rol,
            correo: email,          
            nombre_completo: fullname,
        })

        const userResponse = {
            user_id: createdUser.usuario_id,
            fullname: createdUser.nombre_completo,
            email: createdUser.correo,
            phone: createdUser.telefono,
            role: createdUser.rol
        }

        res.cookie('token', token, { httpOnly: true })
        res.status(201).json(userResponse)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body
    try {
        const user = await prisma.usuario.findUnique({
            where: { correo: email } 
        })

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return
        }

        const isMatch = await bcrypt.compare(password, user.contrasena)

        if (!isMatch) {
            res.status(400).json({ error: "Invalid password" })
            return
        }

        const token = await createToken(user)
        res.cookie('token', token, { httpOnly: true })

        const userResponse = {
            user_id: user.usuario_id,
            fullname: user.nombre_completo,
            email: user.correo,
            phone: user.telefono,
            photo: user.foto,
            token
        }

        res.json(userResponse)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}
