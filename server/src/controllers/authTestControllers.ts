import { Response } from "express"
import { customRequest } from "../middleware/authenticate"

export const test = async (req:customRequest, res:Response) => {
   res.json(200)
}
