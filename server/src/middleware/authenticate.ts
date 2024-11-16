import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express'


export interface customRequest extends Request {
    user?: JwtPayload | null
}

export const authenticate = (req: customRequest, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies
        if(!token){
            res.status(404).json({error: "No token"})
            return
        }

        jwt.verify(token, process.env.JWT_KEY, (err: jwt.VerifyErrors | null , decoded: JwtPayload | undefined) => {
            if(err){
                return res.status(403).json({ error: "Invalid token" })
            }
           
            req.user = decoded
            console.log(req.user)
            next()
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal server error"})
    }
}