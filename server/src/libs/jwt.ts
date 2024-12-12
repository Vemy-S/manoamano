import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'


const createToken = (user: any, device_id: number): JwtPayload => {
   return new Promise((resolve, reject) => {

    const payload = {
        usuario_id: user.usuario_id,
        device_id: device_id
    }

    jwt.sign(
        payload,
        process.env.JWT_KEY,
        {expiresIn: '1d'},
        (err, token) => {
            if(err) reject
            resolve(token) 
        }
    )
   })
}

export default createToken


