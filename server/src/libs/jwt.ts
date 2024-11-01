import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'


const createToken = (payload: JwtPayload) => {
   return new Promise((resolve, reject) => {
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


