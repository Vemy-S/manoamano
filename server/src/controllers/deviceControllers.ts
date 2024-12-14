import { Response } from "express"
import { customRequest } from "../middleware/authenticate"
import prisma from "../config/prismaconfig"

export const getDevices = async (req: customRequest, res: Response) => {
    const { usuario_id } = req.user
    try {
        const userDevices = await prisma.dispositivo.findMany({
            where: {
                usuario_id
            }
        })

        if (userDevices.length === 0) {
            res.status(404).json({ message: "No devices found for this user" })
            return 
        }

        const devices = userDevices.map(device => ({
            device_id : device.dispositivo_id ,
            platform: device.plataforma,
            deviceIdentifier: device.identificador_dispositivo,
            deviceType: device.tipo_dispositivo,
            deviceVersion: device.version_dispositivo
        }))

        res.json(devices)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}
