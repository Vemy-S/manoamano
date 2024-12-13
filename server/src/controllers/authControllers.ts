import { Response, Request } from "express"
import bcrypt from 'bcrypt'
import prisma from "../config/prismaconfig"
import createToken from "../libs/jwt"
import convertDevice from "../utils/convertDevice"
import { customRequest } from "../middleware/authenticate"

export const nombre = (req, res ) => {
    const { email, phone, password } = req.body
    try {
        
        
    } catch (error) {
        
    }
}

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

        const userResponse = {
            user_id: createdUser.usuario_id,
            fullname: createdUser.nombre_completo,
            email: createdUser.correo,
            phone: createdUser.telefono,
            role: createdUser.rol
        }

        res.status(201).json(userResponse)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    const { 
        email,
        password,
        device_identifier,
        platform,
        device_type,
        device_version
    } = req.body

    try {
        const device_name = convertDevice(device_type)

        const user = await prisma.usuario.findUnique({
            where: { correo: email } 
        })

        if (!user) {
            res.status(404).json({ error: "User not found" })
            return
        }

        const isMatch = await bcrypt.compare(password, user.contrasena)

        if (!isMatch) {
            res.status(400).json({ error: "Invalid password" })
            return
        }

        const activeDevice = await prisma.dispositivo.findFirst({
            where: {
                usuario_id: user.usuario_id,
                token_dispositivo: {
                    not: "",  
                }
            }
        })

        if (activeDevice) {
            res.status(400).json({ message: "User already logged in on another device" })
            return
        }

        let existingDevice = await prisma.dispositivo.findFirst({
            where: { 
                usuario_id: user.usuario_id,
                identificador_dispositivo: device_identifier, 
                plataforma: platform,
                tipo_dispositivo: device_name,
                version_dispositivo: device_version
            }
        })

        if (!existingDevice) {
            existingDevice = await prisma.dispositivo.create({
                data: {
                    usuario_id: user.usuario_id,
                    identificador_dispositivo: device_identifier,
                    plataforma: platform,
                    tipo_dispositivo: device_name,
                    version_dispositivo: device_version
                }
            })
        }

        const token = await createToken(user, existingDevice.dispositivo_id)

        await prisma.dispositivo.update({
            where: { dispositivo_id: existingDevice.dispositivo_id },
            data: { token_dispositivo: String(token) }
        })

        res.cookie('token', token, { httpOnly: true })

        const userResponse = {
            user_id: user.usuario_id,
            fullname: user.nombre_completo,
            email: user.correo,
            phone: user.telefono,
            photo: user.foto,
            device_id: existingDevice.dispositivo_id
        }

        res.json(userResponse)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const logout = async (req: customRequest, res: Response): Promise<void> => {
    const { token } = req.cookies
    try {

        const deviceToLogout = await prisma.dispositivo.findUnique({
            where: {
                token_dispositivo: token
            }
        })

        if(!deviceToLogout){
            res.status(404).json({
                error: "Device not found"
            })
            return
        }

        await prisma.dispositivo.delete({
            where: {
                dispositivo_id: deviceToLogout.dispositivo_id
            }
        })
        
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0)
        })
        res.status(200).json({
            message: "Logged out successfully form the device"
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error"})
    }
}

export const logoutExternalDevice = async (req: customRequest, res: Response): Promise<void> => {
    const { logout_device_id } = req.body
    const { usuario_id, device_id } = req.user
    const { token } = req.cookies

    try {
        console.log("yo", device_id)

        const deviceToLogout = await prisma.dispositivo.findUnique({
            where: { dispositivo_id: logout_device_id }
        });

        if (!deviceToLogout) {
            res.status(404).json({ message: "Device not found" });
            return
        }

        if (deviceToLogout.dispositivo_id === device_id) {
            res.status(400).json({ message: "Cannot log out of your own device" });
            return
        }

        console.log('DISPOSITIVO A DESCONECTAR', deviceToLogout.dispositivo_id);
        console.log('DISPOSITIVO MIOOOO', device_id)

        await prisma.dispositivo.delete({
            where: { dispositivo_id: logout_device_id }
        })

        res.status(200).json({ message: "Device logged out successfully", logout_device_id })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}
